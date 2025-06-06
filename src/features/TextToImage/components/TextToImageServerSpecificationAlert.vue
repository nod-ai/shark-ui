<script setup lang="ts">
import * as TextToImage from '@/features/TextToImage';

defineProps<{
  error: TextToImage.Server.SpecificationError;
}>();
</script>

<template>
  {{
    error.throwAnyway([
      'No text-to-image server was specified!\n',
      'Either:\n',
      `a) supply it's corresponding environment variable named \`${error.environmentKey}\` and rebuild\n`,
      `b) specify it within ${error.file.toString()}\n`,
      'OR\n',
      `c) specify it within the response from ${error.endpoint.toString()}\n`,
    ].join(''))
  }}
</template>
