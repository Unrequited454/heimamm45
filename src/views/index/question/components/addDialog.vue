<template>
  <div class="add-question">
    <el-dialog
      title="新增试题"
      :visible.sync="$parent.addDlvisible"
      width="100%"
      top="0"
      center
      :before-close="cancalAdd"
    >
      <!-- 表单区域 -->
      <el-form
        ref="addQuestionRef"
        :model="addQuestionForm"
        :rules="addQuestionRul"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="学科" prop="subject">
          <el-select v-model="addQuestionForm.subject" placeholder="请选择学科">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="addQuestionForm.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="addQuestionForm.enterprise" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            v-model="selectedOptions"
            :options="cityOptions"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="addQuestionForm.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度">
          <el-radio-group v-model="addQuestionForm.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider></el-divider>
        <!-- 试题标题区域 -->
        <el-form-item label="试题标题" prop="title">
          <quill-editor v-model="addQuestionForm.title" ref="myQuillEditor"></quill-editor>
        </el-form-item>
        <!-- 单选区域 -->
        <el-form-item label="单选">
          <el-checkbox-group v-model="addQuestionForm">
            <div class="raido-box">
              <el-checkbox label="A"></el-checkbox>
              <el-input v-model="addQuestionForm" placeholder></el-input>
              <el-upload
                class="avatar-uploader"
                action="uploadAction"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <el-checkbox label="B"></el-checkbox>
            <el-checkbox label="C"></el-checkbox>
            <el-checkbox label="D"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-divider></el-divider>
        <!-- 视频上传区域 -->
        <el-form-item label="解析视频">
          <el-upload
            class="upload-demo"
            action="uploadAction"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-divider></el-divider>
        <!-- 答案解析区域 -->
        <el-form-item label="答案解析">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <!-- 试题备注区域 -->
        <el-form-item label="试题解析">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancalAdd">取 消</el-button>
        <el-button type="primary" @click="$parent.addDlvisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入element-china-area-data
import { regionDataPlus } from 'element-china-area-data'
export default {
  name: 'add-question',
  data() {
    return {
      // 新增试题表单对象
      addQuestionForm: {},
      // 表单验证规则
      addQuestionRul: {
        // 学科
        subject: [{ required: true, message: '请选择学科', trigger: 'blur' }],
        // 阶段
        step: [{ required: true, message: '请选择阶段', trigger: 'blur' }],
        // 企业
        enterprise: [{ required: true, message: '请选择企业', trigger: 'blur' }],
        // 城市
        city: [{ required: true, message: '请选择城市', trigger: 'blur' }],
        // 题型
        type: [{ required: true, message: '请选择题型', trigger: 'blur' }],
        // 难度
        difficulty: [{ required: true, message: '请选择难度', trigger: 'blur' }],
        // 标题
        title: [{ required: true, message: '请输入试题标题', trigger: 'blur' }]
      },
      // 级联选择器城市数据源
      cityOptions: regionDataPlus,
      // 级联选择器城市绑定数据
      selectedOptions: [],
      // 单选区域图像上传路径
      uploadAction: '',
      // 头像预览路径
      imageUrl: ''
    }
  },
  methods: {
    // 取消新增试题
    cancalAdd() {
      this.$parent.addDlvisible = false
    },
    // 城市级联选择器选线改变时触发
    handleChange() {},
    // 单选区域图像上传成功触发
    handleAvatarSuccess(res, file) {},
    // 单选区域图像上传之前触发
    beforeAvatarUpload(res, file) {},
    // 视频上传之前删除触发
    beforeRemove() {}
  },
  created() {}
}
</script>

<style lang="less">
.add-question {
  width: 100%;
  height: 100%;
  // 对话框头部样式
  .el-dialog__header {
    color: #fff;
    background: linear-gradient(225deg, rgba(1, 198, 250, 1), rgba(20, 147, 250, 1));
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__title {
    color: #fff;
  }
  // 让表单居中
  .el-dialog__body {
    display: flex;
    justify-content: center;
  }
  // 下拉选项框样式
  .el-input {
    width: 364px;
  }
  // 上传头像样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.el-cascader-panel {
  height: 200px;
}
</style>
