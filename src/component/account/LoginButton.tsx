import { routeMatches } from '@/App';
import { IconButton, ListItemButton, ListItemText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { loginPath, logoutPath, profilePath } from '@/App';
import { accountProcessingState, userState } from './account';

export default function LoginButton() {
  const { t } = useTranslation('layout');
  const user = useAtomValue(userState);
  const processing = useAtomValue(accountProcessingState);

  // get from route table
  const dropdowItems = [...routeMatches(profilePath), ...routeMatches(logoutPath)];

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  if (processing) {
    return <CircularProgress sx={{ height: '32px !important', width: '32px !important' }} />;
  }

  return (
    <>
      {!user ? (
        <Button component={Link} to={loginPath}>
          {t('Login')}
        </Button>
      ) : (
        <>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={user.thumbnail as string} sx={{ width: 32, height: 32 }}>
              {user?.name ? user.name[0] : 'M'}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={() => setAnchorEl(null)}
            onClick={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {dropdowItems.map(({ pathname, title, Icon }) => (
              <ListItemButton key={pathname} component={Link} to={pathname.replace(':username', user.username)}>
                {Icon && <Icon sx={{ minWidth: 0, mr: 3, justifyContent: 'center', width: 24, height: 24 }} />}
                <ListItemText primary={t(title)} />
              </ListItemButton>
            ))}
          </Menu>
        </>
      )}
    </>
  );
}
