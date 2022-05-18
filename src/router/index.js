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
        name: "boardlist",
        component: () => import("@/components/board/BoardList.vue"),
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
