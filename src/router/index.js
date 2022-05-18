import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: HomeView,
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: () => import("@/views/SignInView.vue"),
  },
  {
    path: "/sign-up",
    name: "signUp",
    component: () => import("@/views/SignUpView.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/SearchView.vue"),
  },
  {
    path: "/board",
    name: "board",
    redirect: "/board/boardlist",
    component: () => import("@/views/BoardView.vue"),
    children: [
      {
        path: "boardlist",
        name: "BoardList",
        component: () => import("@/components/board/BoardList.vue"),
      },
      {
        path: "add",
        name: "boardAdd",
        component: () => import("@/components/board/BoardAdd.vue"),
      },
      {
        path: ":articleno",
        name: "boardDetail",
        component: () => import("@/components/board/BoardDetail.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
