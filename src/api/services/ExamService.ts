/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttemptDetail } from '../models/AttemptDetail';
import type { ExamDetail } from '../models/ExamDetail';
import type { GraderDetail } from '../models/GraderDetail';
import type { PaginatedAttemptDetailList } from '../models/PaginatedAttemptDetailList';
import type { PaginatedExamDetailList } from '../models/PaginatedExamDetailList';
import type { PaginatedGraderDetailList } from '../models/PaginatedGraderDetailList';
import type { PaginatedPoolDetailList } from '../models/PaginatedPoolDetailList';
import type { PaginatedQuestionDetailList } from '../models/PaginatedQuestionDetailList';
import type { PaginatedScoreDetailList } from '../models/PaginatedScoreDetailList';
import type { PaginatedSitList } from '../models/PaginatedSitList';
import type { PatchedAttemptDetail } from '../models/PatchedAttemptDetail';
import type { PatchedExamDetail } from '../models/PatchedExamDetail';
import type { PatchedGraderDetail } from '../models/PatchedGraderDetail';
import type { PatchedPoolDetail } from '../models/PatchedPoolDetail';
import type { PatchedQuestionDetail } from '../models/PatchedQuestionDetail';
import type { PatchedScoreDetail } from '../models/PatchedScoreDetail';
import type { PatchedSitDetail } from '../models/PatchedSitDetail';
import type { PoolDetail } from '../models/PoolDetail';
import type { QuestionDetail } from '../models/QuestionDetail';
import type { ScoreDetail } from '../models/ScoreDetail';
import type { SitDetail } from '../models/SitDetail';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExamService {
  /**
   * A viewset for viewing and editing attempt instances.
   * @returns PaginatedAttemptDetailList
   * @throws ApiError
   */
  public static examAttemptList({
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
  }): CancelablePromise<PaginatedAttemptDetailList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/attempt/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing attempt instances.
   * @returns AttemptDetail
   * @throws ApiError
   */
  public static examAttemptCreate({
    requestBody,
  }: {
    requestBody: AttemptDetail,
  }): CancelablePromise<AttemptDetail> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/exam/attempt/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing attempt instances.
   * @returns AttemptDetail
   * @throws ApiError
   */
  public static examAttemptRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this attempt.
     */
    id: number,
  }): CancelablePromise<AttemptDetail> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/attempt/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing attempt instances.
   * @returns AttemptDetail
   * @throws ApiError
   */
  public static examAttemptUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this attempt.
     */
    id: number,
    requestBody: AttemptDetail,
  }): CancelablePromise<AttemptDetail> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/exam/attempt/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing attempt instances.
   * @returns AttemptDetail
   * @throws ApiError
   */
  public static examAttemptPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this attempt.
     */
    id: number,
    requestBody?: PatchedAttemptDetail,
  }): CancelablePromise<AttemptDetail> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/exam/attempt/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing attempt instances.
   * @returns void
   * @throws ApiError
   */
  public static examAttemptDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this attempt.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/exam/attempt/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing attempt instances.
   * @returns AttemptDetail
   * @throws ApiError
   */
  public static examAttemptFinishPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this attempt.
     */
    id: number,
    requestBody?: PatchedAttemptDetail,
  }): CancelablePromise<AttemptDetail> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/exam/attempt/{id}/finish/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing exam instances.
   * @returns PaginatedExamDetailList
   * @throws ApiError
   */
  public static examExamList({
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
  }): CancelablePromise<PaginatedExamDetailList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/exam/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing exam instances.
   * @returns ExamDetail
   * @throws ApiError
   */
  public static examExamCreate({
    requestBody,
  }: {
    requestBody: ExamDetail,
  }): CancelablePromise<ExamDetail> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/exam/exam/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing exam instances.
   * @returns ExamDetail
   * @throws ApiError
   */
  public static examExamRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this exam.
     */
    id: number,
  }): CancelablePromise<ExamDetail> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/exam/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing exam instances.
   * @returns ExamDetail
   * @throws ApiError
   */
  public static examExamUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this exam.
     */
    id: number,
    requestBody: ExamDetail,
  }): CancelablePromise<ExamDetail> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/exam/exam/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing exam instances.
   * @returns ExamDetail
   * @throws ApiError
   */
  public static examExamPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this exam.
     */
    id: number,
    requestBody?: PatchedExamDetail,
  }): CancelablePromise<ExamDetail> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/exam/exam/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing exam instances.
   * @returns void
   * @throws ApiError
   */
  public static examExamDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this exam.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/exam/exam/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing grader instances.
   * @returns PaginatedGraderDetailList
   * @throws ApiError
   */
  public static examGraderList({
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
  }): CancelablePromise<PaginatedGraderDetailList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/grader/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing grader instances.
   * @returns GraderDetail
   * @throws ApiError
   */
  public static examGraderCreate({
    requestBody,
  }: {
    requestBody: GraderDetail,
  }): CancelablePromise<GraderDetail> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/exam/grader/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing grader instances.
   * @returns GraderDetail
   * @throws ApiError
   */
  public static examGraderRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this grader.
     */
    id: number,
  }): CancelablePromise<GraderDetail> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/grader/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing grader instances.
   * @returns GraderDetail
   * @throws ApiError
   */
  public static examGraderUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this grader.
     */
    id: number,
    requestBody: GraderDetail,
  }): CancelablePromise<GraderDetail> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/exam/grader/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing grader instances.
   * @returns GraderDetail
   * @throws ApiError
   */
  public static examGraderPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this grader.
     */
    id: number,
    requestBody?: PatchedGraderDetail,
  }): CancelablePromise<GraderDetail> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/exam/grader/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing grader instances.
   * @returns void
   * @throws ApiError
   */
  public static examGraderDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this grader.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/exam/grader/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing question pool instances.
   * @returns PaginatedPoolDetailList
   * @throws ApiError
   */
  public static examPoolList({
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
  }): CancelablePromise<PaginatedPoolDetailList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/pool/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing question pool instances.
   * @returns PoolDetail
   * @throws ApiError
   */
  public static examPoolCreate({
    requestBody,
  }: {
    requestBody: PoolDetail,
  }): CancelablePromise<PoolDetail> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/exam/pool/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing question pool instances.
   * @returns PoolDetail
   * @throws ApiError
   */
  public static examPoolRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this pool.
     */
    id: number,
  }): CancelablePromise<PoolDetail> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/pool/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing question pool instances.
   * @returns PoolDetail
   * @throws ApiError
   */
  public static examPoolUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this pool.
     */
    id: number,
    requestBody: PoolDetail,
  }): CancelablePromise<PoolDetail> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/exam/pool/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing question pool instances.
   * @returns PoolDetail
   * @throws ApiError
   */
  public static examPoolPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this pool.
     */
    id: number,
    requestBody?: PatchedPoolDetail,
  }): CancelablePromise<PoolDetail> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/exam/pool/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing question pool instances.
   * @returns void
   * @throws ApiError
   */
  public static examPoolDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this pool.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/exam/pool/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing question instances.
   * @returns PaginatedQuestionDetailList
   * @throws ApiError
   */
  public static examQuestionList({
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
  }): CancelablePromise<PaginatedQuestionDetailList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/question/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing question instances.
   * @returns QuestionDetail
   * @throws ApiError
   */
  public static examQuestionCreate({
    requestBody,
  }: {
    requestBody: QuestionDetail,
  }): CancelablePromise<QuestionDetail> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/exam/question/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing question instances.
   * @returns QuestionDetail
   * @throws ApiError
   */
  public static examQuestionRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this question.
     */
    id: number,
  }): CancelablePromise<QuestionDetail> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/question/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing question instances.
   * @returns QuestionDetail
   * @throws ApiError
   */
  public static examQuestionUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this question.
     */
    id: number,
    requestBody: QuestionDetail,
  }): CancelablePromise<QuestionDetail> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/exam/question/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing question instances.
   * @returns QuestionDetail
   * @throws ApiError
   */
  public static examQuestionPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this question.
     */
    id: number,
    requestBody?: PatchedQuestionDetail,
  }): CancelablePromise<QuestionDetail> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/exam/question/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing question instances.
   * @returns void
   * @throws ApiError
   */
  public static examQuestionDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this question.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/exam/question/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing score instances.
   * @returns PaginatedScoreDetailList
   * @throws ApiError
   */
  public static examScoreList({
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
  }): CancelablePromise<PaginatedScoreDetailList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/score/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing score instances.
   * @returns ScoreDetail
   * @throws ApiError
   */
  public static examScoreCreate({
    requestBody,
  }: {
    requestBody: ScoreDetail,
  }): CancelablePromise<ScoreDetail> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/exam/score/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing score instances.
   * @returns ScoreDetail
   * @throws ApiError
   */
  public static examScoreRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this score.
     */
    id: number,
  }): CancelablePromise<ScoreDetail> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/score/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing score instances.
   * @returns ScoreDetail
   * @throws ApiError
   */
  public static examScoreUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this score.
     */
    id: number,
    requestBody: ScoreDetail,
  }): CancelablePromise<ScoreDetail> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/exam/score/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing score instances.
   * @returns ScoreDetail
   * @throws ApiError
   */
  public static examScorePartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this score.
     */
    id: number,
    requestBody?: PatchedScoreDetail,
  }): CancelablePromise<ScoreDetail> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/exam/score/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing score instances.
   * @returns void
   * @throws ApiError
   */
  public static examScoreDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this score.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/exam/score/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing user exam instances.
   * @returns PaginatedSitList
   * @throws ApiError
   */
  public static examSitList({
    page,
    pageSize,
    userUsername,
  }: {
    /**
     * A page number within the paginated result set.
     */
    page?: number,
    /**
     * Number of results to return per page.
     */
    pageSize?: number,
    userUsername?: string,
  }): CancelablePromise<PaginatedSitList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/sit/',
      query: {
        'page': page,
        'page_size': pageSize,
        'user__username': userUsername,
      },
    });
  }
  /**
   * A viewset for viewing and editing user exam instances.
   * @returns SitDetail
   * @throws ApiError
   */
  public static examSitCreate({
    requestBody,
  }: {
    requestBody: SitDetail,
  }): CancelablePromise<SitDetail> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/exam/sit/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing user exam instances.
   * @returns SitDetail
   * @throws ApiError
   */
  public static examSitRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this sit.
     */
    id: number,
  }): CancelablePromise<SitDetail> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/exam/sit/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing user exam instances.
   * @returns SitDetail
   * @throws ApiError
   */
  public static examSitUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this sit.
     */
    id: number,
    requestBody: SitDetail,
  }): CancelablePromise<SitDetail> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/exam/sit/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing user exam instances.
   * @returns SitDetail
   * @throws ApiError
   */
  public static examSitPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this sit.
     */
    id: number,
    requestBody?: PatchedSitDetail,
  }): CancelablePromise<SitDetail> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/exam/sit/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing user exam instances.
   * @returns void
   * @throws ApiError
   */
  public static examSitDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this sit.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/exam/sit/{id}/',
      path: {
        'id': id,
      },
    });
  }
}
