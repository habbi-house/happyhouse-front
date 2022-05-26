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
            :class="isDark ? 'black--text' : 'white--text'"
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
            color="lightgray"
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { SHOW_MESSAGE } from "@/store/mutation-types";

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
    ...mapState(["isDark"]),
    ...mapState(userStore, ["user"]),
    ...mapGetters(userStore, ["isLogin", "isKakao"]),
  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapMutations([SHOW_MESSAGE]),
    ...mapActions(userStore, ["withdrawUser", "updateUser"]),
    changeEdit() {
      this.editMode = !this.editMode;
    },
    async editUser() {
      await this.updateUser(this.user).then(({ status, msg }) => {
        this.SHOW_MESSAGE({
          text: msg,
          color: status === 200 ? "success" : "error",
          icon:
            status === 200 ? "mdi-check-circle-outline" : "mdi-alert-outline",
        });
      });
      this.changeEdit();
    },
    async deleteUser() {
      if (confirm("정말로 탈퇴하시겠습니까?")) {
        await this.withdrawUser(this.user.no).then(({ status, msg }) => {
          this.SHOW_MESSAGE({
            text: msg,
            color: status === 200 ? "success" : "error",
            icon:
              status === 200 ? "mdi-check-circle-outline" : "mdi-alert-outline",
          });
          if (status === 200) {
            this.$router.push("/");
          }
        });
      }
    },
    checkLogin() {
      if (!this.isLogin) {
        // alert("로그인 후에 이용해 주세요.");
        this.SHOW_MESSAGE({
          text: "로그인 후 이용해주세요.",
          color: "error",
          icon: "mdi-alert-outline",
        });
        this.$router.push({ name: "signIn" });
      }
    },
    // changePassword() {},
  },
};
</script>

<style></style>
