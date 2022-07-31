import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from "@/pages/home/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
