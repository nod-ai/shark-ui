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

import DiscreteRange from '@/library/Range/DiscreteRange.ts';
import type Range from '@/library/Range/index.ts';

import {
  shallowlyMerged,
} from '@/library/utilitiesByType/record.ts';

const currentValue = defineModel<number>({
  required: true,
});

const given = defineProps<{
  label: string;
  range: DiscreteRange;
  tickStep: DiscreteRange['stepSize'];
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

  switch (givenPosition) {
    case givenRange.lowerBound: return leftwardOffset;
    case givenRange.upperBound: return rightwardOffset;
    default /*             */ : return defaultOffset;
  }
};

type SliderTickLabel = string;
type SliderTickLabelsByPosition = Record<SliderTickPosition, SliderTickLabel>;

const tickLabels = (
  {
    by: givenPosition,
    in : givenRange,
  }: {
    by: SliderTickPosition;
    in: Range;
  },
): SliderTickLabelsByPosition | null => {
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

const tickLabelsAlong = (
  givenRange: Range,
  {
    atEvery: givenStepSize,
  }: {
    atEvery: DiscreteRange['stepSize'];
  },
): SliderTickLabelsByPosition => {
  const tickRange = DiscreteRange.spanning({
    from: givenRange.lowerBound,
    to  : givenRange.upperBound,
    by  : givenStepSize,
  });

  const labelSets = tickRange.inclusiveSteps.map((eachPosition) => {
    return tickLabels({
      by: eachPosition,
      in: tickRange,
    });
  });

  return shallowlyMerged(...labelSets);
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
      :ticks="tickLabelsAlong(range, { atEvery: tickStep })"
      show-ticks="always"
      thumb-color="primary"
      thumb-label="always"
      class="pt-6"
    >
      <template #prepend>
        <VBtn
          icon="$minus"
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
          icon="$plus"
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
