/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScoreDetail } from './ScoreDetail';
export type PaginatedScoreDetailList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<ScoreDetail>;
  /**
   * Current page number
   */
  page?: number;
  /**
   * Total number of items available
   */
  page_count?: number;
  /**
   * Number of items to return per page
   */
  page_size?: number;
};

