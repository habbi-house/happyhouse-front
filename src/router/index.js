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
    path: "/mypage",
    name: "mypage",
    component: () => import("@/views/MypageView.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/SearchView.vue"),
  },
  {
    path: "/board",
    name: "board",
    redirect: "/board/list",
    component: () => import("@/views/BoardView.vue"),
    children: [
      {
        path: "list",
        name: "boardList",
        component: () => import("@/components/board/BoardList.vue"),
        meta: {
          breadCrumb: [{ text: "자유게시판" }],
        },
      },
      {
        path: "add",
        name: "boardAdd",
        component: () => import("@/components/board/BoardAdd.vue"),
        meta: {
          breadCrumb: [
            { text: "자유게시판", to: { name: "boardList" } },
            { text: "게시글 작성하기" },
          ],
        },
      },
      {
        path: ":articleno",
        name: "boardDetail",
        component: () => import("@/components/board/BoardDetail.vue"),
        meta: {
          breadCrumb(route) {
            const articleNo = route.params.articleno;
            return [
              { text: "자유게시판", to: { name: "boardList" } },
              { text: `${articleNo}번 게시글` },
            ];
          },
        },
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
