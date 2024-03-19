import { ExamService, SitDetail as SitDetailType } from '@/api';
import { alertState, stopWatchContainerState } from '@/component/layout/layout';
import { formatDuration } from '@/helper/util';
import { Portal, Typography } from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import { sitEndpoint, sitStepState } from './exam';

const StopWatch = ({ sitData, getValues }: { sitData: SitDetailType; getValues: () => void }) => {
  const { t } = useTranslation('exam');
  // initialize with 1 to avoid auto finishing when zero remain seconds
  const [remainSeconds, setRemainSeconds] = useState<number>(0);
  const [sitStep, setSitStep] = useAtom(sitStepState(Number(sitData.id)));
  const setAlert = useSetAtom(alertState);

  // portal
  const stopWatchContainer = useAtomValue(stopWatchContainerState);

  useEffect(() => {
    const attempt = sitData.attempt;
    if (!attempt || attempt.finish) return;

    const start = attempt.start ? new Date(attempt.start).getTime() : new Date().getTime();
    const updateWatch = () => {
      if (!sitData.exam.time_limit_seconds) return;
      const duration = sitData.exam.time_limit_seconds;
      const remain = Math.ceil((start + duration * 1000 - new Date().getTime()) / 1000);
      if (remain < -1) clearInterval(interval);
      setRemainSeconds(remain);
    };

    const interval = setInterval(updateWatch, 1000);
    updateWatch();

    // save client start time
    if (!attempt.start) {
      ExamService.examAttemptPartialUpdate({
        id: attempt.id,
        requestBody: {
          start: new Date(start).toISOString(),
        },
      }).catch(() => {
        setSitStep(sitStep - 1);
        setAlert({
          open: true,
          message: t('Unknown error occurred. Please try again.'),
          severity: 'error',
        });
      });
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [sitData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const attempt = sitData.attempt;
    if (attempt.finish) return;
    if (remainSeconds <= -1) {
      ExamService.examAttemptFinishPartialUpdate({
        id: sitData.attempt.id,
        requestBody: {
          sit: sitData.id,
          answers: getValues(),
          finish: new Date().toISOString(),
        },
      }).then(async () => {
        // revalidate
        await mutate(`${sitEndpoint}/${sitData.id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [remainSeconds]);

  const attempt = sitData.attempt;
  if (!attempt || attempt.finish || !stopWatchContainer) return null;

  return (
    remainSeconds > 0 && (
      <Portal container={stopWatchContainer.current}>
        <Typography
          sx={{
            fontWeight: 600,
            mx: 2,
            color: remainSeconds < 60 * 10 ? 'error.main' : 'text.primary',
          }}
        >{`${t('Exam Finish Remains')} ${formatDuration(remainSeconds)}`}</Typography>
      </Portal>
    )
  );
};

export default StopWatch;
