import Vue from 'vue'
import Router from 'vue-router'
// import AuthGuard from './auth-guard'
import Home from '@/Pages/Home'
import Home2 from '@/Pages/Home2'
import Product from '@/components/Products/Product'
import NewProduct from '@/components/Products/NewProduct'
import ProductList from '@/components/Products/ProductList'
import Checkout from '@/components/User/Checkout'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import fb from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home2',
      name: 'home2',
      component: Home2
    },
    {
      path: '/product/:id',
      props: true,
      name: 'product',
      component: Product
    },
    {
      path: '/list',
      name: 'list',
      component: ProductList,
      // beforeEnter: AuthGuard,
      meta: {
        auth: true
      }
    },
    {
      path: '/new',
      name: 'new',
      component: NewProduct,
      meta: {
        auth: true
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.auth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login?loginError=true')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
