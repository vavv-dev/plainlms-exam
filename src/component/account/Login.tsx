import { joinPath, passwordPath, reverse } from '@/App';
import { TokenObtainPair, TokenService, AccountService } from '@/api';
import { parseJwt } from '@/helper/util';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Formik, FormikHelpers } from 'formik';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { alertState } from '../layout/layout';
import { FormTextField } from './FormHelper';
import { tokenExpState, processingState, userState } from './account';

const Login = () => {
  const { t } = useTranslation('account');
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userState);
  const [processing, setProcessing] = useAtom(processingState);
  const [tokenExp, setTokenExp] = useAtom(tokenExpState);
  const [alert, setAlert] = useAtom(alertState);

  useEffect(() => {
    if (user) {
      // check if refresh token is expired
      const now = new Date().getTime() / 1000;
      if (tokenExp < now) {
        setUser(null);
        setTokenExp(0);
      } else {
        navigate('/');
        return;
      }
    }
  }, [user, tokenExp]); // eslint-disable-line

  const handleOnSubmit = async (
    {
      username,
      password,
    }: {
      username: string;
      password: string;
    },
    helpers: FormikHelpers<{
      username: string;
      password: string;
      showPassword: boolean;
      detail: string;
    }>,
  ) => {
    // start auth processing
    setProcessing(true);

    // get jwt token and user id
    const token = await TokenService.tokenCreate({
      requestBody: {
        username: username,
        password: password,
      } as TokenObtainPair,
    }).catch((error) => {
      const errorBody = error.body;
      const genericErrors = [];
      for (const key in errorBody) {
        if (key == 'username' || key == 'password') {
          helpers.setFieldError(key, t(errorBody[key]));
        } else {
          genericErrors.push(t(errorBody[key]));
        }
      }
      if (genericErrors.length) {
        helpers.setErrors({ detail: genericErrors.join(' ') });
      }
    });

    if (token) {
      // set refresh token expiration
      const refreshToken = parseJwt(token.refresh);
      setTokenExp(refreshToken.exp);

      // set user
      AccountService.accountUserMeRetrieve()
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          const errorBody = error.body;
          const errors = [];
          for (const key in errorBody) {
            errors.push(t(errorBody[key]));
          }
          if (errors.length) {
            helpers.setErrors({ detail: errors.join(' ') });
          }
        });
    }
    setProcessing(false);
    setAlert({ ...alert, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& form': { width: '100%' },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ my: '.5em' }}>
          {t('Login')}
        </Typography>

        <Formik
          initialValues={{
            username: '',
            password: '',
            showPassword: false,
            detail: '',
          }}
          validationSchema={yup.object({
            username: yup.string().required(t('Input your username.')),
            password: yup.string().required(t('Input your password.')),
          })}
          onSubmit={handleOnSubmit}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              {props.errors.detail && <Alert severity="warning">{props.errors.detail}</Alert>}

              <FormTextField name="username" label="Username" {...props} />
              <FormTextField
                name="password"
                label="Password"
                passwordAorment="showPassword"
                {...props}
              />

              <Button
                disabled={processing}
                size="large"
                sx={{ mt: '2em' }}
                variant="contained"
                fullWidth
                type="submit"
              >
                {t('Login now')}
              </Button>
            </form>
          )}
        </Formik>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box onClick={() => navigate(reverse(passwordPath))} sx={{ cursor: 'pointer' }}>
            {t('Forgot password?')}
          </Box>
          <Box onClick={() => navigate(reverse(joinPath))} sx={{ cursor: 'pointer' }}>
            {t("Don't have an account? Join")}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
