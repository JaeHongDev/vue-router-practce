import { NavigationGuard, NavigationGuardNext, Route } from 'vue-router';

// eslint-disable-next-line import/prefer-default-export
export const useLogout = (to:Route, from: Route, next: NavigationGuardNext) => {
  const loginToken = window.localStorage.getItem('login');
  if (loginToken === null) {
    throw new Error('로그아웃 할 수 없습니다');
  }
  window.localStorage.removeItem('login');

  next({ path: '/' });
};

export const useLogIn = (to: Route, from:Route, next: NavigationGuardNext) => {
  window.localStorage.setItem('login', 'ok');
  next({ path: '/xid_c/' });
};
