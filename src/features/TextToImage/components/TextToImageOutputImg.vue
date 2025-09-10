<script setup lang="ts">
import {
  VImg,
} from 'vuetify/components/VImg';

import type * as TextToImage from '@/features/TextToImage';

defineProps<{
  modelValue: TextToImage.Pipeline_Output['image'];
}>();
</script>

<template>
  <VImg
    :src="modelValue.uri.serialized"
    :alt="modelValue.description"
  />
</template>
