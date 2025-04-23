import 'vuetify/styles';

import {
  createVuetify,
} from 'vuetify';

import {
  aliases,
  mdi,
} from 'vuetify/iconsets/mdi-svg';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  defaults: {
    VBtn: {
      color: 'primary',
    },
    VCard: {
      variant: 'tonal',
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
