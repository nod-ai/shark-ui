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

const endpointOffset = 1;
const defaultOffset = 0;

const stylisticOffset = (
  {
    for: givenValue,
    in: givenRange,
  }: {
    for: number;
    in: Range;
  },
): number => {
  const leftwardOffset = -endpointOffset;
  const rightwardOffset = endpointOffset;

  if (givenValue === givenRange.lowerBound) return leftwardOffset;
  if (givenValue === givenRange.upperBound) return rightwardOffset;

  return defaultOffset;
};

type SliderLabelsByTick = Record<number, string>;

const tickLabels = (
  {
    for: givenValue,
    in : givenRange,
    when: shouldMakeLabelsFor = () => true,
  }: {
    for: number;
    in: Range;
    when?: (value: number) => boolean;
  },
): SliderLabelsByTick | null => {
  if (!shouldMakeLabelsFor(givenValue)) return null;

  const derivedOffset = stylisticOffset({
    for: givenValue,
    in : givenRange,
  });

  return {
    [givenValue + derivedOffset]: givenValue.toString(),
  };
};

const boundaryTickLabels = (
  {
    in: givenRange,
    around: givenValue,
  }: {
    in: Range;
    around: number;
  },
): SliderLabelsByTick => {
  if (
    !givenRange.inclusivelyContains(givenValue)
  ) throw new RangeError(`Expected value within range: ${givenRange.inInclusiveNotation}, got: ${givenValue.toString()}`);

  const valueLabels = tickLabels({
    for: givenValue,
    in : givenRange,
  });

  const proximityOffset = 5;

  const minLabels = tickLabels({
    for : givenRange.lowerBound,
    in  : givenRange,
    when: $0 => (($0 + proximityOffset) <= givenValue),
  });

  const maxLabels = tickLabels({
    for : givenRange.upperBound,
    in  : givenRange,
    when: $0 => (givenValue <= ($0 - proximityOffset)),
  });

  return shallowlyMerged(
    minLabels,
    maxLabels,
    valueLabels,
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
      :ticks="boundaryTickLabels({ in: range, around: currentValue})"
      show-ticks="always"
      thumb-color="primary"
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
