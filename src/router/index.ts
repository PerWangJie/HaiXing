import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/',
    redirect: "/product",
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/system/product.vue'),
      },
      {
        path: '/today',
        name: 'today',
        component: () => import('@/views/system/today.vue'),
      },
      {
        path: '/yieldSearch',
        name: 'yieldSearch',
        component: () => import('@/views/system/yieldSearch.vue'),
      },
      {
        path: '/callRecord',
        name: 'callRecord',
        component: () => import('@/views/system/callRecord.vue'),
      },
      {
        path: '/stationRecord',
        name: 'stationRecord',
        component: () => import('@/views/system/stationRecord.vue'),
      },
      {
        path: '/sopCheck',
        name: 'sopCheck',
        component: () => import('@/views/system/sopCheck.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
