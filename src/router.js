import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import ContactPage from "./pages/ContactPage.vue";
import blogPage from "./pages/blogPage.vue";
import teamPage from "./pages/teamPage.vue";
import AdminDashboard from "./pages/AdminDashboard.vue";
import PageNotFound from "./pages/PageNotFound.vue";
import store from "./assets/store";

const routes = [
  { path: "/", component: HomePage },
  { path: "/home", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/contact", component: ContactPage },
  { path: "/blog", component: blogPage },
  { path: "/team", component: teamPage },
  {
    path: "/dashboard",
    component: AdminDashboard,
    meta: { middleware: "auth" },
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = require(`./middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(next, store);
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
