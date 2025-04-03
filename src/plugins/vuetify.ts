import 'vuetify/styles';

import {
  createVuetify,
} from 'vuetify';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  defaults: {
    VBtn: {
      color: 'primary',
    },
  },
});

export default vuetify;
