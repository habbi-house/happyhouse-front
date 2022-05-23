<template>
  <v-container elevation="0" class="pa-0">
    <h2 class="mb-3">회원 정보</h2>
    <div class="mb-5 d-flex justify-center" width="100%">
      <v-img :src="src" max-width="128"></v-img>
    </div>
    <ValidationObserver ref="obs" v-slot="{ invalid, handleSubmit }">
      <v-form>
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
            :readonly="true"
          />
        </ValidationProvider>
        <!-- 비밀번호 -->
        <ValidationProvider
          name="pwd"
          rules="required"
          v-slot="{ errors, valid }"
        >
          <v-text-field
            v-model="user.password"
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
      </v-form>
      <!-- Button -->
      <div class="d-flex justify-end" v-if="!isKakao">
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
            @click="handleSubmit(editUser)"
            color="green lighten1"
            :disabled="invalid"
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
import { mapActions, mapGetters, mapState } from "vuex";

const userStore = "userStore";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      src: profileImg,
      editMode: false,
      show: false,
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
    ...mapGetters(userStore, ["isLogin", "isKakao"]),
  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions(userStore, ["withdrawUser", "updateUser"]),
    changeEdit() {
      this.editMode = !this.editMode;
    },
    editUser() {
      this.updateUser(this.user);
      this.changeEdit();
    },
    async deleteUser() {
      if (confirm("정말로 탈퇴하시겠습니까?")) {
        await this.withdrawUser(this.user.no);
      }
      this.$router.push("/");
    },
    checkLogin() {
      if (!this.isLogin) {
        alert("로그인 후에 이용해 주세요.");
        this.$router.push({ name: "signIn" });
      }
    },
  },
};
</script>

<style></style>
