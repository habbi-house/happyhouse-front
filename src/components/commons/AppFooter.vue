<template>
  <v-footer app color="white" class="pa-0" absolute>
    <v-container class="pa-0">
      <v-card flat tile width="100%">
        <v-card-text class="d-flex mb-3 px-5">
          <div>
            <div class="d-flex align-center mb-4">
              <v-icon small class="mr-2">mdi-robot-happy</v-icon>
              <span class="font-weight-bold">햅피하우스</span>
            </div>
            <div>
              <router-link :to="{ name: 'search' }" class="d-block mb-1">
                실거래가 조회
              </router-link>
              <router-link :to="{ name: 'board' }" class="d-block mb-1">
                자유 게시판
              </router-link>
              <router-link :to="{ name: 'camera' }" class="d-block mb-1">
                Are You 햅피?
              </router-link>
            </div>
          </div>
          <v-spacer></v-spacer>
          <div>
            <span class="font-weight-bold">Contacts</span>
            <div class="mt-4 mb-1">
              Phone : <span class="primary--text">010-1234-5678</span>
            </div>
            <div class="mb-1">
              Email : <span class="primary--text">happy@unhappy.com</span>
            </div>
            <div class="mb-1">
              Address :
              <span class="primary--text"
                >212, Teheran-ro, Gangnam-gu, Seoul</span
              >
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="d-flex justify-space-between mb-5">
          <div class="lightgray--text">
            &copy; Copyright 2022 햅피하우스. All rights reserved.
          </div>
          <div>
            <v-icon color="lightgray">mdi-twitter</v-icon>&nbsp;&nbsp;
            <a href="https://www.instagram.com/ddo_noniii">
              <v-icon color="lightgray">mdi-instagram</v-icon> </a
            >&nbsp;&nbsp;
            <v-icon color="lightgray">mdi-facebook</v-icon>&nbsp;&nbsp;
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-footer>
</template>

<script>
export default {};
</script>

<style scoped></style>
