<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
    <v-card elevation="0">
      <v-card-title style="font-size: 1.5rem">로그인</v-card-title>
      <v-card-text>
        <v-form>
          <!-- 아이디 -->
          <ValidationProvider
            name="id"
            rules="required"
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
          >로그인</v-btn
        >
      </v-card-actions>
      <v-card-text>
        <v-divider></v-divider>
        <br />
        <v-btn color="kakao" width="100%" elevation="0" @click="kakaoLoginBtn">
          카카오톡으로 로그인
        </v-btn>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  data() {
    return {
      id: "",
      pwd: "",
      show: false,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    submit() {
      console.log("Success to submit!");
    },
    /* eslint-disable */
    kakaoLoginBtn() {
      window.location.replace(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.VUE_APP_KAKAOMAP_KEY}&redirect_uri=http://localhost:8080/kakao&response_type=code`
      );
    },
  },
};
</script>

<style></style>
