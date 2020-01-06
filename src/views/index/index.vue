<template>
  <div class="index-container">
    <el-container>
      <el-header>
        <div class="title-con">
          <span class="icon" @click="collapse">
            <i class="el-icon-s-operation"></i>
          </span>
          <img class="logo" src="../../assets/logo_b.png" alt />
          <span class="title-desc">黑马面面</span>
        </div>
        <div class="user-info">
          <img class="avatay" :src="userInfo.avatar" alt />
          <span class="info">{{userInfo.username}}，你好</span>
          <el-button type="primary" size="small" @click="logoutBtn">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse?'64px':'201px'">
          <el-menu
            :collapse-transition="false"
            :collapse="isCollapse"
            default-active="subject"
            class="el-menu-vertical-demo"
            router
          >
            <el-menu-item index="chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据预览</span>
            </el-menu-item>
            <el-menu-item index="user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="enterprise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { removeToken } from '@/utils/token.js'
import { logout, userinfo } from '@/api/login.js'
export default {
  data() {
    return {
      // 侧边栏是否折叠
      isCollapse: false
    }
  },
  methods: {
    // 退出登录
    async logoutBtn() {
      let confirmRes = await this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmRes)
      if (confirmRes !== 'confirm') {
        return this.$message.info('已取消退出登录')
      }
      logout().then(res => {
        console.log('退出登录:', res)
        if (res.code === 200) {
          this.$message.success('已退出登录')
          this.$router.push('/login')
          removeToken()
          this.$store.commit('setInfo', '')
        }
      })
    },
    // 获取用户信息
    getUserInfo() {
      userinfo().then(res => {
        console.log('用户信息：', res)
        if (res.code === 200) {
          this.$store.commit('setInfo', res.data)
          console.log(this.$store.state.userInfo)
        }
      })
    },
    // 侧边栏折叠切换
    collapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    // 处理用户信息
    userInfo() {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="less">
.index-container {
  width: 100%;
  height: 100%;
  // TODO:隐藏子盒子滚动条
  overflow: auto;
  // 头部样式
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    // 图标
    .icon {
      font-size: 32px;
    }
    .logo {
      width: 33px;
      height: 28px;
      margin: 0 11px 0 22px;
      vertical-align: bottom;
    }
    .title-desc {
      font-size: 22px;
      color: #49a1ff;
    }
    .avatay {
      width: 43px;
      height: 43px;
      border-radius: 50%;
    }
    .info {
      margin: 0 38px 0 9px;
      font-size: 14px;
      font-weight: 600;
      font-family: Microsoft YaHei;
      color: #636363;
    }
  }
  // 侧边栏样式
  .el-container {
    height: 100%;
    .el-aside {
      background-color: #fff;
      box-shadow: 0px 4px 5px 0px rgba(63, 63, 63, 0.35);
    }
  }
  .el-main {
    background-color: #e8e9ec;
  }
}
</style>
