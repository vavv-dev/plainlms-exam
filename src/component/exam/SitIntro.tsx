import { ExamService, SitDetail as SitDetailType } from '@/api';
import { alertState } from '@/component/layout/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useAtomValue, useSetAtom } from 'jotai';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import * as yup from 'yup';
import { sitDisabledState, sitEndpoint, sitStepState } from './exam';

const EXAM_GUIDELINES = [
  'Using dishonest methods during the exam may invalidate the test results and result in disadvantages.',
  'If someone else takes the exam on behalf of the test taker or takes the exam by proxy, the test results may be invalidated, resulting in disadvantages.',
  'If someone copies answers from others or provides answers to others, the test results may be invalidated, resulting in disadvantages.',
];

const schema = yup.object({
  ...EXAM_GUIDELINES.reduce((acc, _, i) => {
    acc[String(i)] = yup.boolean().oneOf([true]);
    return acc;
  }, {} as Record<string, yup.BooleanSchema>),
});

const SitIntro = ({ sitData }: { sitData: SitDetailType }) => {
  const { t } = useTranslation('exam');
  const setSitStep = useSetAtom(sitStepState(Number(sitData.id)));
  const setAlert = useSetAtom(alertState);
  const sitDisabled = useAtomValue(sitDisabledState(Number(sitData.id)));

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: EXAM_GUIDELINES.reduce((acc, _, i) => {
      acc[String(i)] = sitData.consent ? true : false;
      return acc;
    }, {} as Record<string, boolean>),
  });

  const handleIntroSubmit = async () => {
    if (!sitData.consent) {
      await ExamService.examSitPartialUpdate({
        id: sitData.id,
        requestBody: {
          consent: new Date().toISOString(),
        },
      })
        .then(() => {
          // fetch sit data for update step
          mutate(`${sitEndpoint}/${sitData.id}`);
        })
        .catch(() => {
          setAlert({
            open: true,
            message: t('Unknown error occurred. Please try again.'),
            severity: 'error',
          });
        });
    }
    setSitStep((sitStep) => sitStep + 1);
  };

  return (
    <Box sx={{ maxWidth: 'md', mx: 'auto !important' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        {t('Exam Instruction')}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {t('Please read the following guidelines and check the box to proceed.')}
      </Typography>

      <form onSubmit={handleSubmit(handleIntroSubmit)} noValidate>
        {EXAM_GUIDELINES.map((v, i) => (
          <Controller
            key={i}
            name={String(i)}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{ py: '4px' }}
                control={<Checkbox required {...field} checked={field.value} disabled={sitDisabled} />}
                label={t(v)}
              />
            )}
          />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'end', my: 2, gap: 3 }}>
          <Button disabled={!isValid} type="submit">
            {t('Next')}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SitIntro;
