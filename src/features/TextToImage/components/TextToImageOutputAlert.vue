<script setup lang="ts">
import TextToImageServerConnectionAlert from './TextToImageServerConnectionAlert.vue';

import * as TextToImage from '@/features/TextToImage';

type OutputError =
  | TextToImage.Server.ConnectionError;

defineProps<{
  error: OutputError;
}>();
</script>

<template>
  <TextToImageServerConnectionAlert
    :error="error"
  />
</template>
