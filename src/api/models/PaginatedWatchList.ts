/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Watch } from './Watch';
export type PaginatedWatchList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<Watch>;
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

