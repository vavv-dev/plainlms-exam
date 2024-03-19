import { FormatEnum, QuestionDetail as QuestionDetailType } from '@/api';
import {
  Alert,
  Divider,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useRadioGroup,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { FieldError } from 'react-hook-form';

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

// react-hook-form field props
interface RHFFieldProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
}

const QuestionControl = ({
  q,
  n,
  rhf,
  err,
  grading,
  children,
}: {
  q: QuestionDetailType;
  n: number;
  rhf: RHFFieldProps;
  err?: FieldError;
  grading?: boolean;
  children?: React.ReactNode;
}) => {
  // if rhf.disabled, show sit is finished
  return (
    <FormControl component="fieldset" sx={{ py: 3, width: '100%' }}>
      <Title q={q} n={n} />
      {children}
      {(q.format === FormatEnum.MULTIPLE_CHOICE || q.format === FormatEnum.OX_SELECTION) && (
        <Choices q={q} rhf={rhf} grading={grading} />
      )}
      {q.format === FormatEnum.TEXT_INPUT && <Text q={q} rhf={rhf} />}
      {q.format === FormatEnum.ESSAY && <Essay q={q} rhf={rhf} />}
      {err && <Alert severity="warning">{err.message}</Alert>}
      {grading && (
        <>
          <Correct q={q} />
          <Explanation q={q} />
        </>
      )}
    </FormControl>
  );
};

export default QuestionControl;

const Title = ({ q, n }: { q: QuestionDetailType; n: number }) => {
  const { t } = useTranslation('exam');

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6">{`${n + 1}.`} </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600, whiteSpace: 'pre-wrap' }}>
        {`${q.question}`}
        <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>
          {q.weight} {t('score(s)')}
        </Typography>
      </Typography>
      {q.description && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {q.description}
        </Typography>
      )}
    </Box>
  );
};

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
    ':hover:not(.Mui-disabled)': {
      backgroundColor: theme.palette.action.hover,
    },
    marginLeft: 0,
    marginRight: 0,
  }),
);

const ChoiceControlLabel = (props: FormControlLabelProps) => {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }
  return <StyledFormControlLabel checked={checked} {...props} />;
};

const Choices = ({ q, grading, rhf }: { q: QuestionDetailType; grading: boolean | undefined; rhf: RHFFieldProps }) => {
  const theme = useTheme();

  if (!q.choices || q.choices.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 2 }}>
      <RadioGroup name={String(q.id)} {...rhf}>
        {q.choices?.map((choice, i) => (
          <ChoiceControlLabel
            key={i}
            {...(grading &&
              q.correct_choices &&
              q.correct_choices?.indexOf(i + 1) > -1 && { sx: { boxShadow: `inset 0 0 0 2px ${theme.palette.success.main}` } })}
            value={String(i + 1)}
            control={<Radio disabled={rhf.disabled} />}
            label={choice}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

const Text = ({ q, rhf }: { q: QuestionDetailType; rhf: RHFFieldProps }) => {
  void q;
  const { t } = useTranslation('exam');

  return (
    <Box sx={{ py: 2 }}>
      <TextField multiline minRows={2} maxRows={40} sx={{ width: '100%' }} placeholder={t('Write your answer here')} {...rhf} />
    </Box>
  );
};

const Essay = ({ q, rhf }: { q: QuestionDetailType; rhf: RHFFieldProps }) => {
  void q;
  const { t } = useTranslation('exam');

  return (
    <Box sx={{ py: 2 }}>
      <TextField multiline minRows={8} maxRows={20} sx={{ width: '100%' }} placeholder={t('Write your answer here')} {...rhf} />
    </Box>
  );
};

const Correct = ({ q }: { q: QuestionDetailType }) => {
  const { t } = useTranslation('exam');

  if (!q.correct_choices || q.correct_choices.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {t('Correct Choices')} {q.correct_choices?.join(', ')}
      </Typography>
    </Box>
  );
};

const Explanation = ({ q }: { q: QuestionDetailType }) => {
  const { t } = useTranslation('exam');

  if (!(q.lesson_reference || q.knowledge_reference || q.correct_criteria || q.explanation)) {
    return null;
  }

  return (
    <Box sx={{ py: 2 }}>
      <Stack divider={<Divider />} spacing={2} sx={{ p: 2, backgroundColor: 'action.hover' }}>
        {(q.lesson_reference || q.knowledge_reference) && (
          <Typography component="div" variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            <Typography component="span" variant="subtitle1" sx={{ fontWeight: 600, display: 'block' }}>
              {t('Reference')}
            </Typography>
            <Stack spacing={1} direction="row" divider={<Divider orientation="vertical" flexItem />}>
              {q.lesson_reference && (
                <Typography component="span" variant="body2">
                  {t('Lesson')} {q.lesson_reference}
                </Typography>
              )}
              {q.knowledge_reference && (
                <Typography component="span" variant="body2">
                  {q.knowledge_reference?.replace(/\n/g, ', ')}
                </Typography>
              )}
            </Stack>
          </Typography>
        )}
        {q.correct_criteria && (
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            <Typography component="span" variant="subtitle1" sx={{ fontWeight: 600, display: 'block' }}>
              {t('Correct Criteria')}
            </Typography>
            {q.correct_criteria}
          </Typography>
        )}
        {q.explanation && (
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            <Typography component="span" variant="subtitle1" sx={{ fontWeight: 600, display: 'block' }}>
              {t('Explanation')}
            </Typography>
            {q.explanation}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
