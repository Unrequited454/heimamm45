<template>
  <div class="user-container">
    <!--头部 卡片区域 -->
    <el-card>
      <el-form :inline="true" :model="userForm" class="demo-form-inline" ref="userRef">
        <el-form-item label="用户名称" prop="eid">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="name">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="status">
          <el-select v-model="userForm.status" placeholder="请选择角色">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 主体 卡片区域 -->
    <el-card class="card-main">
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="用户名" width="180"></el-table-column>
        <el-table-column prop="name" label="电话" width="180"></el-table-column>
        <el-table-column prop="creater" label="邮箱"></el-table-column>
        <el-table-column prop="create_time" label="角色"></el-table-column>
        <el-table-column label="备注"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户表单
      userForm: {},
      // 用户数据列表
      userList: []
    }
  },
  methods: {},
  created() {}
}
</script>

<style lang="less">
.user-container {
  width: 100%;
  height: 100%;
  .card-main {
    margin-top: 19px;
  }
}
</style>
