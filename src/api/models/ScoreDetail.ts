/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ScoreDetail = {
  readonly id: number;
  readonly link: string | null;
  readonly created: string;
  readonly modified: string;
  grading?: any;
  calculated_score?: number;
  overwrited_score?: number | null;
  is_copied?: boolean;
  feedback?: string | null;
  sit: number;
  graded_by: number;
};

