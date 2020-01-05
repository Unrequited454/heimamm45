<template>
  <div class="enterprise-container">
    <!--头部 卡片区域 -->
    <el-card>
      <el-form :inline="true" :model="enterPriseForm" class="demo-form-inline" ref="enterPriseRef">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="enterPriseForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="enterPriseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="enterPriseForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="enterPriseForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" @keyup.enter="search">搜索</el-button>
          <el-button @click="resetForm">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addEnterPrise">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 主体 卡片区域 -->
    <el-card class="card-main">
      <el-table :data="enterPriseList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="creater" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
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
      // 企业表单
      enterPriseForm: {
        name: '',
        page: 1,
        limit: 10,
        eid: '',
        username: '',
        status: ''
      },
      // 企业数据列表
      enterPriseList: []
    }
  },
  methods: {
    // 搜索
    search() {},
    // 清除
    resetForm() {
      this.$refs.enterPriseRef.resetFields()
    },
    // 新增企业
    addEnterPrise() {}
  },
  created() {}
}
</script>

<style lang="less">
.enterprise-container {
  width: 100%;
  height: 100%;
  .card-main {
    margin-top: 19px;
  }
}
</style>
