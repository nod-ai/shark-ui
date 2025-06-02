<script setup lang="ts">
import {
  VImg,
} from 'vuetify/components/VImg';

import * as TextToImage from '@/features/TextToImage';

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
