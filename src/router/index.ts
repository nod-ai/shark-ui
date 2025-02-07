import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import TextToImagePage from '../pages/TextToImagePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/text-to-image',
      alias: '/',
      name: 'text-to-image',
      component: TextToImagePage,
    },
  ],
});

export default router;
