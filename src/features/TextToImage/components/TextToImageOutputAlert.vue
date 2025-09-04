<script setup lang="ts">
import * as TextToImage from '@/features/TextToImage';

import TextToImageServerConnectionAlert from './TextToImageServerConnectionAlert.vue';
import TextToImageServerSpecificationAlert from './TextToImageServerSpecificationAlert.vue';

defineProps<{
  error: TextToImage.Server.Error.Any;
}>();
</script>

<template>
  <TextToImageServerSpecificationAlert
    v-if="(error instanceof TextToImage.Server.Error.Specification)"
    :error="error"
  />
  <TextToImageServerConnectionAlert
    v-else
    :error="error"
  />
</template>
