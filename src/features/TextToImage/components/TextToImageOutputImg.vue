<script setup lang="ts">
import {
  VImg,
} from 'vuetify/components/VImg';

import type {
  TextToImage,
} from '@/features/TextToImage';

defineProps<{
  modelValue: TextToImage.Pipeline.Output['image'];
}>();
</script>

<template>
  <VImg
    :src="modelValue.uri.serialized"
    :alt="modelValue.description"
  />
</template>
