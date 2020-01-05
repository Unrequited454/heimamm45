<template>
  <div class="question-container">
    <!-- 头部 卡片区域 -->
    <el-card>
      <el-form :inline="true" :model="questionForm" class="demo-form-inline">
        <el-row>
          <el-col>
            <el-form-item label="学科">
              <el-select v-model="questionForm.region" placeholder="请选择学科">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="阶段">
              <el-select v-model="questionForm.region" placeholder="请选择阶段">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业">
              <el-select v-model="questionForm.region" placeholder="请选择企业">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题型">
              <el-select v-model="questionForm.region" placeholder="请选择题型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="难度">
              <el-select v-model="questionForm.region" placeholder="请选择难度">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="questionForm.user"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="questionForm.region" placeholder="请选择状态">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker v-model="questionForm.date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="标题">
              <el-input class="input-title"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">搜索</el-button>
              <el-button>清除</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="addQuestion">新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 主体 卡片区域 -->
    <el-card class="card-main">
      <el-table :data="questionList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="题目" width="180"></el-table-column>
        <el-table-column prop="name" label="学科、阶段" width="180"></el-table-column>
        <el-table-column prop="creater" label="题型"></el-table-column>
        <el-table-column prop="create_time" label="企业"></el-table-column>
        <el-table-column label="创建者"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="访问量"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
    <!-- 新增试题对话框组件 -->
    <add-question></add-question>
  </div>
</template>

<script>
// 导入新增试题组件
import addDialog from './components/addDialog.vue'
import { questionList } from '@/api/question.js'
export default {
  data() {
    return {
      // 题库表单
      questionForm: {
        // 题库名称
        title: '',
        // 学科id
        subject: 0
      },
      // 题库列表数据
      questionList: [],
      // 新增题目对话框显示状态
      addDlvisible: false
    }
  },
  methods: {
    // 声明发送请求题库数据函数
    getQuestionList() {
      questionList().then(res => {
        console.log('题库列表', res)
        if (res.code === 200) {
          this.questionList = res.data.items
        } else {
          return this.$message.error('获取题库列表失败')
        }
      })
    },
    // 新增题库按钮
    addQuestion() {
      this.addDlvisible = true
    }
  },
  created() {
    // 调用题库请求数据函数
    this.getQuestionList()
  },
  components: {
    'add-question': addDialog
  }
}
</script>

<style lang="less">
.question-container {
  width: 100%;
  height: 100%;
  .el-card {
    .el-form-item {
      margin-right: 30px;
    }
    .el-form-item__label {
      padding-right: 30px;
    }
    .el-input {
      width: 150px;
    }
    .input-title {
      width: 388px;
    }
  }
  .card-main {
    margin-top: 19px;
  }
}
</style>
