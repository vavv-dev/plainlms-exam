/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from '../models/Course';
import type { Lesson } from '../models/Lesson';
import type { PaginatedCourseList } from '../models/PaginatedCourseList';
import type { PaginatedLessonList } from '../models/PaginatedLessonList';
import type { PaginatedResourceList } from '../models/PaginatedResourceList';
import type { PaginatedTeacherList } from '../models/PaginatedTeacherList';
import type { PatchedCourse } from '../models/PatchedCourse';
import type { PatchedLesson } from '../models/PatchedLesson';
import type { PatchedResource } from '../models/PatchedResource';
import type { PatchedTeacher } from '../models/PatchedTeacher';
import type { Resource } from '../models/Resource';
import type { Teacher } from '../models/Teacher';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CourseService {
  /**
   * A viewset for viewing and editing course instances.
   * @returns PaginatedCourseList
   * @throws ApiError
   */
  public static courseCourseList({
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
  }): CancelablePromise<PaginatedCourseList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/course/course/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing course instances.
   * @returns Course
   * @throws ApiError
   */
  public static courseCourseCreate({
    requestBody,
  }: {
    requestBody: Course,
  }): CancelablePromise<Course> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/course/course/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing course instances.
   * @returns Course
   * @throws ApiError
   */
  public static courseCourseRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this course.
     */
    id: number,
  }): CancelablePromise<Course> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/course/course/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing course instances.
   * @returns Course
   * @throws ApiError
   */
  public static courseCourseUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this course.
     */
    id: number,
    requestBody: Course,
  }): CancelablePromise<Course> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/course/course/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing course instances.
   * @returns Course
   * @throws ApiError
   */
  public static courseCoursePartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this course.
     */
    id: number,
    requestBody?: PatchedCourse,
  }): CancelablePromise<Course> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/course/course/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing course instances.
   * @returns void
   * @throws ApiError
   */
  public static courseCourseDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this course.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/course/course/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing lesson instances.
   * @returns PaginatedLessonList
   * @throws ApiError
   */
  public static courseLessonList({
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
  }): CancelablePromise<PaginatedLessonList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/course/lesson/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing lesson instances.
   * @returns Lesson
   * @throws ApiError
   */
  public static courseLessonCreate({
    requestBody,
  }: {
    requestBody: Lesson,
  }): CancelablePromise<Lesson> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/course/lesson/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing lesson instances.
   * @returns Lesson
   * @throws ApiError
   */
  public static courseLessonRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this lesson.
     */
    id: number,
  }): CancelablePromise<Lesson> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/course/lesson/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing lesson instances.
   * @returns Lesson
   * @throws ApiError
   */
  public static courseLessonUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this lesson.
     */
    id: number,
    requestBody: Lesson,
  }): CancelablePromise<Lesson> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/course/lesson/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing lesson instances.
   * @returns Lesson
   * @throws ApiError
   */
  public static courseLessonPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this lesson.
     */
    id: number,
    requestBody?: PatchedLesson,
  }): CancelablePromise<Lesson> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/course/lesson/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing lesson instances.
   * @returns void
   * @throws ApiError
   */
  public static courseLessonDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this lesson.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/course/lesson/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing resource instances.
   * @returns PaginatedResourceList
   * @throws ApiError
   */
  public static courseResourceList({
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
  }): CancelablePromise<PaginatedResourceList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/course/resource/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing resource instances.
   * @returns Resource
   * @throws ApiError
   */
  public static courseResourceCreate({
    requestBody,
  }: {
    requestBody: Resource,
  }): CancelablePromise<Resource> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/course/resource/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing resource instances.
   * @returns Resource
   * @throws ApiError
   */
  public static courseResourceRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this resource.
     */
    id: number,
  }): CancelablePromise<Resource> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/course/resource/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing resource instances.
   * @returns Resource
   * @throws ApiError
   */
  public static courseResourceUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this resource.
     */
    id: number,
    requestBody: Resource,
  }): CancelablePromise<Resource> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/course/resource/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing resource instances.
   * @returns Resource
   * @throws ApiError
   */
  public static courseResourcePartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this resource.
     */
    id: number,
    requestBody?: PatchedResource,
  }): CancelablePromise<Resource> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/course/resource/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing resource instances.
   * @returns void
   * @throws ApiError
   */
  public static courseResourceDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this resource.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/course/resource/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing teacher instances.
   * @returns PaginatedTeacherList
   * @throws ApiError
   */
  public static courseTeacherList({
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
  }): CancelablePromise<PaginatedTeacherList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/course/teacher/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * A viewset for viewing and editing teacher instances.
   * @returns Teacher
   * @throws ApiError
   */
  public static courseTeacherCreate({
    requestBody,
  }: {
    requestBody: Teacher,
  }): CancelablePromise<Teacher> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/course/teacher/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing teacher instances.
   * @returns Teacher
   * @throws ApiError
   */
  public static courseTeacherRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this teacher.
     */
    id: number,
  }): CancelablePromise<Teacher> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/course/teacher/{id}/',
      path: {
        'id': id,
      },
    });
  }
  /**
   * A viewset for viewing and editing teacher instances.
   * @returns Teacher
   * @throws ApiError
   */
  public static courseTeacherUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this teacher.
     */
    id: number,
    requestBody: Teacher,
  }): CancelablePromise<Teacher> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/course/teacher/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing teacher instances.
   * @returns Teacher
   * @throws ApiError
   */
  public static courseTeacherPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this teacher.
     */
    id: number,
    requestBody?: PatchedTeacher,
  }): CancelablePromise<Teacher> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/course/teacher/{id}/',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * A viewset for viewing and editing teacher instances.
   * @returns void
   * @throws ApiError
   */
  public static courseTeacherDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this teacher.
     */
    id: number,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/course/teacher/{id}/',
      path: {
        'id': id,
      },
    });
  }
}
