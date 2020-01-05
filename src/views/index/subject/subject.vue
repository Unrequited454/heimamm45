<template>
  <div class="subject-container">
    <!--头部 卡片区域 -->
    <el-card>
      <el-form :inline="true" :model="subjectForm" class="demo-form-inline" ref="subjectRef">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="subjectForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="subjectForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="subjectForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" @keyup.enter="search">搜索</el-button>
          <el-button @click="resetForm">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addSubject">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 主体 卡片区域 -->
    <el-card class="card-main">
      <el-table :data="subjectList" style="width: 100%">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="intro" label="简称"></el-table-column>
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
            <el-button type="text">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status==1?'启用': '禁用'}}</el-button>
            <el-button type="text" @click="removeSubject(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="subjectForm.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="subjectForm.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 添加学科对话框 -->
    <el-dialog
      center
      title="新增学科"
      :visible.sync="subjectDlVisible"
      :before-close="cancelAddSubject"
    >
      <el-form
        ref="addSubjectRef"
        :rules="addSubjectRul"
        :model="addSubjectForm"
        label-width="80px"
      >
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="addSubjectForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="addSubjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称">
          <el-input v-model="addSubjectForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介">
          <el-input v-model="addSubjectForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注">
          <el-input v-model="addSubjectForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddSubject">取 消</el-button>
        <el-button type="primary" @click="ensureAddSubject">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改学科对话框 -->
<!--     <el-dialog center title="新增学科" :visible.sync="editDlVisible" :before-close="cancelAddSubject">
      <el-form
        ref="editSubjectRef"
        :rules="editSubjectRul"
        :model="editSubjectForm"
        label-width="80px"
      >
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="addSubjectForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="addSubjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称">
          <el-input v-model="addSubjectForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介">
          <el-input v-model="addSubjectForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注">
          <el-input v-model="addSubjectForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddSubject">取 消</el-button>
        <el-button type="primary" @click="ensureAddSubject">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { subjectList, subjectAdd, subjectStatus, subjectRemove } from '@/api/subject.js'
export default {
  data() {
    return {
      // 学科对象
      subjectForm: {
        // 学科名称
        name: '',
        // 创建者用户名
        username: '',
        status: '',
        // 页码 默认为1
        page: 1,
        // 页尺寸 默认为10
        limit: 10,
        // 学科编号
        rid: ''
      },
      // 学科列表表格
      subjectList: [],
      // 学科列表总数量
      total: 0,
      // 新增学科对话框显示状态
      subjectDlVisible: false,
      // 新增学科对象请求参数
      addSubjectForm: {
        // 学科编号--必传
        rid: '',
        // 学科名称--必传
        name: '',
        // 学科简称
        short_name: '',
        // 学科简介
        intro: '',
        // 备注
        remark: ''
      },
      // 新增学科表单验证
      addSubjectRul: {
        rid: [{ required: true, message: '请输入学科编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入学科名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 发送请求获取学科列表数据函数
    getSubjectList() {
      subjectList(this.subjectForm).then(res => {
        console.log('学科列表数据', res)
        if (res.code !== 200) {
          return this.$message.warning('获取学科列表失败')
        }
        this.subjectList = res.data.items
        this.total = res.data.pagination.total
      })
    },
    // 搜索学科
    search() {
      console.log('搜索表单：', this.subjectForm)
      this.getSubjectList()
    },
    // 清除按钮
    resetForm() {
      // 重置表单
      // TODO:重置表单必须需要加prop
      this.$refs.subjectRef.resetFields()
      this.getSubjectList()
    },
    // 新增学科
    addSubject() {
      this.subjectDlVisible = true
    },
    // 取消新增学科取消按钮
    cancelAddSubject() {
      this.subjectDlVisible = false
      this.$refs.addSubjectRef.resetFields()
    },
    // 确认新增学科
    ensureAddSubject() {
      this.$refs.addSubjectRef.validate(valid => {
        if (!valid) {
          return this.$message.warning('请填写正确学科信息')
        }
        subjectAdd(this.addSubjectForm).then(res => {
          console.log('新增学科：', res)
          if (res.code === 200) {
            this.$message.success('新增学科成功')
            this.getSubjectList()
            this.subjectDlVisible = false
            this.$refs.addSubjectRef.resetFields()
          } else {
            this.$message.warning('新增学科失败')
          }
        })
      })
    },
    // 改变状态
    changeStatus(row) {
      console.log('获取行数据id', row.id)
      subjectStatus(row.id).then(res => {
        console.log('状态改变：', res)
        if (res.code !== 200) {
          return this.$message.warning('状态改变失败')
        }
        this.$message.success('状态修改成功')
        this.getSubjectList()
      })
    },
    // 删除学科
    async removeSubject(row) {
      let confirmRes = await this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmRes === 'confirm') {
        subjectRemove(row.id).then(res => {
          console.log('删除学科：', res)
          if (res.code !== 200) {
            return this.$message.warning('删除失败')
          }
          this.$message.success('删除成功')
          this.getSubjectList()
        })
      } else {
        this.$message.info('删除已取消')
      }
    },
    // 页码尺寸改变触发
    handleSizeChange(newSize) {
      this.subjectForm.limit = newSize
    },
    // 页码改变触发
    handleCurrentChange(newPage) {
      this.subjectForm.page = newPage
    }
  },
  created() {
    // 调用请求学科数据函数
    this.getSubjectList()
  }
}
</script>

<style lang="less">
.subject-container {
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
