<script setup lang="ts">
import {
  ref,
  set,
} from '@/library/vue/reactivity.ts';

import mockImage from '@/assets/stable-diffusion-image-output-mock.png';
import placeholderImage from '@/assets/stable-diffusion-image-output-placeholder.png';

const promptEntry = ref('');

const generatedImage = ref<string | null>(null);

const generateImageFromText = () => {
  set(generatedImage, mockImage);
};
</script>

<template>
  <section
    class="text-to-image-view"
  >
    <div class="input-section">
      <input
        v-model="promptEntry"
        placeholder="Enter prompt here"
      >

      <button
        @click="generateImageFromText"
      >
        Generate Image
      </button>
    </div>

    <img
      :src="generatedImage ?? placeholderImage"
      alt="presented image"
      class="presented-image"
    >
  </section>
</template>

<style scoped>
.text-to-image-view {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;

  >.input-section {
    display: grid;
    grid-template-columns: 67% 33%;
  }

  >.presented-image {
    height: 100%;
    width: 100%;
  }
}
</style>
