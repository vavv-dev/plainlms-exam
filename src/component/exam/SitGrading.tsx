import { QuestionDetail, SitDetail as SitDetailType } from '@/api';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Divider, Fab, Stack, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import QuestionControl from './QuestionHelper';
import { useEffect, useRef } from 'react';

const SitGrading = ({ sitData }: { sitData: SitDetailType }) => {
  const scrollToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollToTopRef.current) {
        scrollToTopRef.current.style.display = window.scrollY > window.innerHeight ? 'block' : 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollToTopRef]);

  // hide sit paper to unattempted user
  if (!sitData.attempt) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', mx: 'auto !important', position: 'relative' }}>
      <GradeResult sitData={sitData} />
      {sitData.selected_questions.map((q, i) => {
        const value = sitData.attempt?.answers[String(q.id)];
        return (
          <QuestionControl key={q.question} q={q} n={i} rhf={{ value, disabled: true }} grading={true}>
            <Grade sitData={sitData} q={q} />
          </QuestionControl>
        );
      })}
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

export default SitGrading;

const Grade = ({ sitData, q }: { sitData: SitDetailType; q: QuestionDetail }) => {
  const { t } = useTranslation('exam');
  const earned = sitData.attempt.score?.grading?.[String(q.id)];
  const submitted = sitData.attempt.finish;

  return (
    <Typography
      variant="body1"
      component="span"
      sx={{
        fontWeight: 600,
        color: earned ? 'primary.dark' : 'error.main',
        display: 'flex',
        alignItems: 'center',
        gap: '.5em',
      }}
    >
      {earned == null ? (
        submitted ? (
          <QuestionMarkIcon />
        ) : (
          <CloseIcon />
        )
      ) : earned == 0 ? (
        <CloseIcon />
      ) : earned == q.weight ? (
        <RadioButtonUncheckedIcon />
      ) : (
        <ChangeHistoryIcon />
      )}

      {earned == null
        ? submitted
          ? t('Grading in progress')
          : t('Not submitted')
        : t('{{ earned }} / {{ possible }} score(s)', { earned: earned, possible: q.weight })}
    </Typography>
  );
};

const GradeResult = ({ sitData }: { sitData: SitDetailType }) => {
  const { t } = useTranslation('exam');
  const score = sitData.attempt?.score;
  const theme = useTheme();

  if (!score) return null;

  const percentage = ((score.earned_score || 0) / (score.possible_score || 1)) * 100;
  const isPassed = percentage >= (sitData.exam.cutoff || 0);

  return score.completed ? (
    <Box sx={{ p: 3, mb: 2, backgroundColor: theme.palette.action.selected }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {t('Exam Result')}
        {sitData.attempt.finish && (
          <Typography component="span" variant="subtitle1" sx={{ ml: 2 }}>
            {new Date(sitData.attempt.finish).toLocaleString()}
          </Typography>
        )}
      </Typography>
      <Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Typography variant="subtitle1">
          {t('Score: {{ earned }} / {{ possible }}', { earned: score.earned_score, possible: score.possible_score })}
        </Typography>
        <Typography variant="subtitle1">
          {t('Plagiarism check: ')} {score.is_copied ? t('Detected') : t('Not Detected')}
        </Typography>
        <Typography variant="subtitle1">
          {t('Percentage Score {{ percentage }} %', {
            percentage: percentage.toFixed(2),
          })}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isPassed ? 'success.main' : 'error.main' }}>
          {isPassed ? t('passed!') : t('failed')}
        </Typography>
      </Stack>
      {score.feedback && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
            {t('Feedback')}
          </Typography>
          <Typography variant="body1">{score.feedback}</Typography>
        </>
      )}
    </Box>
  ) : (
    <Typography variant="h5" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
      {t('Grading is in progress.')}
      <Typography component="span" variant="subtitle1" sx={{ display: 'block' }}>
        {t('After grading is completed, the result and feedback will be displayed here.')}
      </Typography>
    </Typography>
  );
};
