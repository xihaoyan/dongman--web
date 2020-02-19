<template>
  <div id="addlist" v-loading.fullscreen="loading">
    <Headerh></Headerh>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
      <h3 style="color:#333;text-align:center;margin-bottom:20px;">{{title}}动漫</h3>
      <el-row>
        <el-col :span="6">
          <el-form-item label="动漫封面" prop="img">
            <el-upload
              name="avator"
              class="avatar-uploader"
              action="/api/file/uploadSingle"
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
      <div class="title">动漫章节
        <el-button size="small" type="primary" @click="addGraph" icon="el-icon-plus">新增章节</el-button>
      </div>
      <el-table
        :data="graphsData"
        border
        style="width: 100%"
        size="small"
      >
        <el-table-column
          prop="num"
          label="第几章"
          width="180">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.num"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="动漫名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="images"
          label="章节文件">
          <template slot-scope="scope">
            <div>
              <!-- 上传文件：动画，仅可上传一个， 漫画，可上传多个 -->
              <el-upload
                class="upload-demo"
                action="/api/file/uploadMultiple"
                :show-file-list="false"
                :multiple="ruleForm.va_type == '1' ? false : true"
                :on-success="function (res, file) { return uploadFileSuccess(res, file, scope.$index)}"
              >
                <el-button size="small" type="text">上传文件</el-button>
              </el-upload>

              {{scope.row.images}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作"
        >
          <template slot-scope="scope">
            <div>
              <el-button size="small" type="text" @click="addGraph(scope.$index)">新增</el-button>
              <el-button size="small" type="text" @click="deleteGraph(scope.$index)">删除</el-button>
              <el-button size="small" type="text" @click="deleteFile(scope.$index)">清空文件</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item class="bths">
        <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Headerh from "../../components/Headerh"
export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        img: "",
        name: '2',
        type: '玄幻',
        auth: '3',
        desc: '4',
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
      graphsData: [],
      fileList: [],
      title: "新增",
      itemId: null,
    }
  },
  components: {
    Headerh
  },
  watch: {
    "$route": {
      handler(val) {
        if(val.params.id) {
          this.title = "修改";
          this.itemId = val.params.id;
          this.getInfoItem()
        }else{
          this.title = "新增";
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    sortJson(a, b) {
      return a.num - b.num;
    },
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if(!this.ruleForm.img) {
            this.$message.error("请上传封面图片");
            return false;
          }
          const ls = this.graphsData.every(item => {
            return item.num && item.name && item.images;
          })
          if(ls) {
            this.graphsData.sort(this.sortJson);
            if(this.title == "新增") {
              await this.$axios.post("/api/list/add", {
                img: this.ruleForm.img,
                name: this.ruleForm.name,
                type: this.ruleForm.type,
                auth: this.ruleForm.auth,
                desc: this.ruleForm.desc,
                status: this.ruleForm.status,
                va_type: this.ruleForm.va_type,
                graphs: JSON.stringify(this.graphsData),
                last_hua: this.graphsData[this.graphsData.length - 1].num
              });
            }else{
              await this.$axios.post("/api/list/update", {
                id: this.itemId,
                img: this.ruleForm.img,
                name: this.ruleForm.name,
                type: this.ruleForm.type,
                auth: this.ruleForm.auth,
                desc: this.ruleForm.desc,
                status: this.ruleForm.status,
                va_type: this.ruleForm.va_type,
                graphs: JSON.stringify(this.graphsData),
                last_hua: this.graphsData[this.graphsData.length - 1].num
              });
            }

            this.$message.success("提交成功")
            this.loading = false;
            this.$router.push("/manage")

          }else {
            this.$message.error("请完善章节信息");
            return false;
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      if(this.title == "新增") {
        this.$refs[formName].resetFields();
      }else {
        this.getInfoItem();
      }
    },
    // 上传封面
    handleAvatarSuccess(res, file) {
      this.ruleForm.img = res.data.data.url;
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
    uploadFileSuccess(res, file, index) {
      if(res.data.code == 0) {
        this.graphsData.forEach((item, i) => {
          if(index == i) {
            const lsarr = item.images ? item.images.split(",") : [];
            if(res.data.data.id) {
              lsarr.push(res.data.data.id);
            }
            console.log(lsarr, "333")
            item.images = lsarr.join(",");
          }
        })
      }
    },
    addGraph(index) {
      if(typeof index == "number") {
        this.graphsData.splice(index + 1, 0, {
          num: "",
          name: "",
          images: ""
        })
      }else {
        this.graphsData.push({
          num: "",
          name: "",
          images: ""
        })
      }
    },
    deleteGraph(index) {
      this.graphsData.splice(index, 1);
    },
    deleteFile(index) {
      this.graphsData.forEach((item, i) => {
        if(i == index) {
          item.images = "";
        }
      })
    },
    getInfoItem() {
      this.$axios.get("/api/list/getItem?id=" + this.itemId).then(res => {
        const data = res.data.data;
        this.ruleForm.img = data.img;
        this.ruleForm.name = data.name;
        this.ruleForm.type = data.type;
        this.ruleForm.auth = data.auth;
        this.ruleForm.desc = data.desc;
        this.ruleForm.status = data.status;
        this.ruleForm.va_type = data.va_type;
        this.graphsData = JSON.parse(data.graphs);
      })
    }
  }
}
</script>
<style lang="less" scope>
  #addlist{
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    overflow-y: auto;
    position: relative;
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
        border: 1px dashed #409EFF;
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
        .el-upload{
          display: inline-block;
        }
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
