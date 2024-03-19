import { FormatEnum, SitDetail as SitDetailType } from '@/api';
import { formatDuration } from '@/helper/util';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

const SitTitle = ({ sitData }: { sitData: SitDetailType }) => {
  const { t } = useTranslation('exam');
  const theme = useTheme();

  const exam = sitData.exam;
  const selectionData = exam.selection_option_data;
  const selections = Object.values(FormatEnum)
    .map((v) => {
      const count = selectionData[v];
      return count ? `${t(v)} ${count}` : null;
    })
    .filter((v) => v)
    .join(', ');

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'flex-start', md: 'center' },
        backgroundColor: theme.palette.action.selected,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
        {sitData.exam.name}
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />}
        spacing={{ xs: 0, md: 2 }}
        sx={{ color: 'text.secondary' }}
      >
        <Typography variant="body1">{`${t('Questions')} ${selections}`}</Typography>
        <Typography variant="body1">{`${t('Exam Duration')} ${formatDuration(exam.time_limit_seconds || 0)}`}</Typography>
        <Typography variant="body1">{`${t('Passing Score')} ${exam.cutoff} %`}</Typography>
        {sitData.due && (
          <Typography
            variant="body1"
            {...(new Date(sitData.due) < new Date() && {
              fontWeight: 'bold',
              color: 'error.main',
            })}
          >{`${t('Due')} ${new Date(sitData.due).toLocaleString()}`}</Typography>
        )}
        <Typography variant="body1">{`${t('Exam Taker')} ${sitData.user.name}(${sitData.user.username})`}</Typography>
      </Stack>
    </Box>
  );
};

export default SitTitle;
