<script setup lang="ts">
import * as TextToImage from '@/features/TextToImage';

import TextToImageServerConnectionAlert from './TextToImageServerConnectionAlert.vue';
import TextToImageServerSpecificationAlert from './TextToImageServerSpecificationAlert.vue';

type OutputError =
  | TextToImage.Server.Error_Connection
  | TextToImage.Server.Error_Specification
;

defineProps<{
  error: OutputError;
}>();
</script>

<template>
  <TextToImageServerSpecificationAlert
    v-if="(error instanceof TextToImage.Server.Error_Specification)"
    :error="error"
  />
  <TextToImageServerConnectionAlert
    v-else
    :error="error"
  />
</template>
