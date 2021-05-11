import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/product",
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/product.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
