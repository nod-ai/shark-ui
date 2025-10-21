<script setup lang="ts">
import {
  Cause,
  Effect,
  Exit,
} from 'effect';

import type TextToImage from '@/features/TextToImage';

import TextToImageOutputAlert from './TextToImageOutputAlert.vue';
import TextToImageOutputImg from './TextToImageOutputImg.vue';

defineProps<{
  output: Exit.Exit<
    TextToImage.Pipeline.Output.Image,
    TextToImage.Server.Error.Any
  >;
}>();
</script>

<template>
  <TextToImageOutputImg
    v-if="Exit.isSuccess(output)"
    :model-value="output.value"
  />
  <TextToImageOutputAlert
    v-else-if="Cause.isFailType(output.cause)"
    :error="output.cause.error"
  />
  <template
    v-else
  >
    {{ Effect.dieMessage(Cause.pretty(output.cause)).pipe(Effect.runSync) }}
  </template>
</template>
