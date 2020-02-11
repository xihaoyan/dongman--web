<template>
  <div id="addlist" v-loading="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
      <el-row>
        <el-col :span="6">
          <el-form-item label="动漫封面" prop="img">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="18" >
          <el-form-item label="动漫名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="auth">
            <el-input v-model="ruleForm.auth"></el-input>
          </el-form-item>
          <el-form-item label="动漫状态" prop="status">
            <el-select v-model="ruleForm.status">
              <el-option label="完结" value="1"></el-option>
              <el-option label="连载" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" :rows="6"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="动漫类型" prop="va_type">
            <el-select v-model="ruleForm.va_type">
              <el-option label="视频" value="1"></el-option>
              <el-option label="漫画" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="动漫分类" prop="type">
            <el-select v-model="ruleForm.type">
              <el-option label="玄幻" value="玄幻"></el-option>
              <el-option label="校园" value="校园"></el-option>
              <el-option label="言情" value="言情"></el-option>
              <el-option label="爆笑" value="爆笑"></el-option>
              <el-option label="推理" value="推理"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">动漫章节</div>
      <el-table
        :data="graphsData"
        border
        style="width: 100%">
        <el-table-column
          prop="num"
          label="第几章"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="动漫名">
        </el-table-column>
        <el-table-column
          prop="images"
          label="章节文件">
          <template scope="scope">
            <div>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :show-file-list="false"
                multiple
                :on-exceed="handleExceed">
                <el-button size="small" type="text">上传文件</el-button>
              </el-upload>
              {{scope.row.images}}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item class="bths">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        img: "",
        name: '',
        type: '玄幻',
        auth: '',
        desc: '',
        status: '1',
        va_type: "1"
      },
      rules: {
        name: [
          { required: true, message: '请输入动漫名称', trigger: 'blur' }
        ],
        auth: [
          { required: true, message: '请输入动漫作者', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择动漫类别', trigger: 'change' }
        ],
        va_type: [
          { required: true, message: '请选择动漫类型', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择动漫状态', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写动漫描述', trigger: 'blur' }
        ]
      },
      graphsData: [
        {
          num: '2016-05-03',
          name: '王小虎',
          images: '上海市普陀区金沙江路 1518 弄'
        }, {
          num: '2016-05-02',
          name: '王小虎',
          images: '上海市普陀区金沙江路 1518 弄'
        }, {
          num: '2016-05-04',
          name: '王小虎',
          images: '上海市普陀区金沙江路 1518 弄'
        }, {
          num: '2016-05-01',
          name: '王小虎',
          images: '上海市普陀区金沙江路 1518 弄'
        }, {
          num: '2016-05-08',
          name: '王小虎',
          images: '上海市普陀区金沙江路 1518 弄'
        }, {
          num: '2016-05-06',
          name: '王小虎',
          images: '上海市普陀区金沙江路 1518 弄'
        }, {
          num: '2016-05-07',
          name: '王小虎',
          images: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      fileList: []
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 上传封面
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>
<style lang="less" scoped>
  #addlist{
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    overflow-y: auto;
    .el-form{
      width: 100%;
      box-sizing: border-box;
      background: rgba(255,255,255,.6);
      padding: 20px;
      .el-input,
      .el-select{
        width: 100%;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 210px;
        height: 280px;
        line-height: 280px;
        text-align: center;
      }
      .avatar {
        width: 210px;
        height: 280px;
        display: block;
      }
      .el-table {
        margin: 20px 0;
      }
      .el-form-item.bths{
        margin-top: 20px;
      }
      .el-form-item__label{
        // color: #fff;
        font-weight: 900;
      }

    }


  }

</style>
