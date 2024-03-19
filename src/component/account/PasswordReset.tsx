import { loginPath, reverse } from '@/App';
import { AccountService } from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { alertState } from '../layout/layout';
import { Form, TextFieldControl as Text } from './FormHelper';
import { accountProcessingState, userState } from './account';

const schema = yup.object({
  // follow api field name for form field validation
  new_password: yup.string().required('This field is required'),
  new_password2: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('new_password')], "Passwords don't match"),
});

const PasswordReset = () => {
  const { t } = useTranslation('account');
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const user = useAtomValue(userState);
  const [processing, setProcessing] = useAtom(accountProcessingState);
  const setAlert = useSetAtom(alertState);

  const { handleSubmit, control, setError, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      new_password: '',
    },
  });

  const handleOnSubmit = ({ new_password }: { new_password: string }) => {
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
        if (error.body) {
          setError('root.server', error.body);
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

        <Form onSubmit={handleSubmit(handleOnSubmit)} formState={formState} setError={setError} transNs="account">
          <Typography variant="body2" sx={{ my: '1em' }}>
            {t('Enter your new password.')}
          </Typography>

          <Text name="new_password" required label={t('New password')} control={control} transNs="account" type="password" />
          <Text name="new_password2" required label={t('Retype Password')} control={control} transNs="account" type="password" />

          <Button disabled={processing} size="large" sx={{ mt: 3 }} variant="contained" fullWidth type="submit">
            {t('Request password reset')}
          </Button>
        </Form>

        {!user && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box onClick={() => navigate(reverse(loginPath))} sx={{ cursor: 'pointer' }}>
              {t('Login now')}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PasswordReset;
