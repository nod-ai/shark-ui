<script setup lang="ts">
import {
  VCard,
} from 'vuetify/components/VCard';
import {
  VTextarea,
} from 'vuetify/components/VTextarea';

import type ImageGenerationPrompt from '@/models/ImageGenerationPrompt.ts';

const exposedPrompt = defineModel<ImageGenerationPrompt>({
  required: true,
});
</script>

<template>
  <VCard
    subtitle="Prompts"
  >
    <template #text>
      <VTextarea
        v-model="exposedPrompt.positive"
        label="Imagine..."
        placeholder="What would you like to see?"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />

      <br>

      <VTextarea
        v-model="exposedPrompt.negative"
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
