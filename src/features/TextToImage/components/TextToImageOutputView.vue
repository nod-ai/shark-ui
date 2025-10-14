<script setup lang="ts">
import {
  Cause,
} from 'effect';

import Attempt from '@/library/Attempt';

import type TextToImage from '@/features/TextToImage';

import TextToImageOutputAlert from './TextToImageOutputAlert.vue';
import TextToImageOutputImg from './TextToImageOutputImg.vue';

defineProps<{
  output: Attempt.Exit.Exit<
    TextToImage.Pipeline.Output.Image,
    TextToImage.Server.Error.Any
  >;
}>();
</script>

<template>
  <TextToImageOutputImg
    v-if="Attempt.Exit.isSuccess(output)"
    :model-value="output.value"
  />
  <TextToImageOutputAlert
    v-else-if="Cause.isFailType(output.cause)"
    :error="output.cause.error"
  />
  <template
    v-else
  >
    {{ Attempt.Exit.die(Cause.pretty(output.cause)) }}
  </template>
</template>
