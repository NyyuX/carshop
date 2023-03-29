import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Detail from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

];
export const asyncRoutes=[
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '数据大屏',
      component: () => import('@/views/admin/dashboard/index'),
      meta: { title: '数据大屏', icon: 'dashboard', roles: ['admin'] }
    }]
  },
  {
    path: '/equip',
    component: Layout,
    redirect: '/equip/table',
    name: '设备管理',
    meta: {
      title: '设备管理',
      icon: 'el-icon-bank-card'
      , roles: ['admin']
      //icon:'equip'
    },
    //alwaysShow: true,
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/admin/equip/table/index'),
        meta: {
          title: '设备列表',roles: ['admin']
        }
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('@/views/admin/equip/form/index'),
        meta: { title: '添加设备', roles: ['admin'] },
        // hidden: true
      },
    ]
  },

  {
    path: '/goods-table',
    component: Detail,
    children: [
      {
        path: 'goods-table',
        name: 'goods-table',
        component: () => import('@/views/admin/goods-table/index'),
        meta: { title: '商品管理', icon: 'goods-table', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/sales-reports',
    component: Detail,
    children: [
      {
        path: 'index',
        name: 'sales-reports',
        component: () => import('@/views/admin/sales-reports/index'),
        meta: { title: '销售统计', icon: 'form', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/ad',
    component: Layout,
    redirect: '/ad-table',
    children: [
      {
        path: 'index',
        name: 'ad-table',
        component: () => import('@/views/admin/ad/ad-table/index'),
        meta: { title: '广告管理', icon: 'ad-table', roles: ['admin'] }

      },
    ]
  },
  {
    path: '/admin',
    component: Detail,//换个布局自定义
    children: [
      {
        path: 'Details',
        name: 'goods-detail',
        component: () => import('@/views/admin/Details/goods-detail/goods-detail'),
        meta: { title:'商品详情' ,roles: ['admin']}
      },
    ]
  },
  {
    path: '/Details',
    component: Detail,
    children: [
      {
        path: 'Details',
        name: 'equip-detail',
        component: () => import('@/views/admin/Details/equip-detail/equip-detail'),
        meta: { title: '设备详情', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/ad-detail',
    component: Detail,
    children: [
      {
        path: 'Details',
        name: 'ad-detail',
        component: () => import('@/views/admin/Details/ad-detail/ad-detail'),
        meta: { title: '广告详情', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/ad',
    component: Detail,
    children: [
      {
        path: 'ad',
        name: 'ad-result',
        component: () => import('@/views/admin/ad/ad-result/ad-result'),
        meta: { title: '播放效果', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/ad',
    component: Detail,
    children: [
      {
        path: 'add',
        name: 'ad-add',
        component: () => import('@/views/admin/ad/add/index'),
        meta: { title: '添加广告', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/ad',
    component: Detail,
    children: [
      {
        path: 'add-empty',
        name: 'ad-empty',
        component: () => import('@/views/admin/ad/add-empty/empty'),
        meta: { title: '刷新广告页', roles: ['admin']}
      }
    ]
  },
  {
    path: '/orderdetail',
    component: Detail,
    children: [
      {
        path: 'orderdetail',
        name: 'orderform-detail',
        component: () => import('@/views/factory/orderdetail/index'),
        meta: { title: '订单详情', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/orderform',
    component: Detail,
    children: [
      {
        path: 'orderform',
        name: 'oderform',
        component: () => import('@/views/factory/orderform/index'),
        meta: { title: '订单列表', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/goodsadd',
    component: Detail,
    children: [
      {
        path: 'goodsadd',
        name: 'goodsadd',
        component: () => import('@/views/factory/goodsadd/goodsadd'),
        meta: { title: '商品添加', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/goodsform',
    component: Detail,
    children: [
      {
        path: 'goodsform',
        name: 'goodsform',
        component: () => import('@/views/factory/goodsform/index'),
        meta: { title: '商品列表', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/goodsempty',
    component: Detail,
    children: [
      {
        path: 'goodsempty',
        name: 'goodsempty',
        component: () => import('@/views/factory/goodsempty/empty'),
        meta: { title: '刷新广告页', roles: ['admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
