import { SitDetail as SitDetailType, ExamService } from '@/api';
import { formatDuration } from '@/helper/util';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';

/**
 *
 * SitDetail
 *
 */

const steps = ['Exam Guidelines Notice', 'Exam Authentication', 'Start Exam'];

const SitDetail = () => {
  const { t } = useTranslation('exam');
  const [activeStep, setActiveStep] = useState(0);
  const { sitId } = useParams() as { sitId: string };

  // fetch sit data
  const { data } = useSWRImmutable<SitDetailType>(`sit-detail:${sitId}`, async () => {
    return await ExamService.examSitRetrieve({ id: parseInt(sitId, 10) });
  });

  // TODO watch
  const examStart = '2024-03-08T04:45:16.125863+09:00';

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (!data) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 4 }}>
          {data.exam.name}
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{t(label)}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep !== steps.length && (
          <>
            <Box
              sx={{
                mx: 'auto',
                maxWidth: 'fit-content',
                minHeight: '230px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {activeStep === 0 && (
                <>
                  <Typography variant="h6" textAlign="center" sx={{ my: 3 }}>
                    {t(steps[activeStep])}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      {t('{{length}} questions, and the exam duration is {{minutes}} minutes.', {
                        length: data.selected_questions.length,
                        minutes: Math.floor(data.exam.time_limit_seconds / 60),
                      })}
                    </Typography>
                    {data.exam.cutoff && (
                      <Typography variant="subtitle1">
                        {t(
                          'The passing score is {{cutoff}}. If you fail to meet this criterion, you will be considered unsuccessful regardless of other criteria.',
                          { cutoff: data.exam.cutoff },
                        )}
                      </Typography>
                    )}
                    <Typography variant="subtitle1">
                      {t(
                        'You can only submit the answer once, and you cannot pause or cancel it.',
                      )}
                    </Typography>

                    {!!data.exam.selection_option_data.essay && (
                      <Typography variant="body1">
                        {t(
                          'You cannot go back to the previous question after moving to the next question.',
                        )}
                      </Typography>
                    )}
                  </Stack>
                </>
              )}
              {activeStep === 1 && (
                <Typography variant="h6" textAlign="center" sx={{ my: 3 }}>
                  {t('Exam Authentication')}
                </Typography>
              )}
              {activeStep === 2 && (
                <Typography variant="h6" textAlign="center" sx={{ my: 3 }}>
                  <CountdownClock seconds={data.exam.time_limit_seconds} start={examStart} />
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                size="large"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {t('Back')}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button size="large" onClick={handleNext}>
                {activeStep === steps.length - 1 ? t('Start Exam') : t('Next')}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SitDetail;

const CountdownClock = ({ seconds }: { seconds: number; start: string }) => {
  const [time, setTime] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <Box>
      <Typography variant="h3">{formatDuration(time)}</Typography>
    </Box>
  );
};
