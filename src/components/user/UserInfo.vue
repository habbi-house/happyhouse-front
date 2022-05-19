<template>
  <v-container elevation="0" class="pa-0">
    <h2 class="mb-3">회원 정보</h2>
    <div class="mb-5 d-flex justify-center" width="100%">
      <v-img :src="src" max-width="128"></v-img>
    </div>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
      <v-form>
        <!-- 아이디 -->
        <ValidationProvider
          name="id"
          rules="required|min:4"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            v-model="user.id"
            :error-messages="errors"
            :success="editMode ? valid : false"
            label="아이디"
            required
            outlined
            dense
            :readonly="!editMode"
          />
        </ValidationProvider>
        <!-- 비밀번호 -->
        <ValidationProvider
          name="pwd"
          rules="required"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            v-model="user.pwd"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :error-messages="errors"
            :success="editMode ? valid : false"
            label="비밀번호"
            required
            outlined
            dense
            :readonly="!editMode"
            @click:append="show = !show"
          />
        </ValidationProvider>
        <!-- 이름 -->
        <ValidationProvider
          name="pwd"
          rules="required|min:3"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            v-model="user.name"
            :error-messages="errors"
            :success="editMode ? valid : false"
            label="이름"
            required
            outlined
            dense
            :readonly="!editMode"
          />
        </ValidationProvider>
        <!-- 이메일 -->
        <ValidationProvider
          name="email"
          rules="required|email"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            v-model="user.email"
            :error-messages="errors"
            :success="editMode ? valid : false"
            label="이메일"
            required
            outlined
            dense
            :readonly="!editMode"
          />
        </ValidationProvider>
      </v-form>
      <!-- Button -->
      <div class="d-flex justify-end">
        <div v-if="!editMode">
          <!-- TODO: OAuth 로그인 시, 정보 수정 막기 -->
          <v-btn
            @click="changeEdit"
            color="primary"
            class="white--text mr-3"
            elevation="0"
          >
            정보수정
          </v-btn>
          <v-btn
            @click="deleteUser"
            color="lightgray"
            class="white--text"
            elevation="0"
          >
            회원탈퇴
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            @click="handleSubmit(updateUser)"
            color="success"
            :disabled="invalid || !validated"
            class="white--text mr-3"
            elevation="0"
          >
            저장하기
          </v-btn>
          <v-btn
            @click="changeEdit"
            color="disabled"
            class="black--text"
            elevation="0"
          >
            취소하기
          </v-btn>
        </div>
      </div>
    </ValidationObserver>
  </v-container>
</template>

<script>
// import profileImg from "@/assets/anonymous.png";
import profileImg from "@/assets/kkekkuk.png";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      src: profileImg,
      user: this.$store.state.user,
      editMode: false,
      show: false,
    };
  },
  methods: {
    changeEdit() {
      this.editMode = !this.editMode;
    },
    updateUser() {
      alert("회원 정보 수정 호출");
      this.changeEdit();
    },
    deleteUser() {
      if (confirm("정말로 탈퇴하시겠습니까?")) {
        alert("탈퇴 요청 전송");
      }
      this.$route.push({ name: "/" });
    },
  },
};
</script>

<style></style>
