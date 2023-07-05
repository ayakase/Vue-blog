import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/search",
    name: "post",
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/DetailView.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserPosts.vue"),
  },
  {
    path: "/date",
    name: "date",
    component: () => import("../views/DateView.vue"),
  },
  {
    path: "/tags",
    name: "tags",
    component: () => import("../views/TagsView.vue"),
  },
  {
    path: "/series",
    name: "series",
    component: () => import("../views/SeriesView.vue"),
  },
  {
    path: "/eachseries",
    name: "eachseries",
    component: () => import("../views/EachSeries.vue"),
  },
  {
    path: "/time",
    name: "time",
    component: () => import("../views/TimeSearch.vue"),
  },
  {
    path: "/tagsearch",
    name: "tagsearch",
    component: () => import("../views/TagSearch.vue"),
  },
  {
    path: "/author",
    name: "author",
    component: () => import("../views/AuthorView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
