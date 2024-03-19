import { User } from '@/api';
import { parseLocalStorage } from '@/helper/util';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Login from './Login';
import Logout from './Logout';
import Join from './Join';
import Password from './Password';
import Terms from './Terms';
import Privacy from './Privacy';
import Profile from './Profile';
import LoginButton from './LoginButton';

/**
 *
 * page component
 *
 */
export { Login, LoginButton, Logout, Join, Password, Terms, Privacy, Profile };

/**
 *
 *  store
 *
 */

export const userState = atomWithStorage<User | null>('user', parseLocalStorage('user', null));
export const accountProcessingState = atom<boolean>(false);
export const tokenExpState = atomWithStorage<number>('tokenExp', parseLocalStorage('tokenExp', 0));
