import { reverse, SitPath } from '@/App';
import { ExamService, PaginatedSitList, Sit } from '@/api';
import { homeUserState } from '@/component/layout/layout';
import { formatRelativeTime } from '@/helper/util';
import { Pagination, PaginationItem, TableHead } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { sitEndpoint } from './exam';

/**
 *
 * UserSit
 *
 */

const UserSit = () => {
  const { t } = useTranslation('exam');
  const navigate = useNavigate();

  const homeUser = useAtomValue(homeUserState);
  const username = homeUser?.username;

  // Params will replace in the list loop
  const detailPath = reverse(SitPath);

  // pagination
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  // fetch data
  const { data } = useSWRImmutable<PaginatedSitList>(`${sitEndpoint}?${username}:${page}`, async () => {
    return await ExamService.examSitList({ page, userUsername: username });
  });

  if (!data) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ width: '100%', maxWidth: 'lg', mx: 'auto' }}>
        <TableContainer>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell>{t('Exam title')}</TableCell>
                <TableCell align="center">{t('Question count')}</TableCell>
                <TableCell align="center">{t('Registered')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results &&
                data.results.map((row: Sit, i: number) => (
                  <TableRow
                    onClick={() => {
                      navigate(detailPath.replace(':sitId', row.id.toString()));
                    }}
                    key={row.id}
                    sx={{ '&:hover': { backgroundColor: 'action.hover', cursor: 'pointer' } }}
                  >
                    <TableCell align="center">{(data.count as number) - (page - 1) * (data.page_size as number) - i}</TableCell>
                    <TableCell>{row.exam}</TableCell>
                    <TableCell align="center">{row.selected_questions}</TableCell>
                    <TableCell align="center">{formatRelativeTime(row.created, t)}</TableCell>
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
    </Box>
  );
};

export default UserSit;
