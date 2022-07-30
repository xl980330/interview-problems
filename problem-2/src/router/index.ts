import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home/Home.vue')
  },
  { path: '/', redirect: { name: 'Home' } },
  {
    path: "/:catchAll(.*)", // 不识别的path自动匹配404
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
