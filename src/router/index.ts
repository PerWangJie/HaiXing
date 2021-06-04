import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/sopCheck',
    name: 'sopCheck',
    component: () => import('@/views/system/sopCheck.vue'),
  },
  {
    path: '/product',
    redirect: "/product",
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/system/product.vue'),
      },
      {
        path: '/productline',
        name: 'productline',
        component: () => import('@/views/system/productline.vue'),
      },
      {
        path: '/productline/addLine',
        name: 'addLine',
        component: () => import('@/views/system/line/addLine.vue'),
      },
      {
        path: '/orderManagement',
        name: 'orderManagement',
        component: () => import('@/views/system/orderManagement.vue'),
        children: [
          {
            path: '/orderManagement/onOrder',
            name: 'onOrder',
            component: () => import('@/views/system/order/onOrder.vue'),
          },
          {
            path: '/orderManagement/outOrder',
            name: 'outOrder',
            component: () => import('@/views/system/order/outOrder.vue'),
          }
        ]
      },
      {
        path: '/orderManagement/addOrder',
        name: 'addOrder',
        component: () => import('@/views/system/order/addOrder.vue'),
      },
      {
        path: '/faultRepair/addFault',
        name: 'addFault',
        component: () => import('@/views/system/fault/addFault.vue'),
      },
      {
        path: '/faultRepair',
        name: 'faultRepair',
        component: () => import('@/views/system/faultRepair.vue'),
      },
      {
        path: '/equipment',
        name: 'equipment',
        component: () => import('@/views/system/equipment.vue'),
      },
      {
        path: '/equipment/addEquipment',
        name: 'addEquipment',
        component: () => import('@/views/system/equipment/addEquipment.vue'),
      },
      {
        path: '/productGroup',
        name: 'productGroup',
        component: () => import('@/views/system/productGroup.vue'),
      },
      {
        path: '/productGroup/addGroup',
        name: 'addGroup',
        component: () => import('@/views/system/group/addGroup.vue'),
      },
      {
        path: '/classDefinition',
        name: 'classDefinition',
        component: () => import('@/views/system/classDefinition.vue'),
      },
      {
        path: '/classDefinition/addClass',
        name: 'addClass',
        component: () => import('@/views/system/class/addClass.vue'),
      },
      {
        path: '/classDefinition/checkClass',
        name: 'checkClass',
        component: () => import('@/views/system/class/checkClass.vue'),
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/system/order.vue'),
      },
      {
        path: '/callRecord',
        name: 'callRecord',
        component: () => import('@/views/system/callRecord.vue'),
      },
      {
        path: '/classCheck',
        name: 'classCheck',
        component: () => import('@/views/system/classCheck.vue'),
        children: [
          {
            path: '/classCheck/openClass',
            name: 'openClass',
            component: () => import('@/views/system/classes/openClass.vue'),
          },
          {
            path: '/classCheck/leaveClass',
            name: 'leaveClass',
            component: () => import('@/views/system/classes/leaveClass.vue'),
          },
          {
            path: '/classCheck/laidOff',
            name: 'laidOff',
            component: () => import('@/views/system/classes/laidOff.vue'),
          }
        ]
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
