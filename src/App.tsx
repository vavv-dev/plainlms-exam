// icons
import BadgeOutlined from '@mui/icons-material/BadgeOutlined';
import ContactMailOutlined from '@mui/icons-material/ContactMailOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined';

import { Join, Login, Logout, Password, Privacy, Profile, Terms } from '@/component/account/account';
import { Sit, UserSit } from '@/component/exam/exam';
import { BaseLayout, UserHomeLayout } from '@/component/layout/layout';
import '@/config/i18n';
import { createBrowserRouter } from 'react-router-dom';
import PasswordReset from '@/component/account/PasswordReset';
import ExamList from '@/component/exam/ExamList';

// Paths is used for reverse routing
export const userHomePath = ':username';
export const profilePath = 'profile';
export const userSitPath = 'sit';
export const SitPath = 'sit/:sitId';
export const loginPath = 'login';
export const logoutPath = 'logout';
export const joinPath = 'join';
export const termsPath = 'terms';
export const privacyPath = 'privacy';
export const passwordPath = 'password';
export const passwordResetPath = 'password/:uid/:token';

const routeData = [
  {
    path: '/',
    element: <BaseLayout />,
    title: 'Home',
    children: [
      // home
      { path: 'examlist', element: <ExamList />, title: 'Exam List', Icon: FactCheckOutlinedIcon },

      // user home
      {
        path: userHomePath,
        element: <UserHomeLayout />,
        title: 'User Home',
        children: [
          { path: userSitPath, element: <UserSit />, title: 'Sit', Icon: FactCheckOutlinedIcon },
          { path: profilePath, element: <Profile />, title: 'Profile', Icon: ContactMailOutlined },
        ],
      },

      // action
      { path: SitPath, element: <Sit />, title: 'Sit Exam' },

      // account
      { path: loginPath, element: <Login />, title: 'Login' },
      { path: logoutPath, element: <Logout />, title: 'Logout', Icon: LogoutOutlined },
      { path: joinPath, element: <Join />, title: 'Join', Icon: BadgeOutlined },
      { path: termsPath, element: <Terms />, title: 'Terms', Icon: ReceiptLongOutlinedIcon },
      { path: privacyPath, element: <Privacy />, title: 'Privacy', Icon: HttpsOutlinedIcon },
      { path: passwordPath, element: <Password />, title: 'Password', Icon: VpnKeyOutlined },
      { path: passwordResetPath, element: <PasswordReset />, title: 'Password Reset', Icon: VpnKeyOutlined },
    ],
  },
];

const router = createBrowserRouter(routeData);

export default router;

/*******************************************************************************
 * route helper
 * reverse, routeMatches
 *******************************************************************************/

interface IRouteTree {
  path: string;
  pathname: string;
  element: React.ReactNode;
  children?: IRouteTree[];
  title: string;
  Icon?: JSX.ElementType;
}

interface IRouteTable {
  [pathname: string]: IRouteTree;
}

const createFlatRoutes = (routes: IRouteTree[], parentPath: string = ''): IRouteTable => {
  const routeTable: IRouteTable = {};

  for (const route of routes) {
    let path = route.path.startsWith('/') ? route.path.slice(1) : route.path;
    path = path.endsWith('/') ? path.slice(0, -1) : path;

    const pathname = `${parentPath}${parentPath == '/' ? '' : '/'}${path}`;
    routeTable[pathname] = { ...route, pathname };

    if (route.children) {
      const childFlatRoutes = createFlatRoutes(route.children, pathname);
      Object.assign(routeTable, childFlatRoutes);
    }
  }

  return routeTable;
};

const routeTable = createFlatRoutes(routeData as IRouteTree[]);

/**
 *
 * routeMatches
 * @param path
 * @returns IRouteTree[]
 *
 */
export const routeMatches = (path: string): IRouteTree[] => {
  return Object.entries(routeTable).reduce((acc, [pathname, route]) => {
    if (pathname.match(path)) {
      acc.push(route);
    }
    return acc;
  }, [] as IRouteTree[]);
};

/**
 *
 * useReverse
 * @param path
 * @param params
 * @param queryString
 * @returns string
 *
 */
export const reverse = (
  path: string,
  params: Record<string, string | number> = {},
  queryString: Record<string, string> = {},
): string => {
  for (const [pathname, { path: shortPath }] of Object.entries(routeTable)) {
    // first match
    if (path === shortPath) {
      let reversePath = pathname;
      // replace params
      for (const [param, value] of Object.entries(params)) {
        reversePath = reversePath.replace(`:${param}`, value as string);
      }
      // add query string
      if (Object.keys(queryString).length > 0) {
        const search = new URLSearchParams(queryString).toString();
        reversePath = `${reversePath}?${search}`;
      }
      return reversePath;
    }
  }
  return '';
};
