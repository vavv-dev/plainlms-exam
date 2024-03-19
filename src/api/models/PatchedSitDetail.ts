/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttemptDetail } from './AttemptDetail';
import type { ExamDetail } from './ExamDetail';
import type { QuestionDetail } from './QuestionDetail';
import type { User } from './User';
export type PatchedSitDetail = {
  readonly id?: number;
  readonly link?: string | null;
  readonly user?: User;
  readonly exam?: ExamDetail;
  readonly selected_questions?: Array<QuestionDetail>;
  readonly attempt?: AttemptDetail;
  username?: string;
  exam_id?: number;
  readonly created?: string;
  readonly modified?: string;
  due?: string;
  consent?: string | null;
  verification?: string | null;
};

