import { routeMatches, userHomePath } from '@/App';
import { AccountService, User } from '@/api';
import { formatRelativeTime } from '@/helper/util';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, IconButton, Input, InputLabel, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { userState } from '../account/account';
import { homeUserState } from './layout';

const UserHomeLayout = () => {
  const { t } = useTranslation('layout');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams() as { username: string };

  // authenticated user
  const [authenticatedUser, setAuthenticatedUser] = useAtom(userState);
  const [homeUser, setHomeUser] = useAtom(homeUserState);

  const { data: user } = useSWRImmutable<User>(`user:${username}`, async () => {
    return await AccountService.accountUserRetrieve({ username });
  });

  useEffect(() => {
    if (user) setHomeUser(user);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // find all tabs from routes dynamically
  const tabs = routeMatches(`/${userHomePath}/`).map(({ pathname, title, Icon }) => ({
    pathname: pathname.replace(userHomePath, username),
    title,
    Icon,
  }));

  // current tab
  const tabIndex = tabs.findIndex(({ pathname: tabPathname }) => pathname === encodeURI(tabPathname));

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    AccountService.accountUserUploadThumbnailPartialUpdate({
      username,
      formData: { thumbnail: file },
    }).then((user) => {
      setHomeUser(user);
      setAuthenticatedUser(user);
    });
  };

  if (!homeUser) return null;

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Box sx={{ display: 'flex', maxWidth: 'sm', width: '100%' }}>
          {authenticatedUser?.username !== homeUser?.username ? (
            <Avatar alt={homeUser?.name} src={homeUser?.thumbnail as string} sx={{ width: 80, height: 80 }} />
          ) : (
            <InputLabel htmlFor="avatar-file" sx={{ position: 'relative' }}>
              <Input
                onChange={handleAvatarChange}
                inputProps={{ accept: 'image/*' }}
                id="avatar-file"
                type="file"
                sx={{ display: 'none' }}
              />
              <IconButton component="span" sx={{ p: 0 }}>
                <Avatar alt={homeUser?.name} src={homeUser?.thumbnail as string} sx={{ width: 80, height: 80 }} />
              </IconButton>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  lineHeight: 1,
                  cursor: 'pointer',
                }}
              >
                <EditIcon />
              </Box>
            </InputLabel>
          )}
          <Stack sx={{ ml: 2 }}>
            <Typography variant="h5">{homeUser?.name}</Typography>
            <Typography variant="caption">
              @{homeUser?.username}
              {homeUser?.date_joined && ` • ${formatRelativeTime(new Date(homeUser.date_joined), t)}`}
            </Typography>
            <Typography variant="body2">{homeUser?.description}</Typography>
          </Stack>
        </Box>
        <Box sx={{ maxWidth: '100%', mt: 2 }}>
          <Tabs value={tabIndex} role="navigation" variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
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

export default UserHomeLayout;
