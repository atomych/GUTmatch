import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import ErrorPage from "../pages/ErrorPage.vue";
import EntryPage from "../pages/EntryPage.vue";
import RegPage from "../pages/RegPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import PairsPage from "../pages/PairsPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserSettings from "../pages/UserSettings.vue";

const routes = [
  {
    path: "/",
    name: "auth",
    component: HomeView,
    children: [
      {
        path: "error",
        name: "err",
        component: ErrorPage,
      },
      {
        path: "entry",
        name: "entry",
        component: EntryPage,
      },
      {
        path: "reg",
        name: "reg",
        component: RegPage,
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    children: [
      {
        path: "profile",
        name: "profile",
        component: ProfilePage,
      },
      {
        path: "search",
        name: "search",
        component: SearchPage,
      },
      {
        path: "pairs",
        name: "pairs",
        component: PairsPage,
      },
      {
        path: "settings",
        name: "settings",
        component: UserSettings,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
