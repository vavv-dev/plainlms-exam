import { parseLocalStorage } from '@/helper/util';
import { atomWithStorage } from 'jotai/utils';
import BaseLayout from './BaseLayout';
import UserHomeLayout from './UserHomeLayout';
import { atom } from 'jotai';

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
