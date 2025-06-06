<script setup lang="ts">
import * as TextToImage from '@/features/TextToImage';

defineProps<{
  error: TextToImage.Server.SpecificationError;
}>();
</script>

<template>
  {{
    error.throwAnyway([
      'No text-to-image server was specified!',
      'Either:',
      `a) supply it's corresponding environment variable named \`${error.environmentKey}\` and rebuild`,
      `b) specify it within ${error.file.toString()}`,
      'OR',
      `c) specify it within the response from ${error.endpoint.toString()}`,
    ].join('\n'))
  }}
</template>
