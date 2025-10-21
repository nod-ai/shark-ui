import {
  createRouter,
  createWebHistory,
} from 'vue-router';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const TextToImagePage = () => import('@/pages/TextToImagePage.vue');
/* eslint-enable @typescript-eslint/explicit-function-return-type */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
    {
      path     : '/text-to-image',
      alias    : '/',
      name     : 'text-to-image',
      component: TextToImagePage,
    },
  ],
});

export {
  router as default,
};
