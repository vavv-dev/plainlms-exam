/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type User = {
  name: string;
  email: string;
  date_joined?: string;
  password: string;
  cellphone?: string | null;
  thumbnail?: string | null;
  description?: string | null;
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  readonly username: string;
};

