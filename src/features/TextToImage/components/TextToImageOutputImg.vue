<script setup lang="ts">
import {
  VImg,
} from 'vuetify/components/VImg';

import type * as TextToImage from '@/features/TextToImage/exports';

defineProps<{
  modelValue: TextToImage.Output['image'];
}>();
</script>

<template>
  <VImg
    :src="modelValue.uri.serialized"
    :alt="modelValue.description"
  />
</template>
