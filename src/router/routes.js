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

// 配置meta字段
export default [
  // 登录页
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login,
    meta: {
      roles: ['超级管理员', '管理员', '老师', '学生']
    }
  },
  // 首页
  {
    path: '/index',
    component: index,
    redirect: '/index/subject',
    // 嵌套路由
    children: [{
      // 学科列表
      path: '/index/subject',
      component: subject,
      meta: {
        title: '学科列表',
        icon: 'el-icon-office-building',
        fullPath: '/index/subject',
        roles: ['超级管理员', '管理员', '老师']
      }
    }, {
      // 企业列表
      path: '/index/enterprise',
      component: enterprise,
      meta: {
        title: '企业列表',
        icon: 'el-icon-notebook-2',
        fullPath: '/index/enterprise',
        roles: ['超级管理员', '管理员', '老师']
      }
    }, {
      // 题库列表
      path: '/index/question',
      component: question,
      meta: {
        title: '题库列表',
        icon: 'el-icon-edit-outline',
        fullPath: '/index/question',
        roles: ['超级管理员', '管理员', '老师', '学生']
      }
    }, {
      // 用户列表
      path: '/index/user',
      component: user,
      meta: {
        title: '用户列表',
        icon: 'el-icon-use',
        fullPath: '/index/user',
        roles: ['超级管理员', '管理员']
      }
    }, {
      // 数据概述
      path: '/index/chart',
      component: chart,
      meta: {
        title: '数据概述',
        icon: 'el-icon-pie-chart',
        fullPath: '/index/chart',
        roles: ['超级管理员', '管理员', '老师']
      }
    }]
  }
]
