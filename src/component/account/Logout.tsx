import { loginPath, reverse } from '@/App';
import { TokenService } from '@/api';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenExpState, processingState, userState } from './account';

const Logout = () => {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userState);
  const setProcessing = useSetAtom(processingState);
  const setTokenExp = useSetAtom(tokenExpState);

  useEffect(() => {
    const login = reverse(loginPath);
    if (!user) navigate(login);

    // set loading state
    setProcessing(true);

    const handleLogout = () => {
      TokenService.tokenDestroy()
        .then(() => {
          setUser(null);
          setTokenExp(0);
          navigate(login);
        })
        .finally(() => setProcessing(false));
    };

    const timeoutId = setTimeout(handleLogout, 100);

    // Cleanup function
    return () => clearTimeout(timeoutId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <></>;
};

export default Logout;
