<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
    <v-card elevation="0" color="lightBgColor">
      <v-card-title style="font-size: 1.5rem">로그인</v-card-title>
      <v-card-text>
        <v-form>
          <!-- 이메일 -->
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              :success="valid"
              label="이메일"
              required
            />
          </ValidationProvider>
          <!-- 비밀번호 -->
          <ValidationProvider
            name="pwd"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="pwd"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :error-messages="errors"
              :success="valid"
              label="비밀번호"
              required
              @click:append="show = !show"
            />
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions class="px-4">
        <v-btn
          color="primary"
          @click="handleSubmit(submit)"
          :disabled="invalid || !validated"
          width="100%"
          elevation="0"
          class="font-weight-bold"
          >로그인</v-btn
        >
      </v-card-actions>
      <v-card-text>
        <v-divider></v-divider>
        <br />
        <v-btn
          color="kakao"
          width="100%"
          elevation="0"
          @click="kakaoLoginBtn"
          class="font-weight-bold"
        >
          카카오톡으로 로그인
        </v-btn>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
/* eslint-disable */

import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions } from "vuex";

const userStore = "userStore";

export default {
  data() {
    return {
      email: "",
      pwd: "",
      show: false,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    ...mapActions(userStore, ["login"]),
    async submit() {
      await this.login({
        email: this.email,
        password: this.pwd,
      });
    },
    kakaoLoginBtn() {
      window.location.replace(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.VUE_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.VUE_APP_VUE_BASE_URL}/kakao&response_type=code`
      );
    },
  },
};
</script>

<style></style>
