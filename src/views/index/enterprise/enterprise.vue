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
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else class="forbidden">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editEnterprise(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status===1?'启用':'禁用'}}</el-button>
            <el-button type="text" @click="removeEnterprise(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="enterPriseForm.page"
          :page-sizes="[5, 8, 15, 20]"
          :page-size="enterPriseForm.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 新增企业对话框 -->
    <el-dialog center title="新增企业" :visible.sync="addDlVisible" :before-close="cancalAdd">
      <el-form
        ref="addEnterpriseRef"
        :rules="addEnterpriseRul"
        :model="addEnterpriseForm"
        label-width="80px"
      >
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="addEnterpriseForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="addEnterpriseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="addEnterpriseForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input type="textarea" v-model="addEnterpriseForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="addEnterpriseForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancalAdd">取 消</el-button>
        <el-button type="primary" @click="ensureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { enterpriseList, enterpriseAdd, enterpriseStatus, enterpriseRemove } from '@/api/enterprise'
export default {
  data() {
    return {
      // 企业表单
      enterPriseForm: {
        name: '',
        page: 1,
        limit: 8,
        eid: '',
        username: '',
        status: ''
      },
      // 企业数据列表
      enterPriseList: [],
      // 企业列表总条数
      total: 0,
      // 新增企业对话框显示状态
      addDlVisible: false,
      // 新增企业请求参数对象
      addEnterpriseForm: {
        // 企业编号
        eid: '',
        // 企业名称
        name: '',
        // 企业简称
        short_name: '',
        // 企业简介
        intro: '',
        // 备注
        remark: ''
      },
      // 新增企业表单验证
      addEnterpriseRul: {
        eid: [{ required: true, message: '请输入企业编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        short_name: [{ required: true, message: '请输入企业简介', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 声明请求企业列表数据函数
    getEnterpriseList() {
      enterpriseList(this.enterPriseForm).then(res => {
        console.log('企业列表：', res)
        if (res.code === 200) {
          this.enterPriseList = res.data.items
          this.total = res.data.pagination.total
        }
      })
    },
    // 搜索
    search() {
      this.getEnterpriseList()
    },
    // 清除
    resetForm() {
      this.$refs.enterPriseRef.resetFields()
      this.getEnterpriseList()
    },
    // 新增企业
    addEnterPrise() {
      this.addDlVisible = true
    },
    // 取消新增企业
    cancalAdd() {
      this.addDlVisible = false
    },
    // 确定新增企业
    ensureAdd() {
      this.$refs.addEnterpriseRef.validate(valid => {
        if (!valid) {
          return this.$message.warning('请填写完整企业信息')
        }
        enterpriseAdd(this.addEnterpriseForm).then(res => {
          console.log('添加企业：', res)
          if (res.code === 200) {
            this.addDlVisible = false
            this.$message.success('企业新增成功')
            this.getEnterpriseList()
            this.$refs.addEnterpriseRef.resetFields()
          } else {
            return this.$message.warning('企业新增失败')
          }
        })
      })
    },
    // 编辑企业
    editEnterprise(row) {},
    // 修改企业状态
    changeStatus(row) {
      enterpriseStatus(row.id).then(res => {
        console.log('企业状态修改：', res)
        if (res.code === 200) {
          this.$message.success('状态修改成功')
          this.getEnterpriseList()
        } else {
          return this.$message.error('状态修改失败')
        }
      })
    },
    // 删除企业
    async removeEnterprise(row) {
      let confirmRes = await this.$confirm('此操作将永久删除该企业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmRes === 'confirm') {
        enterpriseRemove(row.id).then(res => {
          console.log('删除企业：', res)
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getEnterpriseList()
          } else {
            return this.$message.error('删除失败')
          }
        })
      } else {
        return this.$message.info('已取消删除企业')
      }
    },
    // 分页-页码尺寸改变时触发
    handleSizeChange(newSize) {
      this.enterPriseForm.limit = newSize
      this.getEnterpriseList()
    },
    // 分页-当前页码改变时触发
    handleCurrentChange(newPage) {
      this.enterPriseForm.page = newPage
      this.getEnterpriseList()
    }
  },
  created() {
    this.getEnterpriseList()
  }
}
</script>

<style lang="less">
.enterprise-container {
  width: 100%;
  height: 100%;
  .card-main {
    margin-top: 19px;
  }
  .pagination {
    width: 543px;
    height: 30px;
    margin: 30px auto 10px;
  }
  .el-dialog {
    width: 600px;
    height: 508px;
    // 顶部颜色
    .el-dialog__header {
      color: #fff;
      background: linear-gradient(225deg, rgba(1, 198, 250, 1), rgba(20, 147, 250, 1));
    }
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .forbidden {
    color: red;
  }
}
</style>
