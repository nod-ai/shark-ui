<script setup lang="ts">
import {
  reactive,
  type Reactive,
} from '@/library/vue';

import {
  VNavigationDrawer,
} from 'vuetify/components/VNavigationDrawer';

import {
  useDisplay,
} from 'vuetify/framework';

const currentDisplay = reactive(useDisplay());

type Display = Reactive<ReturnType<typeof useDisplay>>;

const PanelWidth = {
  default: 256,
  scaleFor(
    given: Display,
  ) {
    const {
      md,
      lg,
      xl,
    } = given.thresholds;

    switch (true) {
      case (given.width <= md): return 1.00;
      case (given.width <= lg): return 1.50;
      case (given.width <= xl): return 2.00;
      default /*           */ : return 2.50;
    }
  },
  for(
    givenDisplay: Display,
  ) {
    return this.scaleFor(givenDisplay) * this.default;
  },
};

</script>

<template>
  <VNavigationDrawer
    permanent
    class="pa-4"
    v-bind="currentDisplay.smAndUp
      ? {
        width: PanelWidth.for(currentDisplay),
      }
      : {
        location: 'top',
      }
    "
  >
    <slot />
  </VNavigationDrawer>
</template>
