<script setup lang="ts">
import * as TextToImage from '@/features/TextToImage/exports';

import TextToImageServerConnectionAlert from './TextToImageServerConnectionAlert.vue';
import TextToImageServerSpecificationAlert from './TextToImageServerSpecificationAlert.vue';

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
