import { passwordPath, reverse } from '@/App';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined';
import { AccountService } from '@/api';
import { homeUserState } from '@/component/layout/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button } from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Form, TextFieldControl as Text } from './FormHelper';
import { accountProcessingState, userState } from './account';

interface ProfileForm {
  name: string;
  username: string;
  email: string;
  description: string;
}

const schema = yup.object({
  name: yup.string().required('This field is required'),
  username: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
  description: yup.string().required('This field is required'),
});

const Profile = () => {
  const { t } = useTranslation('account');
  const navigate = useNavigate();

  const [processing, setProcessing] = useAtom(accountProcessingState);
  const [successAlert, setSuccessAlert] = useState('');

  const [user, setUser] = useAtom(userState);
  const [homeUser, setHomeUser] = useAtom(homeUserState);
  const myProfile = homeUser?.username === user?.username;

  const { handleSubmit, control, setError, formState, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      description: '',
    },
  });

  useEffect(() => {
    reset({
      name: homeUser?.name || '',
      username: homeUser?.username || '',
      email: homeUser?.email || '',
      description: homeUser?.description || '',
    });
  }, [homeUser, reset]);

  const handleOnSubmit = ({ name, username, email, description }: ProfileForm) => {
    setProcessing(true);
    setSuccessAlert('');

    AccountService.accountUserPartialUpdate({
      username: username,
      requestBody: { name, email, description },
    })
      .then((user) => {
        setUser(user);
        setHomeUser(user);
        setSuccessAlert(t('Profile information has been updated.'));
      })
      .catch((error) => {
        if (error.body) {
          setError('root.server', error.body);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setProcessing(false);
        }, 500);
      });
  };

  return (
    <Box sx={{ display: 'block', width: '100%', p: 3 }}>
      <Box sx={{ margin: 'auto', maxWidth: 'sm', display: 'flex', flexDirection: 'column' }}>
        <Form onSubmit={handleSubmit(handleOnSubmit)} formState={formState} setError={setError} transNs="account">
          {successAlert && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessAlert('')}>
              {successAlert}
            </Alert>
          )}

          <Text name="name" required label={t('Name')} control={control} transNs="account" readOnly={!myProfile} />
          <Text name="username" required label={t('Username')} control={control} transNs="account" readOnly />
          <Text name="email" required label={t('Email')} control={control} transNs="account" readOnly={!myProfile} />
          <Text
            name="description"
            required
            label={t('Short description')}
            control={control}
            transNs="account"
            multiline
            minRows={3}
            readOnly={!myProfile}
          />

          {!!myProfile && (
            <>
              <Box
                onClick={() => navigate(reverse(passwordPath))}
                sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'pointer', gap: 1 }}
              >
                <VpnKeyOutlined /> {t('Change password')}
              </Box>

              <Button
                disabled={processing || !Object.keys(formState.dirtyFields).length}
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                fullWidth
                type="submit"
              >
                {t('Save profile information')}
              </Button>
            </>
          )}
        </Form>
      </Box>
    </Box>
  );
};

export default Profile;
