import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'main',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/classes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'classes',
        component: () => import('pages/ClassesPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
