<template>
  <v-container app fill-height>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="11" sm="7" md="5">
        <sign-up-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";

export default {
  name: "SignUpView",
  components: {
    SignUpForm,
  },
};
</script>

<style></style>
