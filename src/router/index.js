import Vue from 'vue'
import VueRouter from 'vue-router'
// 组件-登录页
import login from '@/views/login/login'
// 组件-首页
import index from '@/views/index/index'
// 组件-学科
import subject from '@/views/index/subject/subject'
// 组件-企业
import enterprise from '@/views/index/enterprise/enterprise'
// 组件-题库
import question from '@/views/index/question/question'
// 组件-用户
import user from '@/views/index/user/user'
// 组件-数据
import chart from '@/views/index/chart/chart'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 登录页
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  // 首页
  {
    path: '/index',
    component: index,
    redirect: '/index/subject',
    children: [{
      path: '/index/subject',
      component: subject
    }, {
      path: '/index/enterprise',
      component: enterprise
    }, {
      path: '/index/question',
      component: question
    }, {
      path: '/index/user',
      component: user
    }, {
      path: '/index/chart',
      component: chart
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
