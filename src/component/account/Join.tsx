import { loginPath, privacyPath, reverse, termsPath } from '@/App';
import { AccountService } from '@/api';
import BadgeOutlined from '@mui/icons-material/BadgeOutlined';
import { Alert, Button, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Formik, FormikHelpers } from 'formik';
import { useAtom, useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { alertState } from '../layout/layout';
import { FormCheckboxField, FormTextField } from './FormHelper';
import { processingState } from './account';

export default function Join() {
  const { t } = useTranslation('account');
  const navigate = useNavigate();

  const [processing, setProcessing] = useAtom(processingState);
  const setAlert = useSetAtom(alertState);

  const handleOnSubmit = (
    {
      name,
      username,
      email,
      password,
    }: {
      name: string;
      username: string;
      email: string;
      password: string;
    },
    helpers: FormikHelpers<{
      name: string;
      username: string;
      email: string;
      password: string;
      password2: string;
      detail: string;
      terms: boolean;
      privacy: boolean;
    }>,
  ) => {
    setProcessing(true);
    AccountService.accountUserCreate({
      requestBody: { name, username, email, password },
    })
      .then(() => {
        setAlert({
          open: true,
          severity: 'success',
          message: t('{{ name }}, sucessfully joined. Please login.', { name }),
        });
        navigate(reverse(loginPath));
      })
      .catch((error) => {
        const errorBody = error.body;
        const genericErrors = [];
        for (const key in errorBody) {
          if (key == 'name' || key == 'username' || key == 'email' || key == 'password') {
            helpers.setFieldError(key, t(errorBody[key]));
          } else {
            genericErrors.push(t(errorBody[key]));
          }
        }
        if (genericErrors.length) {
          helpers.setErrors({ detail: genericErrors.join(' ') });
        }
      })
      .finally(() => {
        setProcessing(false);
      });
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
          <BadgeOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ my: '.5em' }}>
          {' '}
          {t('Member Join')}
        </Typography>

        <Formik
          initialValues={{
            name: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            detail: '',
            terms: false,
            privacy: false,
          }}
          validationSchema={yup.object({
            name: yup.string().required(t('This field is required')),
            username: yup.string().required(t('This field is required')),
            email: yup.string().email(t('Invalid email')).required(t('This field is required')),
            password: yup.string().required(t('This field is required')),
            password2: yup
              .string()
              .required(t('This field is required'))
              .oneOf([yup.ref('password')], t("Passwords don't match")),
            terms: yup.boolean().oneOf([true], t('This field is required')),
            privacy: yup.boolean().oneOf([true], t('This field is required')),
          })}
          onSubmit={handleOnSubmit}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              {props.errors.detail && <Alert severity="warning">{props.errors.detail}</Alert>}

              <FormTextField name="name" label="Name" {...props} />
              <FormTextField name="username" label="Username" {...props} />
              <FormTextField name="email" label="Email" {...props} />

              {/* prettier-ignore */}
              <FormTextField name="password" label="Password" passwordAorment="showPassword" {...props} />
              {/* prettier-ignore */}
              <FormTextField name="password2" label="Confirm Password" passwordAorment="showPassword2" {...props} />
              <Divider sx={{ my: 1, border: 'none' }} />
              {/* prettier-ignore */}
              <FormCheckboxField name="terms" label={t('agree to Terms of Service')} to={reverse(termsPath)} {...props} />
              {/* prettier-ignore */}
              <FormCheckboxField name="privacy" label={t('agree to Privacy Policy')} to={reverse(privacyPath)} {...props} />

              <Button
                disabled={processing}
                size="large"
                sx={{ mt: '2em' }}
                variant="contained"
                fullWidth
                type="submit"
              >
                {t('Join now')}
              </Button>
            </form>
          )}
        </Formik>
        <Box sx={{ my: 3 }}>
          <Box onClick={() => navigate(reverse(loginPath))} sx={{ cursor: 'pointer' }}>
            {t('Already have an account? Login')}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
