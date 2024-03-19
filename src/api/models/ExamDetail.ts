/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ExamDetail = {
  readonly id: number;
  readonly link: string | null;
  readonly request_user_sit_id: number;
  readonly created: string;
  readonly modified: string;
  name: string;
  description?: string | null;
  selection_option_data?: any;
  time_limit_seconds?: number | null;
  cutoff?: number | null;
  verification_required?: boolean;
  is_public?: boolean;
  pool: number;
};

