import {
  createApp,
} from '@/library/vue';

import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';

import {
  Reporting,
} from '@/features/Reporting';

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');

window.onunhandledrejection = (someEvent) => {
  Reporting.promptUserWith(someEvent.reason);
  someEvent.preventDefault();
};

// In production version (post build/bundling), errors that originate from Vue components bypass the listeners on the current `Window` instance
app.config.errorHandler = (whateverThatWasThrown) => {
  Reporting.promptUserWith(whateverThatWasThrown);
};
