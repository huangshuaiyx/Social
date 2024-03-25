import Vue from "vue";
import VueRouter from "vue-router";
import { pageRouter,index } from "./page.js";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  ...index,
  ...pageRouter,
];

const router = new VueRouter({
  routes,
  mode: "hash",
});

export default router;
