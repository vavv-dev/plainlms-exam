import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formState: any; // eslint-disable-line
  setError: any; // eslint-disable-line
  transNs: string;
  children: React.ReactNode;
}

/**
 *
 * Form helper component
 * handle form validation errors from server
 *
 */
export const Form: React.FC<FormProps> = ({ onSubmit, formState, setError, transNs, children }) => {
  const { t } = useTranslation(transNs);
  const [noneFieldErrors, setNoneFieldErrors] = useState<string[]>([]);

  useEffect(() => {
    const errorsFromServer = formState.errors?.root?.server || {};
    for (const key in errorsFromServer) {
      if (key in formState.defaultValues) {
        // set field error
        setError(key, { type: key, message: t(errorsFromServer[key]) });
      } else if (errorsFromServer[key]) {
        setNoneFieldErrors((prev) => [...prev, t(errorsFromServer[key])]);
      }
    }
    return () => {
      setNoneFieldErrors([]);
    };
  }, [formState.errors?.root?.server, formState.defaultValues, setError, t]);

  return (
    <form onSubmit={onSubmit} noValidate>
      {noneFieldErrors.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {noneFieldErrors.join('\n\r')}
        </Alert>
      )}
      {children}
    </form>
  );
};

interface CheckboxControlProps extends FormControlProps {
  name: string;
  label: string;
  control: any; // eslint-disable-line
  transNs: string;
}

export const CheckboxControl = ({ name, label, control, transNs, ...props }: CheckboxControlProps) => {
  const { t } = useTranslation(transNs);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} fullWidth sx={{ '& .MuiCheckbox-root': { py: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel label={label} control={<Checkbox {...field} checked={field.value} required={props.required} />} />
            {props.children}
          </Box>
          <FormHelperText sx={{ mx: 0 }}>{error && error.message ? t(error.message) : ' '}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

interface TextFieldControlProps extends Omit<TextFieldProps, 'type'> {
  name: string;
  control: any; // eslint-disable-line
  type?: string;
  readOnly?: boolean;
  transNs: string;
}

export const TextFieldControl = ({ name, control, type, transNs, ...props }: TextFieldControlProps) => {
  const { t } = useTranslation(transNs);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={props.label}
          variant={props.variant || 'standard'}
          autoComplete={props.autoComplete || name}
          required={props.required || false}
          error={error ? true : false}
          helperText={error?.message ? t(error.message as string) : ' '}
          fullWidth={props.fullWidth || true}
          margin={props.margin || 'none'}
          type={type == 'password' ? (showPassword ? 'text' : 'password') : type}
          InputProps={{
            readOnly: props.readOnly,
            ...(type == 'password' && {
              endAdornment: (
                <InputAdornment position="end" sx={{ mr: 1 }}>
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }),
          }}
          {...field}
          {...props}
        />
      )}
    />
  );
};
