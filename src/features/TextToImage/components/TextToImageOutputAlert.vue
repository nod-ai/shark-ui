<script setup lang="ts">
import TextToImageServerConnectionAlert from './TextToImageServerConnectionAlert.vue';
import TextToImageServerSpecificationAlert from './TextToImageServerSpecificationAlert.vue';

import * as TextToImage from '@/features/TextToImage';

type OutputError =
  | TextToImage.Server.ConnectionError
  | TextToImage.Server.SpecificationError
;

defineProps<{
  error: OutputError;
}>();
</script>

<template>
  <TextToImageServerSpecificationAlert
    v-if="(error instanceof TextToImage.Server.SpecificationError)"
    :error="error"
  />
  <TextToImageServerConnectionAlert
    v-else
    :error="error"
  />
</template>
