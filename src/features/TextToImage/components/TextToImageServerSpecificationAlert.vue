<script setup lang="ts">
import {
  VAlert,
} from 'vuetify/components/VAlert';

import type {
  TextToImage,
} from '@/features/TextToImage';

defineProps<{
  error: TextToImage.Server.Error.Specification;
}>();
</script>

<template>
  <VAlert
    type="error"
    title="No text-to-image server was specified!"
  >
    Either:<br>
    a) supply it's corresponding environment variable named `{{ error.environmentKey }}` and rebuild<br>
    b) specify it within "{{ error.file.toString() }}"<br>
    OR<br>
    c) specify it within the response from "{{ error.endpoint.toString() }}"<br>
  </VAlert>
</template>
