<template>
  <div class="user-container">
    <!--头部 卡片区域 -->
    <el-card>
      <el-form :inline="true" :model="userForm" class="demo-form-inline" ref="userRef">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="userForm.role_id" placeholder="请选择角色">
            <el-option label="管理员" value="2">管理员</el-option>
            <el-option label="老师" value="3">老师</el-option>
            <el-option label="学生" value="4">学生</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addUser">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 主体 卡片区域 -->
    <el-card class="card-main">
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="forbidden">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status===0?'启用':'禁用'}}</el-button>
            <el-button type="text" @click="removeUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userForm.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="userForm.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 新增用户对话框区域 -->
    <el-dialog center title="新增用户" :visible.sync="addDlVisible" :before-close="cancelAdd">
      <el-form ref="addUserRef" :model="addUserForm" :rules="addUserRul" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="addUserForm.role_id" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="addUserForm.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input type="textarea" v-model="addUserForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="ensureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userList, userStatus, userRemove, userAdd } from '@/api/user.js'
import { phoneCheck, emailCheck } from '@/utils/validator.js'
export default {
  data() {
    return {
      // 用户表单
      userForm: {
        // 昵称
        username: '',
        // 邮箱
        email: '',
        // 角色数字
        role_id: '',
        // 页码，默认为1
        page: 1,
        // 页尺寸,默认为10
        limit: 10
      },
      // 用户数据列表
      userList: [],
      // 用户数据列表总条数
      total: 0,
      // 添加用户对话框显示状态
      addDlVisible: false,
      // 添加用户表单
      addUserForm: {
        username: '',
        email: '',
        phone: '',
        role_id: '',
        status: '',
        remark: ''
      },
      // 新增用户表单规则验证
      addUserRul: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: emailCheck, trigger: 'change' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: phoneCheck, trigger: 'change' }],
        role_id: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 声明发送请求获取用户列表数据
    getUserList() {
      userList(this.userForm).then(res => {
        console.log('用户列表：', res)
        if (res.code === 200) {
          this.userList = res.data.items
          this.total = res.data.pagination.total
        }
      })
    },
    // 搜索按钮
    search() {
      this.userForm.page = 1
      this.getUserList()
    },
    // 清除按钮
    reset() {
      this.$refs.userRef.resetFields()
      this.getUserList()
    },
    // 新增用户按钮
    addUser() {
      this.addDlVisible = true
    },
    // 改变用户状态
    changeStatus(row) {
      userStatus(row.id).then(res => {
        if (res.code === 200) {
          this.$message.success('状态修改成功')
          this.getUserList()
        } else {
          return this.$message.error('状态修改失败')
        }
      })
    },
    // 删除用户
    async removeUser(row) {
      let confirmRes = await this.$confirm('是否永久删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmRes === 'confirm') {
        userRemove(row.id).then(res => {
          if (res.code === 200) {
            this.$message.success('删除用户成功')
            this.getUserList()
          } else {
            return this.$message.error('删除用户失败')
          }
        })
      } else {
        return this.$message.info('已取消删除用户')
      }
    },
    // 确定添加用户
    ensureAdd() {
      this.$refs.addUserRef.validate(valid => {
        if (!valid) {
          return this.$message.warning('请完善新增用户必填项')
        }
        userAdd(this.addUserForm).then(res => {
          console.log('新增用户结果:', res)
          if (res.code === 200) {
            this.$message.success('新增用户成功')
            this.getUserList()
            this.addDlVisible = false
            this.$refs.addUserRef.resetFields()
          } else {
            return this.$message.error(res.message)
          }
        })
      })
    },
    // 取消添加用户
    cancelAdd() {
      this.addDlVisible = false
    },
    // 分页-页尺寸改变触发
    handleSizeChange(newSize) {
      this.userForm.limit = newSize
      this.getUserList()
    },
    // 分页-页码改变触发
    handleCurrentChange(newPage) {
      this.userForm.page = newPage
      this.getUserList()
    }
  },
  created() {
    // 调用获取用户列表数据函数
    this.getUserList()
  }
}
</script>

<style lang="less">
.user-container {
  width: 100%;
  height: 100%;
  .card-main {
    margin-top: 19px;
    .forbidden {
      color: red;
    }
  }
  .el-dialog {
    width: 478px;
    height: 558px;
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
  .pagination {
    width: 543px;
    height: 30px;
    margin: 30px auto 10px;
  }
}
</style>
