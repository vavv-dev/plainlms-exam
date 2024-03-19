import { parseLocalStorage } from '@/helper/util';
import { atomWithStorage } from 'jotai/utils';
import BaseLayout from './BaseLayout';
import UserHomeLayout from './UserHomeLayout';
import { atom } from 'jotai';
import { User } from '@/api';

/**
 *
 * page component
 *
 */
export { BaseLayout, UserHomeLayout };

/**
 *
 * store
 *
 */
const _navOpen = parseLocalStorage('navOpen', false);
export const navState = atomWithStorage<boolean>('navOpen', _navOpen);

interface IAlert {
  open: boolean;
  message: string;
  severity: 'info' | 'success' | 'warning' | 'error';
}
export const alertState = atom<IAlert>({
  open: false,
  message: 'Sucess whatever...',
  severity: 'success',
});

// not authenticated user but home user you are looking at
export const homeUserState = atom<User | null>(null);

// portal
export const stopWatchContainerState = atom<React.RefObject<HTMLDivElement> | null>(null);
