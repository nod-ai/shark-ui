<script setup lang="ts">
import exampleOutputImage from '@/assets/stable-diffusion-example-output-image.png';
import placeholderImage from '@/assets/logo.svg';

import { ref } from 'vue';

const inputText = ref('');

const presentableImage = ref<string | null>(placeholderImage);

const generateImageFromText = () => {
  presentableImage.value = exampleOutputImage;
};
</script>

<template>
  <section
    class="text-to-image-view"
  >
    <row>
      <column col="6">
        <input
          v-model="inputText"
          placeholder="Enter text here"
        >
      </column>

      <column col="6">
        <button
          @click="generateImageFromText"
        >
          Generate
        </button>
      </column>
    </row>

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

  .generated-image {
    height: 100%;
    width: 100%;
  }
}
</style>
