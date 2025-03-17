<script setup lang="ts">
import {
  ref,
  set,
  type Ref,
} from '@/library/vue/reactivity.ts';

import type {
  Branded,
} from '@/library/typeUtilities/Branded.ts';

import mockImage from '@/assets/stable-diffusion-image-output-mock.png';
import placeholderImage from '@/assets/stable-diffusion-image-output-placeholder.png';

type RelativeImagePath = Branded<string, 'RelativeImagePath'>;

const promptEntry = ref('');

const generatedImage: Ref<RelativeImagePath | null> = ref(null);

const generateImageFromText = () => {
  set(generatedImage, mockImage as RelativeImagePath);
};
</script>

<template>
  <section
    class="text-to-image-view"
  >
    <div class="input-section">
      <textarea
        v-model="promptEntry"
        placeholder="Enter prompt here"
        rows="5"
      />

      <br>

      <button
        @click="generateImageFromText"
      >
        Generate Image
      </button>
    </div>

    <br>

    <img
      :src="generatedImage ?? placeholderImage"
      alt="presented image"
      class="presented-image"
      :class="{
        'placeholder-image': (generatedImage === null),
      }"
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
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  >.presented-image {
    height: 100%;
    width: 100%;
  }

  >.placeholder-image {
    filter: grayscale(1);
    opacity: 0.5;
  }
}
</style>
