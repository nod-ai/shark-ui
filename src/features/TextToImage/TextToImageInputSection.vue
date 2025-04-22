<script setup lang="ts">
import {
  get,
  ref,
  set,
  type Ref,
} from '@/library/vue/reactivity.ts';

import {
  watch,
} from 'vue';
import {
  VCard,
} from 'vuetify/components/VCard';
import {
  VTextarea,
} from 'vuetify/components/VTextarea';

import {
  cloneOf,
} from '@/library/utilitiesByType/reference.ts';

import type ImageGenerationPrompt from '@/models/ImageGenerationPrompt.ts';

const exposedPrompt = defineModel<ImageGenerationPrompt | null>({
  required: true,
});

const defaultInitialPrompt: ImageGenerationPrompt = {
  positive: 'a cat under the snow with blue eyes, covered by snow, cinematic style, medium shot, professional photo, animal',
  negative: 'Watermark, blurry, over-saturated, low resolution, pollution',
};

const initialPrompt: ImageGenerationPrompt = get(exposedPrompt) ?? defaultInitialPrompt;

const currentPrompt: Ref<ImageGenerationPrompt> = ref(initialPrompt);

watch(
  currentPrompt,
  (updatedPrompt) => {
    set(exposedPrompt, cloneOf(updatedPrompt));
  },
  {
    deep     : true,
    immediate: true,
  },
);
</script>

<template>
  <VCard
    subtitle="Prompts"
  >
    <template #text>
      <VTextarea
        v-model="currentPrompt.positive"
        label="Imagine..."
        placeholder="What would you like to see?"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />

      <br>

      <VTextarea
        v-model="currentPrompt.negative"
        label="Avoid..."
        placeholder="What should be avoided?"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />
    </template>
  </VCard>
</template>
