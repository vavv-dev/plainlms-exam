/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Activation } from '../models/Activation';
import type { PaginatedUserList } from '../models/PaginatedUserList';
import type { PasswordResetConfirm } from '../models/PasswordResetConfirm';
import type { PatchedUser } from '../models/PatchedUser';
import type { SendEmailReset } from '../models/SendEmailReset';
import type { SetPassword } from '../models/SetPassword';
import type { SetUsername } from '../models/SetUsername';
import type { User } from '../models/User';
import type { UserCreate } from '../models/UserCreate';
import type { UsernameResetConfirm } from '../models/UsernameResetConfirm';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountService {
  /**
   * @returns PaginatedUserList
   * @throws ApiError
   */
  public static accountUserList({
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
  }): CancelablePromise<PaginatedUserList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/account/user/',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * @returns UserCreate
   * @throws ApiError
   */
  public static accountUserCreate({
    requestBody,
  }: {
    requestBody: UserCreate,
  }): CancelablePromise<UserCreate> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/account/user/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  public static accountUserRetrieve({
    username,
  }: {
    username: string,
  }): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/account/user/{username}/',
      path: {
        'username': username,
      },
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  public static accountUserUpdate({
    username,
    requestBody,
  }: {
    username: string,
    requestBody: User,
  }): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/account/user/{username}/',
      path: {
        'username': username,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  public static accountUserPartialUpdate({
    username,
    requestBody,
  }: {
    username: string,
    requestBody?: PatchedUser,
  }): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/account/user/{username}/',
      path: {
        'username': username,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns void
   * @throws ApiError
   */
  public static accountUserDestroy({
    username,
  }: {
    username: string,
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/account/user/{username}/',
      path: {
        'username': username,
      },
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  public static accountUserUploadThumbnailPartialUpdate({
    username,
    formData,
  }: {
    username: string,
    formData?: {
      thumbnail?: Blob;
    },
  }): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/account/user/{username}/upload_thumbnail/',
      path: {
        'username': username,
      },
      formData: formData,
      mediaType: 'multipart/form-data',
    });
  }
  /**
   * @returns Activation
   * @throws ApiError
   */
  public static accountUserActivationCreate({
    requestBody,
  }: {
    requestBody: Activation,
  }): CancelablePromise<Activation> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/account/user/activation/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  public static accountUserMeRetrieve(): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/account/user/me/',
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  public static accountUserMeUpdate({
    requestBody,
  }: {
    requestBody: User,
  }): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/account/user/me/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  public static accountUserMePartialUpdate({
    requestBody,
  }: {
    requestBody?: PatchedUser,
  }): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/account/user/me/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns void
   * @throws ApiError
   */
  public static accountUserMeDestroy(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/account/user/me/',
    });
  }
  /**
   * @returns SendEmailReset
   * @throws ApiError
   */
  public static accountUserResendActivationCreate({
    requestBody,
  }: {
    requestBody: SendEmailReset,
  }): CancelablePromise<SendEmailReset> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/account/user/resend_activation/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns SendEmailReset
   * @throws ApiError
   */
  public static accountUserResetPasswordCreate({
    requestBody,
  }: {
    requestBody: SendEmailReset,
  }): CancelablePromise<SendEmailReset> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/account/user/reset_password/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns PasswordResetConfirm
   * @throws ApiError
   */
  public static accountUserResetPasswordConfirmCreate({
    requestBody,
  }: {
    requestBody: PasswordResetConfirm,
  }): CancelablePromise<PasswordResetConfirm> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/account/user/reset_password_confirm/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns SendEmailReset
   * @throws ApiError
   */
  public static accountUserResetUsernameCreate({
    requestBody,
  }: {
    requestBody: SendEmailReset,
  }): CancelablePromise<SendEmailReset> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/account/user/reset_username/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns UsernameResetConfirm
   * @throws ApiError
   */
  public static accountUserResetUsernameConfirmCreate({
    requestBody,
  }: {
    requestBody: UsernameResetConfirm,
  }): CancelablePromise<UsernameResetConfirm> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/account/user/reset_username_confirm/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns SetPassword
   * @throws ApiError
   */
  public static accountUserSetPasswordCreate({
    requestBody,
  }: {
    requestBody: SetPassword,
  }): CancelablePromise<SetPassword> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/account/user/set_password/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns SetUsername
   * @throws ApiError
   */
  public static accountUserSetUsernameCreate({
    requestBody,
  }: {
    requestBody: SetUsername,
  }): CancelablePromise<SetUsername> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/account/user/set_username/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
