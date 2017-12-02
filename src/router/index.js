import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const requireViewsAsync = name => resolve => require([`@/views/${name}.vue`],resolve) // eslint-disable-line
const requireComponentsAsync = name => resolve => require([`@/components/${name}.vue`],resolve)   // eslint-disable-line

const routes = [
  {
    path: '/',
    components: {
      alive: requireComponentsAsync('nav-bottom')
    },
    redirect: '/index',
    children: [
      {
        path: 'index',
        components: {
          alive: requireViewsAsync('tab/index')
        }
      }
    ]
  },
  {
    path: '/book/:id',
    components: {
      alive: requireViewsAsync('book/detail')
    }
  },
  {
    path: '/book/:id/chapter/:chapter_id',
    components: {
      reset: requireViewsAsync('book/reader')
    }
  },
  {
    path: '*',
    redirect: '/index'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
