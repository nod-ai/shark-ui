<script setup lang="ts">
import {
  computed,
} from 'vue';

import TextToImageServerConnectionAlert from './TextToImageServerConnectionAlert.vue';

import * as TextToImage from '@/features/TextToImage';

type OutputError =
  | TextToImage.Server.ConnectionError
  | TextToImage.Server.SpecificationError;

const given = defineProps<{
  error: OutputError;
}>();

const narrowedError = computed(() => {
  if (
    given.error instanceof TextToImage.Server.SpecificationError
  ) {
    const userFacingMessage = [
      'No text-to-image server was specified!',
      'Either:',
      `a) supply it's corresponding environment variable named \`${given.error.environmentKey}\` and rebuild`,
      `b) specify it within ${given.error.file.toString()}`,
      'OR',
      `c) specify it within the response from ${given.error.endpoint.toString()}`,
    ].join('\n');

    return given.error.throwAnyway(userFacingMessage);
  }

  return given.error;
});
</script>

<template>
  <TextToImageServerConnectionAlert
    :error="narrowedError"
  />
</template>
