import {
  createApp,
} from 'vue';

import App from './App.vue';
import vuetify from './plugins/vuetify.ts';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');

window.onunhandledrejection = (someEvent) => {
  const rejectionReason = String(someEvent.reason);

  const windowShouldOpenNewGitHubIssue = window.confirm([
    'Unexpected Error:',
    `"${rejectionReason}"`,
    '',
    'Proceed to file an issue?',
  ].join('\n'));

  if (windowShouldOpenNewGitHubIssue) {
    const quotedErrorMessage = `Error Message:\n${rejectionReason}`.replace('\n', '\n> ');
    const newGitHubIssue = new URL('https://github.com/nod-ai/shark-ui/issues/new');
    const referencedParameters = newGitHubIssue.searchParams;
    referencedParameters.set('title', `[Unexpected Error]: can't <some task> when <some context>`);
    referencedParameters.set('body', quotedErrorMessage);
    referencedParameters.set('labels', ['bug'].join());
    referencedParameters.set('type', 'Bug');
    window.open(newGitHubIssue);
  }

  someEvent.preventDefault();
};
