/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TokenObtainPair } from '../models/TokenObtainPair';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TokenService {
  /**
   * TokenObtainPairView to set token in cookie
   * @returns TokenObtainPair
   * @throws ApiError
   */
  public static tokenCreate({
    requestBody,
  }: {
    requestBody: TokenObtainPair,
  }): CancelablePromise<TokenObtainPair> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/token/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * TokenObtainPairView to set token in cookie
   * @returns void
   * @throws ApiError
   */
  public static tokenDestroy(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/token/',
    });
  }
}
