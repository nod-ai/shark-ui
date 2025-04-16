<script setup lang="ts">
import {
  get,
  set,
} from '@/library/vue/reactivity.ts';

import {
  VBtn,
} from 'vuetify/components/VBtn';
import {
  VCard,
} from 'vuetify/components/VCard';
import {
  VSlider,
} from 'vuetify/components/VSlider';

import type DiscreteRange from '@/library/Range/DiscreteRange.ts';
import Range from '@/library/Range/index.ts';

import {
  shallowlyMerged,
} from '@/library/utilitiesByType/record.ts';

const currentValue = defineModel<number>({
  required: true,
});

const given = defineProps<{
  label: string;
  range: DiscreteRange;
}>();

const incrementCurrentValueBy = (givenStepCount: number) => {
  const changeInValue = givenStepCount * given.range.stepSize;
  const nextValue = get(currentValue) + changeInValue;
  set(currentValue, nextValue);
};

type SliderTickPosition = number;

const endpointOffset = 1;
const defaultOffset = 0;

const stylisticOffset = (
  {
    for: givenPosition,
    in: givenRange,
  }: {
    for: SliderTickPosition;
    in: Range;
  },
): number => {
  const leftwardOffset = -endpointOffset;
  const rightwardOffset = endpointOffset;

  if (givenPosition === givenRange.lowerBound) return leftwardOffset;
  if (givenPosition === givenRange.upperBound) return rightwardOffset;

  return defaultOffset;
};

type SliderTickLabel = string;
type SliderLabelsByTick = Record<SliderTickPosition, SliderTickLabel>;

const tickLabels = (
  {
    by: givenPosition,
    in : givenRange,
  }: {
    by: SliderTickPosition;
    in: Range;
  },
): SliderLabelsByTick | null => {
  const derivedOffset = stylisticOffset({
    for: givenPosition,
    in : givenRange,
  });

  const tickPosition = givenPosition + derivedOffset;
  const tickLabel = givenPosition.toString();

  return {
    [tickPosition]: tickLabel,
  };
};

const boundaryTickLabels = (
  {
    in: givenRange,
  }: {
    in: Range;
  },
): SliderLabelsByTick => {
  const minLabels = tickLabels({
    by: givenRange.lowerBound,
    in: givenRange,
  });

  const maxLabels = tickLabels({
    by: givenRange.upperBound,
    in: givenRange,
  });

  return shallowlyMerged(
    minLabels,
    maxLabels,
  );
};
</script>

<template>
  <VCard
    :subtitle="label"
  >
    <VSlider
      v-model="currentValue"
      :min="range.lowerBound"
      :step="range.stepSize"
      :max="range.upperBound"
      :ticks="boundaryTickLabels({ in: range })"
      show-ticks="always"
      thumb-color="primary"
      thumb-label="always"
      class="pt-6"
    >
      <template #prepend>
        <VBtn
          icon="mdi-minus"
          variant="text"
          size="small"
          density="compact"
          :disabled="currentValue <= range.lowerBound"
          @click="() => incrementCurrentValueBy(-1)"
        />
      </template>

      <template #thumb-label="{ modelValue }">
        <span
          style="color: rgb(var(--v-theme-on-background));"
        >
          {{ modelValue }}
        </span>
      </template>

      <template #append>
        <VBtn
          icon="mdi-plus"
          variant="text"
          size="small"
          density="compact"
          :disabled="range.upperBound <= currentValue"
          @click="() => incrementCurrentValueBy(+1)"
        />
      </template>
    </VSlider>
  </VCard>
</template>
