import { joinPath, passwordPath, reverse } from '@/App';
import { AccountService, TokenObtainPair, TokenService } from '@/api';
import { parseJwt } from '@/helper/util';
import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Form, TextFieldControl } from './FormHelper';
import { accountProcessingState, tokenExpState, userState } from './account';

const schema = yup.object({
  username: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
});

const Login = () => {
  const { t } = useTranslation('account');
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useAtom(userState);
  const [processing, setProcessing] = useAtom(accountProcessingState);
  const [tokenExp, setTokenExp] = useAtom(tokenExpState);

  useEffect(() => {
    if (user) {
      // check if refresh token is expired
      const now = new Date().getTime() / 1000;
      if (tokenExp < now) {
        setUser(null);
        setTokenExp(0);
      } else {
        navigate(location.state?.from ? location.state.from : '/');
        return;
      }
    }
  }, [user, tokenExp]); // eslint-disable-line

  const { handleSubmit, control, setError, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleOnSubmit = async ({ username, password }: { username: string; password: string }) => {
    // start auth processing
    setProcessing(true);

    // get jwt token and user id
    const token = await TokenService.tokenCreate({
      requestBody: {
        username: username,
        password: password,
      } as TokenObtainPair,
    }).catch((error) => {
      if (error.body) {
        setError('root.server', error.body);
      }
    });

    if (token) {
      // set refresh token expiration
      const refreshToken = parseJwt(token.refresh);
      setTokenExp(refreshToken.exp);

      // set user
      await AccountService.accountUserMeRetrieve()
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          if (error.body) {
            setError('root.server', error.body);
          }
        });
    }
    setProcessing(false);
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

        <Form onSubmit={handleSubmit(handleOnSubmit)} formState={formState} setError={setError} transNs="account">
          <TextFieldControl name="username" required label={t('Username')} control={control} transNs="account" />
          <TextFieldControl name="password" required label={t('Password')} control={control} transNs="account" type="password" />
          <Button disabled={processing} size="large" sx={{ mt: 3 }} variant="contained" fullWidth type="submit">
            {t('Login now')}
          </Button>
        </Form>

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
