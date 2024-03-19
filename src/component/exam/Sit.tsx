import { ExamService, SitDetail as SitDetailType } from '@/api';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import SitGrading from './SitGrading';
import SitIntro from './SitIntro';
import SitPaper from './SitPaper';
import SitTitle from './SitTitle';
import SitVerification from './SitVerification';
import { sitDataStepState, sitDisabledState, sitEndpoint, sitStepState } from './exam';

/**
 *
 * Sit
 *
 */

enum STEPS {
  INTRO = 0,
  VERIFICATION = 1,
  EXAMINING = 2,
  GRADING = 3,
}

const STEP_LENGTH = 4;
const STEP_LABELS = ['Exam Instruction', 'Verification', 'Examining', 'Grading'];

const Sit = () => {
  const { sitId } = useParams() as { sitId: string };
  const [sitStep, setSitStep] = useAtom(sitStepState(Number(sitId)));
  const [sitDataStep, setSitDataStep] = useAtom(sitDataStepState(Number(sitId)));
  const setSitDisabled = useSetAtom(sitDisabledState(Number(sitId)));

  // fetch sit data
  const { data: sitData } = useSWRImmutable<SitDetailType>(`${sitEndpoint}/${sitId}`, async () => {
    return await ExamService.examSitRetrieve({ id: parseInt(sitId, 10) });
  });

  useEffect(() => {
    // bad request
    if (!sitData) return;

    let initialStep = 0;

    // current step
    if (!sitData.consent) initialStep = STEPS.INTRO;
    else if (!sitData.verification) initialStep = STEPS.VERIFICATION;
    else if (!sitData.attempt?.finish) initialStep = STEPS.EXAMINING;
    else if (!sitData.attempt?.score?.completed) initialStep = STEPS.GRADING;
    else if (sitData.attempt?.score?.completed) initialStep = STEPS.GRADING + 1;

    // test
    // initialStep = STEPS.EXAMINING + 1;

    // ui sitStep
    setSitStep(initialStep);
    setSitDataStep(initialStep);
  }, [sitData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!sitData) return;
    // submitted
    let disabled = false;
    if (sitData.attempt?.finish) disabled = true;
    // past due
    const now = new Date().getTime();
    if (sitData.due && now > new Date(sitData.due).getTime()) disabled = true;
    // time exceeded without submission
    if (sitData.exam.time_limit_seconds && sitData.attempt?.start) {
      const start = new Date(sitData.attempt.start).getTime();
      const duration = sitData.exam.time_limit_seconds;
      if (now > start + duration * 1000) disabled = true;
    }
    // past step
    if (sitStep != sitDataStep) disabled = true;
    setSitDisabled(disabled);
  }, [sitData, sitStep, sitDataStep, setSitDisabled]);

  if (!sitData) {
    return null;
  }

  return (
    <Box sx={{ px: 3 }}>
      <Stack spacing={5} sx={{ width: '100%', maxWidth: 'lg', mx: 'auto' }}>
        <SitTitle sitData={sitData} />
        <SitStepper sitData={sitData} />
        {sitStep === STEPS.INTRO && <SitIntro sitData={sitData} />}
        {sitStep === STEPS.VERIFICATION && <SitVerification sitData={sitData} />}
        {sitStep === STEPS.EXAMINING && <SitPaper sitData={sitData} />}
        {sitStep >= STEPS.GRADING && <SitGrading sitData={sitData} />}
      </Stack>
    </Box>
  );
};

export default Sit;

const SitStepper = ({ sitData }: { sitData: SitDetailType }) => {
  const { t } = useTranslation('exam');
  const [sitStep, setSitStep] = useAtom(sitStepState(Number(sitData.id)));
  const sitDataStep = useAtomValue(sitDataStepState(Number(sitData.id)));
  const sitDisabled = useAtomValue(sitDisabledState(Number(sitData.id)));

  return (
    <Stepper activeStep={sitStep} alternativeLabel>
      {STEP_LABELS.map((label, i) => {
        const labelProps: { optional?: ReactNode } = {};

        let text = '';
        if (i > sitDataStep) {
          text = '';
        } else if (i == sitDataStep) {
          if (sitDisabled) {
            text = 'Past due';
            if (i === STEPS.EXAMINING) {
              const limit = sitData.exam.time_limit_seconds;
              if (sitData.attempt && limit) {
                const time = new Date(sitData.attempt.start as string).getTime() + limit * 1000;
                const now = new Date().getTime();
                if (time < now) {
                  text = 'Not submitted';
                }
              }
            }
          } else {
            text = 'In progress';
          }
        } else {
          text = 'Completed';
        }

        labelProps.optional = (
          <Typography variant="caption" sx={{ color: 'error.dark' }}>
            {text && t(text)}
          </Typography>
        );

        const handleStepClick = () => {
          if (i > sitDataStep) return;
          if (i === STEP_LENGTH - 1) {
            setSitStep(sitStep === i ? sitStep + 1 : i);
          } else {
            setSitStep(i);
          }
        };

        return (
          <Step key={label}>
            <StepLabel
              {...labelProps}
              onClick={handleStepClick}
              sx={{
                cursor: i <= sitDataStep ? 'pointer !important' : 'default',
                '& .Mui-active .MuiStepIcon-root': { color: 'primary.light' },
              }}
            >
              {t(label)}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
