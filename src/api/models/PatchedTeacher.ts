/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PatchedTeacher = {
  readonly id?: number;
  readonly link?: string | null;
  password?: string;
  last_login?: string | null;
  /**
   * 해당 사용자에게 모든 권한을 허가합니다.
   */
  is_superuser?: boolean;
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  username?: string;
  first_name?: string;
  last_name?: string;
  /**
   * 사용자가 관리사이트에 로그인이 가능한지를 나타냅니다.
   */
  is_staff?: boolean;
  /**
   * 이 사용자가 활성화되어 있는지를 나타냅니다. 계정을 삭제하는 대신 이것을 선택 해제하세요.
   */
  is_active?: boolean;
  date_joined?: string;
  name?: string;
  email?: string;
  cellphone?: string | null;
  thumbnail?: string | null;
  description?: string | null;
  /**
   * 이 사용자가 속한 그룹. 사용자는 그룹에 부여된 모든 권한을 물려 받습니다.
   */
  groups?: Array<number>;
  /**
   * 이 사용자를 위한 특정 권한.
   */
  user_permissions?: Array<number>;
};

