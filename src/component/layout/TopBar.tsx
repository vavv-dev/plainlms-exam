import Menu from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import imgUrl from './assets/logo.svg';
import { navState } from './layout';

export default function TopBar() {
  const [navOpen, setNavOpen] = useAtom(navState);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        color="default"
        sx={{ backgroundColor: 'background.paper' }}
      >
        <Toolbar>
          <IconButton
            onClick={() => setNavOpen(!navOpen)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', textDecoration: 'None', color: 'inherit' }}
          >
            <Box component="img" src={imgUrl} alt="logo" sx={{ height: 25 }} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Search /> */}
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LoginButton   />

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
