import Vue from 'vue';
import VueRouter, {
  NavigationGuardNext, Route, RouteConfig,
} from 'vue-router';
import CUser from '@/components/CUser.vue';
import { useLogIn, useLogout } from '@/router/composable/Logout';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

export const useAbbreviation = (name: string) => name === 'xid_c';

export const useAuth = (check = true) => localStorage.getItem('login') === 'ok';

const adminBeforeEnter = (to: Route, from: Route, next: NavigationGuardNext) => {
  const isAbbreviation = useAbbreviation(to.params.abbreviation);
  if (!isAbbreviation) {
    next({ name: 'about' });
  }
  const isLogin = useAuth(true);
  if (!isLogin) {
    next({ path: `${to.params.abbreviation}/auth` });
  }
  next();
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/auth/logout',
    name: 'logout',
    beforeEnter: useLogout,
  },
  {
    path: '/users/:id',
    component: CUser,
  },

  {
    path: '/:abbreviation/auth',
    name: 'auth',
    beforeEnter(to, from, next) {
      const isAbbreviation = useAbbreviation(to.params.abbreviation);
      if (!isAbbreviation) {
        next({ name: 'about' });
      }

      if (useAuth()) {
        next({ path: '/xid_c' });
      }
      next();
      return null;
    },
  },
  {
    path: '/auth',
    beforeEnter(to, from, next) {
      if (useAuth()) {
        next({ path: '/xid_c' });
      }

      useLogIn(to, from, next);
    },
  },
  {
    path: '/:abbreviation/admin/manage',
    name: 'manage',
    beforeEnter: adminBeforeEnter,
    component: CUser,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
