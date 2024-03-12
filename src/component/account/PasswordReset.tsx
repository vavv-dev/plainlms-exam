import { loginPath, reverse } from '@/App';
import { AccountService } from '@/api';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined';
import { Alert, Avatar, Box, Button, Container, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { useAtom, useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { FormTextField } from './FormHelper';
import { processingState } from './account';
import { alertState } from '../layout/layout';

const PasswordReset = () => {
  const { t } = useTranslation('account');
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const [processing, setProcessing] = useAtom(processingState);
  const setAlert = useSetAtom(alertState);

  const handleResetPasswordConfirm = (
    // new_password: field name must be same as api field name
    { new_password }: { new_password: string },
    helpers: FormikHelpers<{
      new_password: string;
      new_password2: string;
      detail: string;
    }>,
  ) => {
    setProcessing(true);

    AccountService.accountUserResetPasswordConfirmCreate({
      requestBody: {
        uid: uid as string,
        token: token as string,
        new_password: new_password,
      },
    })
      .then(() => {
        setAlert({
          open: true,
          severity: 'success',
          message: t('Sucessfully password changed. You can login with new password.'),
        });
        navigate(reverse(loginPath));
      })
      .catch((error) => {
        const errorBody = error.body;
        const genericErrors = [];
        for (const key in errorBody) {
          if (key == 'new_password') {
            helpers.setFieldError(key, t(errorBody[key]));
          } else {
            genericErrors.push(t(errorBody[key]));
          }
        }
        // generic error
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
          {t('Complete password reset')}
        </Typography>

        <Formik
          initialValues={{
            new_password: '',
            new_password2: '',
            detail: '',
          }}
          validationSchema={yup.object({
            new_password: yup.string().required(t('Input your new password.')),
            new_password2: yup
              .string()
              .required(t('This field is required'))
              .oneOf([yup.ref('new_password')], t("Passwords don't match")),
          })}
          onSubmit={handleResetPasswordConfirm}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              {props.errors.detail && <Alert severity="warning">{props.errors.detail}</Alert>}
              <Typography variant="body2" sx={{ my: '1em' }}>
                {t('Enter your new password.')}
              </Typography>

              {/* prettier-ignore */}
              <FormTextField name="new_password" passwordAorment="showPassword" label="New password" {...props} />
              {/* prettier-ignore */}
              <FormTextField name="new_password2" passwordAorment="showPassword2" label="Confirm Password" {...props} />

              <Button
                disabled={processing}
                size="large"
                sx={{ mt: '2em' }}
                variant="contained"
                fullWidth
                type="submit"
              >
                {t('Password reset confirm')}
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

export default PasswordReset;
