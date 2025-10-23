<script setup lang="ts">
import {
  get,
  ref,
  set,
  type Ref,
  watch,
} from '@/library/vue';

import {
  Option,
} from 'effect';

import {
  VCard,
} from 'vuetify/components/VCard';

import {
  VTextarea,
} from 'vuetify/components/VTextarea';

import type {
  TextToImage_Pipeline,
} from '../Pipeline';

type StandardizedInputText = TextToImage_Pipeline.Input['text'];

const exposedInputText = defineModel<Option.Option<StandardizedInputText>>({
  required: true,
});

interface InputTextFieldProps {
  label: string;
  placeholder: string;
}

defineProps<{
  label: string;
  positive: InputTextFieldProps;
  negative: InputTextFieldProps;
}>();

const qualitativeToQuantitativeTextWeightMap = {
  positive: 1,
  negative: -1,
} as const;

type QualitativeToQuantitativeTextWeightMap = typeof qualitativeToQuantitativeTextWeightMap;

type QualitativeTextWeight = keyof QualitativeToQuantitativeTextWeightMap;

type InputTextByQualitativeWeight = Record<QualitativeTextWeight, string>;

const byQualitativeWeight = (givenInputText: StandardizedInputText): InputTextByQualitativeWeight => {
  const entriesForInputTextByQualitativeWeight = Object.entries(qualitativeToQuantitativeTextWeightMap)
    .map(([eachUnsafeQualitativeWeight, eachQuantitativeWeight]) => {
      const eachSerializationByWeight = givenInputText
        .filter(($0) => $0.weight === eachQuantitativeWeight)
        .map(($0) => $0.text.trim())
        .join(', ');

      const eachDerivedEntry = [
        eachUnsafeQualitativeWeight,
        eachSerializationByWeight,
      ] as [
        QualitativeTextWeight,
        string,
      ];

      return eachDerivedEntry;
    });

  const computedInputTextByQualitativeWeight = Object.fromEntries(entriesForInputTextByQualitativeWeight);
  return computedInputTextByQualitativeWeight as unknown as InputTextByQualitativeWeight;
};

const standardized = (givenInputText: InputTextByQualitativeWeight): StandardizedInputText => {
  const computedInputText = Object.entries(qualitativeToQuantitativeTextWeightMap)
    .map(([eachUnsafeQualitativeWeight, eachQuantitativeWeight]): StandardizedInputText[number] => {
      const eachQualitativeWeight = eachUnsafeQualitativeWeight as QualitativeTextWeight;
      const weightedText = givenInputText[eachQualitativeWeight];

      const newInputTextComponent = {
        text  : weightedText,
        weight: eachQuantitativeWeight,
      };

      return newInputTextComponent;
    });

  return computedInputText;
};

const defaultInitialInputText: InputTextByQualitativeWeight = {
  positive: 'a cat under the snow with blue eyes, covered by snow, cinematic style, medium shot, professional photo, animal',
  negative: 'Watermark, blurry, over-saturated, low resolution, pollution',
};

const initialInputText: InputTextByQualitativeWeight = (() => {
  return Option.match(get(exposedInputText), {
    onNone: () => defaultInitialInputText,
    onSome: ($0) => byQualitativeWeight($0),
  });
})();

const currentInputText: Ref<InputTextByQualitativeWeight> = ref(initialInputText);

watch(
  currentInputText,
  (updatedInputText) => {
    set(exposedInputText, Option.some(standardized(updatedInputText)));
  },
  {
    deep     : true,
    immediate: true,
  },
);
</script>

<template>
  <VCard
    :subtitle="label"
  >
    <template #text>
      <VTextarea
        v-model="currentInputText.positive"
        :label="positive.label"
        :placeholder="positive.placeholder"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />

      <br>

      <VTextarea
        v-model="currentInputText.negative"
        :label="negative.label"
        :placeholder="negative.placeholder"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />
    </template>
  </VCard>
</template>
