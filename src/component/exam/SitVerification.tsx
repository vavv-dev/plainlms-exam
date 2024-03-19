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

const schema = yup.object({
  verification: yup.boolean().oneOf([true]),
});

const SitVerification = ({ sitData }: { sitData: SitDetailType }) => {
  const { t } = useTranslation('exam');
  const setAlert = useSetAtom(alertState);
  const setSitStep = useSetAtom(sitStepState(Number(sitData.id)));
  const sitDisabled = useAtomValue(sitDisabledState(Number(sitData.id)));

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      verification: sitData.verification ? true : false,
    },
  });

  const handleVerificationSubmit = async () => {
    if (!sitData.verification) {
      await ExamService.examSitPartialUpdate({
        id: sitData.id,
        requestBody: {
          verification: new Date().toISOString(),
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
      <Typography sx={{ textAlign: 'center', fontWeight: 700 }} variant="h5">
        {t('ID Verification')}
      </Typography>

      <Box sx={{ my: 5 }}>
        <form onSubmit={handleSubmit(handleVerificationSubmit)} noValidate>
          {sitData.exam.verification_required && (
            <Typography variant="body1">TODO cellphone or motp verification process</Typography>
          )}
          <Controller
            name="verification"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{ py: '4px' }}
                control={<Checkbox required {...field} checked={field.value} disabled={sitDisabled} />}
                label={`${sitData.user.name}(${sitData.user.username}) 본인임을 확인합니다.`}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2, gap: 3 }}>
            <Button size="large" onClick={() => setSitStep((sitStep) => sitStep - 1)}>
              {t('Previous')}
            </Button>
            <Button size="large" disabled={!isValid} type="submit">
              {t('Next')}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SitVerification;
