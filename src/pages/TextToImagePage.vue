<script setup lang="ts">
import {
  ref,
  set,
  type Ref,
} from '@/library/vue/reactivity.ts';
import {
  useStatefulProcess,
} from '@/library/vue/statefulProcess.ts';

import type {
  Branded,
} from '@/library/typeUtilities/Branded.ts';
import {
  cloneOf,
} from '@/library/utilitiesByType/reference.ts';

import mockImage from '@/assets/stable-diffusion-image-output-mock.png';
import placeholderImage from '@/assets/stable-diffusion-image-output-placeholder.png';
import type ImageGenerationPrompt from '@/models/ImageGenerationPrompt.ts';

type RelativeImagePath = Branded<string, 'RelativeImagePath'>;

const MockClient = {
  async tryToGenerateImage(): Promise<RelativeImagePath> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockImage as RelativeImagePath);
      }, 1000);
    });
  },
};

const defaultPrompt: ImageGenerationPrompt = {
  positive: 'a cat under the snow with blue eyes, covered by snow, cinematic style, medium shot, professional photo, animal',
  negative: 'Watermark, blurry, over-saturated, low resolution, pollution',
};

const promptEntry: Ref<ImageGenerationPrompt> = ref(cloneOf(defaultPrompt));

const generatedImage: Ref<RelativeImagePath | null> = ref(null);

const imageGeneration = useStatefulProcess(async () => {
  const newImage = await MockClient.tryToGenerateImage();
  set(generatedImage, newImage);
});
</script>

<template>
  <section
    class="text-to-image-view"
  >
    <div class="input-section">
      <label
        for="prompt_positive"
      >
        Prompt
      </label>
      <textarea
        id="prompt_positive"
        v-model="promptEntry.positive"
        placeholder="Enter prompt here"
        rows="5"
      />

      <br>

      <label
        for="prompt_negative"
      >
        Negative prompt
      </label>
      <textarea
        id="prompt_negative"
        v-model="promptEntry.negative"
        placeholder="Enter negative prompt here"
        rows="5"
      />

      <br>

      <button
        @click="imageGeneration.try"
        :disabled="imageGeneration.isInProgress"
      >
        {{
          imageGeneration.isInProgress
            ? 'Generating Image...'
            : 'Generate Image'
        }}
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
