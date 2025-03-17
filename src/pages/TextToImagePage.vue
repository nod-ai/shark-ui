<script setup lang="ts">
import {
  ref,
  set,
} from '@/library/vue/reactivity.ts';

import placeholderImage from '@/assets/logo.svg';
import exampleOutputImage from '@/assets/stable-diffusion-example-output-image.png';

const promptEntry = ref('');

const presentableImage = ref<string | null>(placeholderImage);

const generateImageFromText = () => {
  set(presentableImage, exampleOutputImage);
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
      v-if="presentableImage !== null"
      :src="presentableImage"
      alt="generated image"
      class="generated-image"
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

  >.generated-image {
    height: 100%;
    width: 100%;
  }
}
</style>
