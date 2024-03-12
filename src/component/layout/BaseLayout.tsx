import { Alert, Box, Toolbar as Spacer } from '@mui/material';
import { useAtom } from 'jotai';
import { Outlet } from 'react-router-dom';
import NavDrawer from './NavDrawer';
import TopBar from './TopBar';
import { alertState } from './layout';

const BaseLayout = () => {
  const [alert, setAert] = useAtom(alertState);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <TopBar />
        <Spacer />
        <Box display="flex">
          <NavDrawer />
          <Box sx={{ width: '100%', display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
            {alert.open && (
              <Alert
                severity={alert.severity}
                sx={{ borderRadius: 0, justifyContent: 'center' }}
                onClose={() => setAert({ ...alert, open: false })}
              >
                {alert.message}
              </Alert>
            )}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BaseLayout;
