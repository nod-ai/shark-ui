<script setup lang="ts">
import {
  VCard,
} from 'vuetify/components/VCard';
import {
  VNumberInput,
} from 'vuetify/components/VNumberInput';

import type DiscreteRange from '@/library/Range/DiscreteRange';

import DiscreteSlider from './DiscreteSlider.vue';

interface DiffusionStepProps {
  label: string;
  range: DiscreteRange;
  tickStep: number;
}

interface GuidanceScaleProps {
  label: string;
  min: number;
  max: number;
  precision: number;
  step: number;
}

const numberOfDiffusionSteps = defineModel<number>('numberOfDiffusionSteps', {
  required: true,
});

const guidanceScale = defineModel<number>('guidanceScale', {
  required: true,
});

defineProps<{
  label: string;
  diffusionStepProps: DiffusionStepProps;
  guidanceScaleProps: GuidanceScaleProps;
}>();
</script>

<template>
  <VCard
    subtitle="Model Settings"
  >
    <div class="px-4">
      <DiscreteSlider
        v-model="numberOfDiffusionSteps"
        :label="diffusionStepProps.label"
        :range="diffusionStepProps.range"
        :tick-step="diffusionStepProps.tickStep"
      />

      <br>

      <VNumberInput
        v-model="guidanceScale"
        control-variant="stacked"
        :label="guidanceScaleProps.label"
        :min="guidanceScaleProps.min"
        :max="guidanceScaleProps.max"
        :precision="guidanceScaleProps.precision"
        :step="guidanceScaleProps.step"
      />
    </div>
  </VCard>
</template>
