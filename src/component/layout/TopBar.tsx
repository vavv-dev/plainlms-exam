import { LoginButton } from '@/component/account/account';
import Menu from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import imgUrl from './assets/logo.svg';
import { navState, stopWatchContainerState } from './layout';

export default function TopBar() {
  const [navOpen, setNavOpen] = useAtom(navState);
  const setStopWatchContainer = useSetAtom(stopWatchContainerState);
  const stopWatchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stopWatchContainerRef.current) {
      setStopWatchContainer(stopWatchContainerRef);
    }
  }, [stopWatchContainerRef]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0} color="default" sx={{ backgroundColor: 'background.paper' }}>
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
          <Box component={Link} to="/" sx={{ display: 'flex', textDecoration: 'None', color: 'inherit' }}>
            <Box component="img" src={imgUrl} alt="logo" sx={{ height: 25 }} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Search /> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box ref={stopWatchContainerRef} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LoginButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
