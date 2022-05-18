<template>
  <v-container class="elevation-1">
    <v-row justify="center">
      <h2>회원 정보</h2>
    </v-row>
    <v-row justify="center">
      <v-img :src="src" max-width="125" />
    </v-row>
    <v-row justify="center">
      <v-text-field
        label="id"
        required
        outlined
        maxlength="10"
        v-model="user.id"
        readonly
    /></v-row>
    <v-row>
      <v-text-field
        label="비밀번호"
        required
        outlined
        maxlength="10"
        v-model="user.password"
        :readonly="!editMode"
    /></v-row>
    <v-row>
      <v-text-field
        label="이름"
        required
        outlined
        maxlength="10"
        v-model="user.name"
        :readonly="!editMode"
    /></v-row>
    <v-row>
      <v-text-field
        label="이메일"
        required
        outlined
        maxlength="20"
        v-model="user.email"
        :readonly="!editMode"
    /></v-row>
    <v-row>
      <v-text-field
        label="핸드폰번호"
        required
        outlined
        maxlength="10"
        v-model="user.phone"
        :readonly="!editMode"
    /></v-row>
    <v-row justify="center">
      <v-btn
        @click="changeEdit"
        color="primary"
        class="white--text"
        v-if="!editMode"
      >
        정보수정
      </v-btn>
      <v-btn
        @click="deleteUser"
        color="red"
        class="white--text"
        v-if="!editMode"
      >
        회원탈퇴
      </v-btn>
      <v-btn
        @click="updateUser"
        color="blue"
        class="white--text"
        v-if="editMode"
      >
        저장하기
      </v-btn>
      <v-btn
        @click="changeEdit"
        color="yellow"
        class="black--text"
        v-if="editMode"
      >
        취소하기
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import profileImg from "@/assets/anonymous.png";

export default {
  data() {
    return {
      src: profileImg,
      user: {
        name: "김테스트",
        id: "testID",
        password: "q1w2e3r4",
        email: "test@ssafy.com",
        phone: "010-1234-5678",
      },
      editMode: false,
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
    },
  },
};
</script>

<style></style>
