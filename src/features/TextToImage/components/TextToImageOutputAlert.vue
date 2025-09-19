<script setup lang="ts">
import TextToImage from '@/features/TextToImage';

import TextToImageServerConnectionAlert from './TextToImageServerConnectionAlert.vue';
import TextToImageServerSpecificationAlert from './TextToImageServerSpecificationAlert.vue';

defineProps<{
  error: TextToImage.Server.Error.Any;
}>();
</script>

<template>
  <TextToImageServerSpecificationAlert
    v-if="(error instanceof TextToImage.Server.Error.MissingSpecification)"
    :error="error"
  />
  <TextToImageServerConnectionAlert
    v-else
    :error="error"
  />
</template>
