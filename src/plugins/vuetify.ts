import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import {
  createVuetify,
} from 'vuetify';

import {
  aliases,
  mdi,
} from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  defaults: {
    VBtn: {
      color: 'primary',
    },
  },
  icons: {
    sets: {
      mdi,
    },
    defaultSet: 'mdi',
    aliases,
  },
});

export default vuetify;
