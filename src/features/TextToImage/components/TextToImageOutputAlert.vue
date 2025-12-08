<script setup lang="ts">
import type TextToImage from '@/features/TextToImage';

import TextToImageServerConnectionAlert from './TextToImageServerConnectionAlert.vue';
import TextToImageServerSpecificationAlert from './TextToImageServerSpecificationAlert.vue';

defineProps<{
  error: TextToImage.Server.Error.Any;
}>();
</script>

<template>
  <TextToImageServerSpecificationAlert
    v-if="error._tag === 'TextToImage_Server_Error_MissingSpecification'"
    :error
  />
  <TextToImageServerConnectionAlert
    v-else
    :error
  />
</template>
