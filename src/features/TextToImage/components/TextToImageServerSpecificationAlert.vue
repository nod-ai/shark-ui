<script setup lang="ts">
import * as TextToImage from '@/features/TextToImage';

const given = defineProps<{
  error: TextToImage.Server.SpecificationError;
}>();

(() => {
  const userFacingMessage = [
    'No text-to-image server was specified!',
    'Either:',
    `a) supply it's corresponding environment variable named \`${given.error.environmentKey}\` and rebuild`,
    `b) specify it within ${given.error.file.toString()}`,
    'OR',
    `c) specify it within the response from ${given.error.endpoint.toString()}`,
  ].join('\n');

  return given.error.throwAnyway(userFacingMessage);
})();
</script>
