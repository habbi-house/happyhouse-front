<template>
  <v-snackbar
    shaped
    text
    timeout="3000"
    right
    top
    :color="color"
    v-model="show"
    class="mb-1 mr-1"
  >
    <v-icon :color="color" left dense>{{ icon }}</v-icon>
    <strong>{{ text }}</strong>
  </v-snackbar>
</template>

<script>
import { SHOW_MESSAGE } from "@/store/mutation-types";
export default {
  name: "SnackBar",
  data() {
    return {
      show: false,
      color: "",
      text: "",
      icon: "",
      timeout: 0,
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === SHOW_MESSAGE) {
        this.timeout = 3000;
        this.show = true;
        this.text = state.text;
        this.color = state.color;
        this.icon = state.icon;
      }
    });
  },
};
</script>

<style></style>
