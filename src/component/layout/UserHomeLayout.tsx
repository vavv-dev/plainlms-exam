import { routeMatches, userHomePath } from '@/App';
import { User, AccountService } from '@/api';
import { formatRelativeTime } from '@/helper/util';
import { Avatar, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';

const UserPageLayout = () => {
  const { t } = useTranslation('layout');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams() as { username: string };

  const { data: user, isLoading } = useSWRImmutable<User>(`user:${username}`, async () => {
    return await AccountService.accountUserRetrieve({ username });
  });

  // find tabs from routes dynamically
  const tabs = routeMatches(`/${userHomePath}/`).map(({ pathname, title, Icon }) => ({
    pathname: pathname.replace(userHomePath, username),
    title,
    Icon,
  }));

  // active tab index
  const tabIndex = tabs.findIndex(({ pathname: tabPathname }) => pathname === tabPathname);

  if (!user) {
    // TODO redirect to 404
    return null;
  }

  if (isLoading) {
    // TODO skeleton
    return null;
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}
        margin="auto"
      >
        <Avatar
          alt={user.name}
          src={user.thumbnail as string}
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Stack spacing={1}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="caption">
            @{user.username}
            {user.date_joined && ` • ${formatRelativeTime(new Date(user.date_joined), t)}`}
          </Typography>
          <Typography variant="body2">{user.description}</Typography>
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ maxWidth: '100%', p: 3 }}>
          <Tabs
            value={tabIndex}
            role="navigation"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {tabs.map(({ pathname: tabPathname, title, Icon }) => (
              <Tab
                key={tabPathname}
                label={t(title)}
                iconPosition="start"
                onClick={() => navigate(tabPathname)}
                sx={{ minHeight: 'inherit', cursor: 'pointer' }}
                {...(Icon ? { icon: <Icon /> } : undefined)}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default UserPageLayout;
