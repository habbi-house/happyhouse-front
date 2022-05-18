<template>
  <v-container app fill-height>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="11" sm="7" md="5">
        <sign-in-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignInForm from "@/components/SignInForm.vue";
export default {
  name: "SignInView",
  components: {
    SignInForm,
  },
};
</script>

<style></style>
>
