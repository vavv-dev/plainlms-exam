import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import Sit from './Sit';
import UserSit from './UserSit';
import ExamList from './ExamList';

/**
 *
 * page comonent
 *
 */
export { Sit, UserSit, ExamList };

/**
 *
 * store
 *
 */

export const sitStepState = atomFamily(() => atom<number>(-1));
export const sitDataStepState = atomFamily(() => atom<number>(-1));
export const sitDisabledState = atomFamily(() => atom<boolean>(false));

/**
 *
 * constants
 *
 */
export const sitEndpoint = "/exam/sit"
export const examEndpoint = "/exam/exam"
