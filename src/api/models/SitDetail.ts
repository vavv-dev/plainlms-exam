/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExamDetail } from './ExamDetail';
import type { QuestionDetail } from './QuestionDetail';
import type { User } from './User';
export type SitDetail = {
  readonly id: number;
  readonly link: string | null;
  user: User;
  exam: ExamDetail;
  selected_questions: Array<QuestionDetail>;
  readonly created: string;
  readonly modified: string;
  attempt_allow?: number;
};

