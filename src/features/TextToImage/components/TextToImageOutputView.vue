<script setup lang="ts">
import {
  Either,
} from 'effect';

import type TextToImage from '@/features/TextToImage';

import TextToImageOutputAlert from './TextToImageOutputAlert.vue';
import TextToImageOutputImg from './TextToImageOutputImg.vue';

defineProps<{
  output: Either.Either<
    TextToImage.Pipeline.Output.Image,
    TextToImage.Server.Error.Any
  >;
}>();
</script>

<template>
  <TextToImageOutputImg
    v-if="Either.isRight(output)"
    :model-value="output.right"
  />
  <TextToImageOutputAlert
    v-else
    :error="output.left"
  />
</template>
