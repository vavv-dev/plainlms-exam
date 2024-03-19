/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScoreDetail } from './ScoreDetail';
export type PatchedAttemptDetail = {
  readonly id?: number;
  readonly link?: string | null;
  readonly score?: ScoreDetail;
  answers?: any;
  start?: string | null;
  finish?: string | null;
  server_start?: string | null;
  server_finish?: string | null;
  sit?: number;
};

