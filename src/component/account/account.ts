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

/**
 *
 * page component
 *
 */
export { Login, Logout, Join, Password, Terms, Privacy };

/**
 *
 *  store
 *
 */

// prettier-ignore
export const userState = atomWithStorage<User | null>( 'user', parseLocalStorage('user', null),);
export const processingState = atom<boolean>(false);
export const tokenExpState = atomWithStorage<number>('tokenExp', parseLocalStorage('tokenExp', 0));
