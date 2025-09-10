import {
  createApp,
} from '@/library/vue';

import {
  asError,
} from '@/library/utilitiesByType/error';

import App from '@/App.vue';
import vuetify from '@/plugins/vuetify.ts';
import router from '@/router';

import * as Reporting from '@/features/Reporting';

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');

window.onunhandledrejection = (someEvent) => {
  const rejectionReason = asError(someEvent.reason);
  Reporting.promptUserWith(rejectionReason);
  someEvent.preventDefault();
};

// In production version (post build/bundling), errors that originate from Vue components bypass the listeners on the current `Window` instance
app.config.errorHandler = (whateverThatWasThrown) => {
  const someError = asError(whateverThatWasThrown);
  Reporting.promptUserWith(someError);
};
