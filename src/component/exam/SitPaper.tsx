import { ExamService, FormatEnum, SitDetail as SitDetailType } from '@/api';
import { alertState } from '@/component/layout/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import * as yup from 'yup';
import QuestionControl from './QuestionHelper';
import StopWatch from './StopWatch';
import { sitDisabledState, sitEndpoint, sitStepState } from './exam';

interface IWatcherProps {
  [x: string]: string | undefined;
  [x: number]: string | undefined;
}

const SitPaper = ({ sitData }: { sitData: SitDetailType }) => {
  const { t } = useTranslation('exam');
  const theme = useTheme();

  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const setAlert = useSetAtom(alertState);
  const sitDisabled = useAtomValue(sitDisabledState(Number(sitData.id)));

  const indicatorRefs = useRef<Record<string, HTMLElement>>({});
  const submitBoxRef = useRef<HTMLButtonElement>(null);
  const scrollToTopRef = useRef<HTMLButtonElement>(null);

  const schema = yup.object({
    ...sitData.selected_questions.reduce((acc, q) => {
      const msg =
        q.format === FormatEnum.MULTIPLE_CHOICE || q.format === FormatEnum.OX_SELECTION
          ? t('Your answer is not selected.')
          : t('Your answer is not written.');
      acc[String(q.id)] = yup.string().required(msg);
      return acc;
    }, {} as Record<string, yup.StringSchema>),
  });

  const { handleSubmit, getValues, control, formState, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...sitData.selected_questions.reduce((acc, q) => {
        acc[String(q.id)] = sitData.attempt?.answers[String(q.id)] || '';
        return acc;
      }, {} as Record<string, string>),
    },
  });

  // submit
  const handleSubmitConfirm = () => {
    setSubmitDialogOpen(true);
  };

  // cancel submit
  const handleCancel = () => setSubmitDialogOpen(false);

  const handleSitPaperSubmit = async () => {
    await ExamService.examAttemptFinishPartialUpdate({
      id: sitData.attempt.id,
      requestBody: {
        sit: sitData.id,
        answers: getValues(),
        finish: new Date().toISOString(),
      },
    })
      .then(async () => {
        // revalidate
        await mutate(`${sitEndpoint}/${sitData.id}`);
      })
      .catch(() => {
        setAlert({
          open: true,
          severity: 'error',
          message: t('Unknown error occurred. Please try again.'),
        });
      });
    setSubmitDialogOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const updateIndicatorColor = (data: IWatcherProps, options: IWatcherProps) => {
      const indicatorRef = indicatorRefs.current[options.name as string];
      if (!indicatorRef) return;
      const value = data[options.name as string];
      const color = value ? theme.palette.primary.main : 'transparent';
      indicatorRef.style.backgroundColor = color;
    };
    const subscription = watch(updateIndicatorColor);

    // initial color
    sitData.selected_questions.forEach((q) => {
      updateIndicatorColor(
        sitData.attempt?.answers ||
          sitData.selected_questions.reduce((acc, q) => {
            acc[String(q.id)] = '';
            return acc;
          }, {} as Record<string, string>),
        { name: String(q.id) },
      );
    });
    return () => subscription.unsubscribe();
  }, [watch]); // eslint-disable-line react-hooks/exhaustive-deps

  // do not use state with scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (submitBoxRef.current) {
        submitBoxRef.current.style.position = window.scrollY > 30 ? 'sticky' : 'relative';
      }
      if (scrollToTopRef.current) {
        scrollToTopRef.current.style.display = window.scrollY > window.innerHeight ? 'block' : 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [submitBoxRef, scrollToTopRef]);

  // exam attempt double check
  if (!sitData.attempt && !sitDisabled) {
    return <AttemptConfirm sitData={sitData} />;
  }

  // hide sit paper to unattempted user
  if (sitDisabled && !sitData.attempt) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', mx: 'auto !important', position: 'relative' }}>
      {sitDisabled ? (
        sitData.selected_questions.map((q, i) => {
          const value = sitData.attempt?.answers[String(q.id)];
          return <QuestionControl key={q.question} q={q} n={i} rhf={{ value, disabled: true }} />;
        })
      ) : (
        <>
          <form onSubmit={handleSubmit(handleSubmitConfirm)}>
            {sitData.selected_questions.map((q, i) => (
              <Controller
                key={q.id}
                name={String(q.id)}
                control={control}
                render={({ field, fieldState: { error } }) => <QuestionControl q={q} n={i} rhf={{ ...field }} err={error} />}
              />
            ))}
            <Box ref={submitBoxRef} sx={{ bottom: '.5em', mt: 5, mb: 7 /* sticky */ }}>
              <Button
                disabled={!formState.isValid || formState.isSubmitting}
                size="large"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ position: 'relative', overflow: 'hidden' }}
              >
                {t('Submit Exam Paper')}
                <Box sx={{ display: 'flex', position: 'absolute', width: '100%', bottom: 0 }} component="span">
                  {sitData.selected_questions.map((q) => (
                    <Box
                      ref={(el) => (indicatorRefs.current[String(q.id)] = el as HTMLElement)}
                      key={q.id}
                      component="span"
                      sx={{ height: '.5em', flexGrow: 1 }}
                    />
                  ))}
                </Box>
              </Button>
            </Box>
          </form>
          <StopWatch sitData={sitData} getValues={getValues} />
          <Dialog open={submitDialogOpen}>
            <DialogTitle>{t('Submit Exam Paper')}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t('Would you like to submit your answers? Once submitted, the exam will end and grading will begin.')}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button sx={{ px: 2 }} onClick={handleCancel}>
                {t('Cancel')}
              </Button>
              <Button sx={{ px: 2 }} onClick={handleSitPaperSubmit} autoFocus>
                {t('Submit')}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <Fab
        ref={scrollToTopRef}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        size="medium"
        color="secondary"
        sx={{ display: 'none', position: 'sticky', bottom: '5em', left: 0, float: 'right' }}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Box>
  );
};

export default SitPaper;

const AttemptConfirm = ({ sitData }: { sitData: SitDetailType }) => {
  const { t } = useTranslation('exam');
  const [open, setOpen] = useState(true);
  const [sitStep, setSitStep] = useAtom(sitStepState(Number(sitData.id)));
  const setAlert = useSetAtom(alertState);

  const handleGoBack = () => {
    setOpen(false);
    setSitStep(sitStep - 1);
  };

  const handleStartExam = () => {
    // create attempt
    ExamService.examAttemptCreate({
      requestBody: {
        sit: sitData.id,
      },
    })
      .then(async () => {
        // refetch sit data with attempt
        await mutate(`${sitEndpoint}/${sitData.id}`);
      })
      .catch(() => {
        setSitStep(sitStep - 1);
        setAlert({
          open: true,
          severity: 'error',
          message: t('Unknown error occurred. Please try again.'),
        });
      })
      .finally(() => setOpen(false));
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{t('Examining')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(
            'Would you like to start the exam? Once you start the exam, ' +
              'time will start counting down, and you will not be able to pause or cancel. ' +
              'Pressing the back button will cancel.',
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ px: 2 }} onClick={handleGoBack}>
          {t('Go back')}
        </Button>
        <Button sx={{ px: 2 }} onClick={handleStartExam} autoFocus>
          {t('Start Exam')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
