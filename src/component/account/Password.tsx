import { Alert, Avatar, Box, Button, Container, Typography } from '@mui/material';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FormTextField } from './FormHelper';
import { processingState } from './account';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { loginPath, reverse } from '@/App';
import { AccountService } from '@/api';

const Password = () => {
  const { t } = useTranslation('account');
  const navigate = useNavigate();

  const [processing, setProcessing] = useAtom(processingState);

  const handleResetPassword = (
    { email }: { email: string },
    helpers: FormikHelpers<{ email: string; detail: string }>,
  ) => {
    setProcessing(true);

    AccountService.accountUserResetPasswordCreate({
      requestBody: { email },
    })
      .then(() => {
        helpers.setStatus({
          detail: t(
            'Password reset email has been sent. ' +
              'Follow the instructions in the email to reset your password.',
          ),
        });
      })
      .catch((error) => {
        const errorBody = error.body;
        const genericErrors = [];
        for (const key in errorBody) {
          if (key == 'email') {
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
          <VpnKeyOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ my: '.5em' }}>
          {t('Password reset')}
        </Typography>

        <Formik
          initialValues={{
            email: '',
            detail: '',
          }}
          validationSchema={yup.object({
            email: yup.string().email(t('Invalid email')).required(t('This field is required')),
          })}
          onSubmit={handleResetPassword}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              {props.errors.detail && <Alert severity="warning">{props.errors.detail}</Alert>}
              {props.status && props.status.detail && (
                <Alert severity="success">{props.status.detail}</Alert>
              )}
              <Typography variant="body2" sx={{ my: '1em' }}>
                {t(
                  'Enter your email address to request a password reset. ' +
                    'You will receive an email with instructions.',
                )}
              </Typography>
              <FormTextField name="email" label="Email" {...props} />
              <Button
                disabled={processing}
                size="large"
                sx={{ mt: '2em' }}
                variant="contained"
                fullWidth
                type="submit"
              >
                {t('Request password reset')}
              </Button>
            </form>
          )}
        </Formik>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box onClick={() => navigate(reverse(loginPath))} sx={{ cursor: 'pointer' }}>
            {t('Login now')}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Password;
