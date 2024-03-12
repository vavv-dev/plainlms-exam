/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormatEnum } from './FormatEnum';
export type PatchedQuestionDetail = {
  readonly id?: number;
  readonly link?: string | null;
  readonly created?: string;
  readonly modified?: string;
  format?: FormatEnum;
  question?: string;
  description?: string | null;
  choices?: Array<string> | null;
  correct_choices?: Array<number> | null;
  correct_criteria?: string | null;
  explanation?: string | null;
  lesson_reference?: string | null;
  knowledge_reference?: string | null;
  grading_info?: string | null;
  weight?: number;
};

