/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { History } from '../models/History';
import type { PaginatedHistoryList } from '../models/PaginatedHistoryList';
import type { PaginatedWatchList } from '../models/PaginatedWatchList';
import type { PatchedHistory } from '../models/PatchedHistory';
import type { PatchedWatch } from '../models/PatchedWatch';
import type { Watch } from '../models/Watch';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TrackingService {
  /**
   * API endpoint that allows history to be viewed or edited.
   * @returns PaginatedHistoryList
   * @throws ApiError
   */
  public static trackingHistoryList({
    page,
    pageSize,
  }: {
    /**
     * A page number within the paginated result set.
     */
    page?: number,
    /**
     * Number of results to return per page.
     */
    pageSize?: number,
  }): CancelablePromise<PaginatedHistoryList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/tracking/history/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * API endpoint that allows history to be viewed or edited.
   * @returns History
   * @throws ApiError
   */
  public static trackingHistoryCreate({
    requestBody,
  }: {
    requestBody: History,
  }): CancelablePromise<History> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/tracking/history/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * API endpoint that allows history to be viewed or edited.
   * @returns History
   * @throws ApiError
   */
  public static trackingHistoryRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this history.
     */
    id: number,
  }): CancelablePromise<History> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/tracking/history/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * API endpoint that allows history to be viewed or edited.
   * @returns History
   * @throws ApiError
   */
  public static trackingHistoryUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this history.
     */
    id: number,
    requestBody: History,
  }): CancelablePromise<History> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/tracking/history/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * API endpoint that allows history to be viewed or edited.
   * @returns History
   * @throws ApiError
   */
  public static trackingHistoryPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this history.
     */
    id: number,
    requestBody?: PatchedHistory,
  }): CancelablePromise<History> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/tracking/history/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * API endpoint that allows history to be viewed or edited.
   * @returns void
   * @throws ApiError
   */
  public static trackingHistoryDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this history.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/tracking/history/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * API endpoint that allows watches to be viewed or edited.
   * @returns PaginatedWatchList
   * @throws ApiError
   */
  public static trackingWatchList({
    page,
    pageSize,
  }: {
    /**
     * A page number within the paginated result set.
     */
    page?: number,
    /**
     * Number of results to return per page.
     */
    pageSize?: number,
  }): CancelablePromise<PaginatedWatchList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/tracking/watch/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * API endpoint that allows watches to be viewed or edited.
   * @returns Watch
   * @throws ApiError
   */
  public static trackingWatchCreate({
    requestBody,
  }: {
    requestBody: Watch,
  }): CancelablePromise<Watch> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/tracking/watch/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * API endpoint that allows watches to be viewed or edited.
   * @returns Watch
   * @throws ApiError
   */
  public static trackingWatchRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this watch.
     */
    id: number,
  }): CancelablePromise<Watch> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/tracking/watch/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * API endpoint that allows watches to be viewed or edited.
   * @returns Watch
   * @throws ApiError
   */
  public static trackingWatchUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this watch.
     */
    id: number,
    requestBody: Watch,
  }): CancelablePromise<Watch> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/tracking/watch/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * API endpoint that allows watches to be viewed or edited.
   * @returns Watch
   * @throws ApiError
   */
  public static trackingWatchPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this watch.
     */
    id: number,
    requestBody?: PatchedWatch,
  }): CancelablePromise<Watch> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/tracking/watch/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * API endpoint that allows watches to be viewed or edited.
   * @returns void
   * @throws ApiError
   */
  public static trackingWatchDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this watch.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/tracking/watch/{id}/',
      path: {
        'id': id,
      },
    });
  }
}
