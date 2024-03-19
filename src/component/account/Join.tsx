import { loginPath, privacyPath, reverse, termsPath } from '@/App';
import { AccountService } from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import BadgeOutlined from '@mui/icons-material/BadgeOutlined';
import { Button, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useAtom, useSetAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { alertState } from '../layout/layout';
import { CheckboxControl as Check, Form, TextFieldControl as Text } from './FormHelper';
import { accountProcessingState } from './account';

const schema = yup.object({
  name: yup.string().required('This field is required'),
  username: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
  password: yup.string().required('This field is required'),
  password2: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password')], "Passwords don't match"),
  terms: yup.boolean().oneOf([true], 'This field is required'),
  privacy: yup.boolean().oneOf([true], 'This field is required'),
});

interface JoinFormField {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function Join() {
  const { t } = useTranslation('account');
  const navigate = useNavigate();

  const [processing, setProcessing] = useAtom(accountProcessingState);
  const setAlert = useSetAtom(alertState);

  const { handleSubmit, control, setError, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      password2: '',
      terms: false,
      privacy: false,
    },
  });

  const handleOnSubmit = ({ name, username, email, password }: JoinFormField) => {
    setProcessing(true);
    AccountService.accountUserCreate({
      requestBody: { name, username, email, password },
    })
      .then(() => {
        // global alert
        setAlert({
          open: true,
          severity: 'success',
          message: t('{{ name }}, sucessfully joined. Please login.', { name }),
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
          <BadgeOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ my: '.5em' }}>
          {t('Member Join')}
        </Typography>

        <Form onSubmit={handleSubmit(handleOnSubmit)} formState={formState} setError={setError} transNs="account">
          <Text name="name" required label={t('Name')} control={control} transNs="account" />
          <Text name="username" required label={t('Username')} control={control} transNs="account" />
          <Text name="email" required label={t('Email')} control={control} transNs="account" />
          <Text name="password" required label={t('Password')} control={control} transNs="account" type="password" />
          <Text name="password2" required label={t('Retype Password')} control={control} transNs="account" type="password" />

          <Divider sx={{ my: 1, border: 'none' }} />

          <Check label={t('agree to Terms of Service')} name="terms" control={control} transNs="account" required>
            <Box sx={{ fontSize: '.8em' }} component={Link} to={reverse(termsPath)}>
              {t('View content')}
            </Box>
          </Check>
          <Check label={t('agree to Privacy Policy')} name="privacy" control={control} transNs="account" required>
            <Box sx={{ fontSize: '.8em' }} component={Link} to={reverse(privacyPath)}>
              {t('View content')}
            </Box>
          </Check>

          <Button disabled={processing} size="large" sx={{ mt: 3 }} variant="contained" fullWidth type="submit">
            {t('Join now')}
          </Button>
        </Form>

        <Box sx={{ my: 3 }}>
          <Box onClick={() => navigate(reverse(loginPath))} sx={{ cursor: 'pointer' }}>
            {t('Already have an account? Login')}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
