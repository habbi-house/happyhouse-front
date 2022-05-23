<template>
  <v-container class="px-0 pb-0" elevation="0">
    <v-slide-group class="pt-4" center-active show-arrows>
      <v-slide-item
        v-for="(img, idx) in imgs"
        :key="idx"
        v-slot="{ active, toggle }"
      >
        <v-card
          :style="active ? 'opacity: 100%' : 'opacity: 50%'"
          class="ma-4 overflow-hidden"
          height="230"
          width="330"
          @click="toggle"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-img :src="img.src" max-width="370"></v-img>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-container>
</template>

<script>
import SampleImg1 from "@/assets/sample.jpg";
import SampleImg2 from "@/assets/sample_2.jpg";
import SampleImg3 from "@/assets/sample_3.jpg";
import SampleImg4 from "@/assets/sample_4.jpg";
import SampleImg5 from "@/assets/sample_5.jpg";
import SampleImg6 from "@/assets/sample_6.jpg";
import SampleImg7 from "@/assets/sample_7.jpg";

export default {
  data() {
    return {
      imgs: [
        { src: SampleImg1 },
        { src: SampleImg2 },
        { src: SampleImg3 },
        { src: SampleImg4 },
        { src: SampleImg5 },
        { src: SampleImg6 },
        { src: SampleImg7 },
      ],
    };
  },
};
</script>

<style></style>
