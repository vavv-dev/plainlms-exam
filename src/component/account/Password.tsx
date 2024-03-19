import { loginPath, reverse } from '@/App';
import { AccountService } from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined';
import { Alert, Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Form, TextFieldControl } from './FormHelper';
import { accountProcessingState, userState } from './account';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('This field is required'),
});

const Password = () => {
  const { t } = useTranslation('account');
  const navigate = useNavigate();

  const user = useAtomValue(userState);
  const [processing, setProcessing] = useAtom(accountProcessingState);
  const [successAlert, setSuccessAlert] = useState('');

  const { handleSubmit, control, setError, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const handleOnSubmit = ({ email }: { email: string }) => {
    setProcessing(true);
    setSuccessAlert('');

    AccountService.accountUserResetPasswordCreate({
      requestBody: { email },
    })
      .then(() => {
        setSuccessAlert(t('Password reset email has been sent. Follow the instructions in the email to reset your password.'));
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
          {successAlert && (
            <Alert severity="success" sx={{ mb: 2 }} onClick={() => setSuccessAlert('')}>
              {successAlert}
            </Alert>
          )}

          <Typography variant="body2" sx={{ my: '1em' }}>
            {t('Enter your email address to request a password reset. You will receive an email with instructions.')}
          </Typography>

          <TextFieldControl name="email" required label={t('Email')} control={control} transNs="account" />

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

export default Password;
