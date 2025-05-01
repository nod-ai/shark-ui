import {
  createApp,
} from 'vue';

import App from './App.vue';

import {
  promptUserToReport,
} from './features/reporting.ts';

import vuetify from './plugins/vuetify.ts';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');

window.onunhandledrejection = (someEvent) => {
  const rejectionReason = String(someEvent.reason);
  promptUserToReport(rejectionReason);
  someEvent.preventDefault();
};
