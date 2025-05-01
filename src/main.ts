import {
  createApp,
} from 'vue';

import App from './App.vue';

import {
  promptUserToReport,
} from './features/reporting.ts';

import {
  asError,
} from './library/utilitiesByType/error.ts';

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

// In production version (post build/bundling), errors that originate from Vue components bypass the listeners on the current `Window` instance
app.config.errorHandler = (someException) => {
  const someError = asError(someException);
  promptUserToReport(someError.message);
};
