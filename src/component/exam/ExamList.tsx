import { ExamDetail, ExamService, PaginatedExamDetailList } from '@/api';
import { userState } from '@/component/account/account';
import { alertState } from '@/component/layout/layout';
import { formatDuration, formatRelativeTime } from '@/helper/util';
import CheckIcon from '@mui/icons-material/Check';
import { Pagination, PaginationItem, Snackbar, TableHead, ToggleButton, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { examEndpoint } from './exam';
import { reverse } from '@/App';

/**
 *
 * ExamList
 *
 */

const ExamList = () => {
  const { t } = useTranslation('exam');
  const navigate = useNavigate();

  const user = useAtomValue(userState);
  const setAlert = useSetAtom(alertState);
  const [sits, setSits] = useState<Record<number, number | undefined>>({});
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');

  // pagination
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  // fetch data
  const { data, mutate } = useSWRImmutable<PaginatedExamDetailList>(`${examEndpoint}?${page}`, async () => {
    return await ExamService.examExamList({ page });
  });

  const handleSitEnroll = async (rowId: number, sitId: number | undefined) => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    let promise;
    if (!sitId) {
      promise = ExamService.examSitCreate({
        requestBody: {
          username: user.username,
          exam_id: rowId,
        },
      });
    } else {
      promise = ExamService.examSitDestroy({ id: sitId });
    }

    promise
      .then((data) => {
        setSits({ ...sits, [rowId]: data ? data.id : undefined });
        setSnackBarMessage(data ? t('Enrolled to exam') : t('Unenrolled from exam'));
        mutate();
      })
      .catch(() => {
        setAlert({
          open: true,
          message: t('Unknown error occurred. Please try again.'),
          severity: 'error',
        });
      });
  };

  if (!data) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: 'center', width: '100%', maxWidth: 'lg', mx: 'auto', mb: 3, position: 'relative' }}
      >
        {t('Exam List')}
        {user && (
          <Typography
            onClick={() => navigate(reverse('sit', { username: user.username }))}
            variant="body1"
            sx={{ position: 'absolute', right: '.5em', bottom: '2px', cursor: 'pointer', color: 'primary.main' }}
          >
            {t('My exam list')}
          </Typography>
        )}
      </Typography>
      <Paper sx={{ width: '100%', maxWidth: 'lg', mx: 'auto', mb: 3 }}>
        <TableContainer>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell>{t('Exam title')}</TableCell>
                <TableCell align="right">{t('Question')}</TableCell>
                <TableCell align="right">{t('Exam Duration')}</TableCell>
                <TableCell align="center">{t('Created date')}</TableCell>
                <TableCell align="center">{t('Sit Enroll')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results &&
                data.results.map((row: ExamDetail, i: number) => (
                  <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                    <TableCell align="center">{(data.count as number) - (page - 1) * (data.page_size as number) - i}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">
                      {Object.entries(row.selection_option_data)
                        .filter(([, value]) => value)
                        .map(([key, value]) => `${t(key)}: ${value}`)
                        .join(', ')}
                    </TableCell>
                    <TableCell align="right">{formatDuration(row.time_limit_seconds as number)}</TableCell>
                    <TableCell align="center">{formatRelativeTime(row.created, t)}</TableCell>
                    <TableCell align="center">
                      <ToggleButton
                        size="small"
                        value={row.id}
                        sx={{
                          border: 0,
                          borderRadius: '50%',
                        }}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSitEnroll(row.id, row.request_user_sit_id);
                        }}
                        selected={!!row.request_user_sit_id}
                      >
                        <CheckIcon sx={{ color: row.request_user_sit_id ? 'success.light' : 'text.disabled' }} />
                      </ToggleButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          page={page}
          count={data.page_count}
          renderItem={(item) => (
            <PaginationItem component={Link} to={`${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
          )}
          sx={{ p: 1.5, display: 'flex', justifyContent: 'center' }}
        />
      </Paper>
      <Snackbar
        open={!!snackBarMessage}
        autoHideDuration={5000}
        onClose={() => setSnackBarMessage('')}
        message={snackBarMessage}
      />
    </Box>
  );
};

export default ExamList;
