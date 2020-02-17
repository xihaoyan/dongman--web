<template>
  <div id="cRegister" v-loading = "loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h3>注册</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <p>已有账号，<router-link to="/login"><span>去登录</span></router-link></p>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        username: '43645',
        password: '5936870-368-3786'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$axios.post("/api/user/add", this.ruleForm).then(res => {
            if(res.data.data.code == 0) {
              this.$message.success("注册成功,即将跳转至登陆");
              setTimeout(function() {
                that.loading = false;
                that.$router.push("/login")
              }, 2000)
            }else {
              this.$message.error(res.data.data.message);
              this.loading = false;
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less" scope>
  #cRegister{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 480px;
      h3{
        margin-bottom: 20px;
        width: 100%;
        text-align: center;
      }
      p{
        text-align: right;
        span{
          color: #E6A23C;
          font-weight: 900;

        }
      }
    }
  }

</style>
