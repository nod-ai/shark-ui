<script setup lang="ts">
import {
  VAlert,
} from 'vuetify/components/VAlert';

import type * as TextToImage from '@/features/TextToImage';

defineProps<{
  error: TextToImage.Server.ConnectionError;
}>();
</script>

<template>
  <VAlert
    type="error"
    title="Failed to Connect"
  >
    Server not found at specified origin "{{ error.origin.toString() }}".<br>
    <br>
    Ensure that:<br>
    a. the environment/config has the correct origin<br>
    AND<br>
    b. the server is running<br>
    <br>
    Then try again!
  </VAlert>
</template>
