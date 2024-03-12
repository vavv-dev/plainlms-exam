import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import type { TextFieldProps } from '@mui/material/TextField';
import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface FormTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'onBlur'> {
  name: string;
  label: string;
  passwordAorment?: string;
  handleChange: (e: React.ChangeEvent) => void;
  handleBlur: (e: React.FocusEvent) => void;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
  values: Record<string, boolean | string | number>;
  setFieldValue: (field: string, value: boolean | string | number) => void;
}

export const FormTextField = ({ name, label, passwordAorment, ...props }: FormTextFieldProps) => {
  const { t } = useTranslation('account');

  // password visibility button
  const PasswordVisibilityButton = (field: string) => (
    <InputAdornment position="end" sx={{ mr: 1 }}>
      <IconButton edge="end" onClick={() => props.setFieldValue(field, !props.values[field])}>
        {props.values[field] ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <TextField
      name={name}
      label={t(label)}
      variant="standard"
      autoComplete={name}
      fullWidth
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      error={props.touched[name] && Boolean(props.errors[name])}
      helperText={(props.touched[name] && props.errors[name]) || ' '}
      // for password field
      {...(passwordAorment && { type: props.values[passwordAorment] ? 'text' : 'password' })}
      {...(passwordAorment && {
        InputProps: {
          endAdornment: PasswordVisibilityButton(passwordAorment),
        },
      })}
    />
  );
};

interface FormCheckboxFieldProps {
  name: string;
  values: Record<string, string | number | boolean>;
  label: string;
  to?: string;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
  handleChange: (e: FormEvent) => void;
  handleBlur: (e: React.FocusEvent) => void;
}

export const FormCheckboxField = ({ name, label, to, ...props }: FormCheckboxFieldProps) => {
  const { t } = useTranslation('account');

  return (
    <FormControl
      name={name}
      error={props.touched[name] && Boolean(props.errors[name])}
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      component="fieldset"
      fullWidth
      sx={{ '& .MuiCheckbox-root': { py: '2px' } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <FormControlLabel control={<Checkbox id={name} name={name} />} label={label} />{' '}
        <Box sx={{ fontSize: '.9em' }} {...(to && { component: Link, to: to })}>
          {t('View content')}
        </Box>
      </Box>
      <FormHelperText>
        {props.touched[name] && props.errors[name] ? props.errors[name] : ' '}
      </FormHelperText>
    </FormControl>
  );
};
