import { reverse } from '@/App';
import { userState } from '@/component/account/account';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import CameraOutdoorOutlined from '@mui/icons-material/CameraOutdoorOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { Toolbar as Spacer, useMediaQuery } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, Theme, styled } from '@mui/material/styles';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { navState } from './layout';

const drawerWidth = 200;

export default function NavDrawer() {
  const { t } = useTranslation('layout');
  const navigate = useNavigate();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const user = useAtomValue(userState);

  const [navOpen, setNavOpen] = useAtom(navState);

  // drawer menu items
  const menuItems = [
    ['home', CameraOutdoorOutlined, '/'],
    [],
    ['exam', FactCheckOutlinedIcon, reverse('examlist')],
    [],
    ['me', AssignmentIndOutlinedIcon, reverse('sit', { username: user?.username as string })],
  ];

  useEffect(() => {
    if (matches) {
      setNavOpen(false);
    }
  }, [matches]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.appBar - 2 }}
        open={matches && (navOpen || false)}
        onClick={() => setNavOpen(false)}
      />
      <Drawer variant="permanent" open={navOpen} sx={{ position: { xs: 'absolute', lg: 'relative' } }}>
        <Spacer />
        <List>
          {menuItems.map(([key, Icon, path], i) =>
            key ? (
              <ListItem
                key={i}
                disablePadding
                sx={{ display: 'block', color: 'inherit !important' }}
                onClick={() => navigate((path as string) || '/')}
              >
                <ListItemButton sx={{ minHeight: 48, px: 3 }}>
                  <Icon
                    sx={{
                      minWidth: 0,
                      mr: navOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  />
                  <ListItemText
                    primary={t(key as string)}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '.9rem',
                      },
                      opacity: navOpen ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <Divider key={i} />
            ),
          )}
        </List>
      </Drawer>
    </>
  );
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('lg')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  // '>' required not to override the .MuiDrawer-paper accidentally
  '& > .MuiDrawer-paper': {
    zIndex: theme.zIndex.appBar - 1,
    border: 'none',
  },
}));
