<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
    <v-card elevation="0" color="lightBgColor">
      <v-card-title style="font-size: 1.5rem">회원가입</v-card-title>
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
            rules="required|confirmed:confirmPwd"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="pwd"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :error-messages="errors"
              :success="valid"
              label="비밀번호"
              required
              @click:append="show1 = !show1"
            />
          </ValidationProvider>
          <!-- 비밀번호 확인 -->
          <ValidationProvider
            name="confirmPwd"
            rules="required"
            v-slot="{ errors, valid }"
            vid="confirmPwd"
          >
            <v-text-field
              v-model="confirmPwd"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              :error-messages="errors"
              :success="valid"
              label="비밀번호 확인"
              required
              @click:append="show2 = !show2"
            />
          </ValidationProvider>
          <!-- 이름 -->
          <ValidationProvider
            name="name"
            rules="required|min:3"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="name"
              :error-messages="errors"
              :success="valid"
              label="이름"
              required
            ></v-text-field>
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
          >회원가입</v-btn
        >
      </v-card-actions>
      <v-card-text>
        <v-divider></v-divider>
        <br />
        <v-btn
          color="kakao"
          width="100%"
          elevation="0"
          @click="kakaoLogin"
          class="font-weight-bold"
        >
          카카오로 로그인
        </v-btn>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
/* eslint-disable prettier/prettier */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions } from "vuex";

const userStore = "userStore";

export default {
  data() {
    return {
      email: "",
      pwd: "",
      name: "",
      confirmPwd: "",
      show1: false,
      show2: false,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    ...mapActions(userStore, ["signUp"]),
    async submit() {
      await this.signUp({
        email: this.email,
        password: this.pwd,
        name: this.name,
      });
      this.$router.push({ name: "signIn" });
    },
    kakaoLogin() {
      window.location.replace(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.VUE_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.VUE_APP_VUE_BASE_URL}/kakao&response_type=code`
      );
    },
  },
};
</script>

<style></style>
