<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
    <v-card elevation="0">
      <v-card-title style="font-size: 1.5rem">회원가입</v-card-title>
      <v-card-text>
        <v-form>
          <!-- 아이디 -->
          <ValidationProvider
            name="id"
            rules="required|min:4"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="id"
              :error-messages="errors"
              :success="valid"
              label="아이디"
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
        </v-form>
      </v-card-text>
      <v-card-actions class="px-4">
        <v-btn
          color="primary"
          @click="handleSubmit(submit)"
          :disabled="invalid || !validated"
          width="100%"
          elevation="0"
          >회원가입</v-btn
        >
      </v-card-actions>
      <v-card-text>
        <v-divider></v-divider>
        <br />
        <v-btn color="kakao" width="100%" elevation="0" @click="kakaoLogin">
          카카오로 로그인
        </v-btn>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
/* eslint-disable prettier/prettier */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { signUp } from "@/components/api/user.js";

export default {
  data() {
    return {
      id: "",
      pwd: "",
      name: "",
      email: "",
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
    async submit() {
      let user = {
        id: this.id,
        password: this.pwd,
        name: this.name,
        email: this.email,
      };
      await signUp(
        user,
        ({ data, status }) => {
          if (status === 200) {
            alert(data);
          }
        },
        ({ response }) => {
          alert(response.data);
        }
      );
      this.$router.push({ name: "signIn" });
    },
    kakaoLogin() {
      window.location.replace(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.VUE_APP_KAKAOMAP_KEY}&redirect_uri=${process.env.VUE_APP_API_BASE_URL}&response_type=code`
      );
    },
  },
};
</script>

<style></style>
