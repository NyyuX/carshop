import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0//这里指的是src/store/getters.js的roles
      // console.log(hasRoles)
      // 判断是否已经有roles了
      if (hasRoles) {
        next()// 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      } else {
        try {
          // get user info
          // await store.dispatch('user/getInfo')
          // next()
          // const roles = JSON.parse(localStorage.getItem('role'))
          // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // await store.dispatch('user/changeInit')
          // router.addRoutes(accessRoutes)

          //  在这里动态添加最后的通配路由，确保先有动态路由，再有通配路由，解决动态路由刷新会跳转到404问题
          // let lastRou = [{ path: '*', redirect: '/404' }]
          // router.addRoutes(lastRou)

          // 获取roles
          const { roles } = await store.dispatch('user/getInfo')//第一步

          // generate accessible routes map based on roles
          // 获取通过权限验证的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)//第二步
          // 更新加载路由
          router.options.routes = store.getters.permission_routes//第三步
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // console.log(store)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          Message.error('出现错误，请重新登录')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

