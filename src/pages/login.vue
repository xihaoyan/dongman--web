<template>
  <div id="login" v-loading="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <h3>登 陆</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
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
          // 登陆成功后存储session
          // 记得退出登录时删除session
          this.loading = true;
          this.$axios.post("/api/user/login", this.ruleForm).then(res => {
            if(res.data.data.code == 0) {
              const ls = res.data.data;
              sessionStorage.setItem("Token", ls.data.username);
              this.$message.success("登陆成功");
              setTimeout(function() {
                if(ls.data.role == 1) {
                  that.$router.push("/");
                }else if(ls.data.role == 2) {
                  that.$router.push("/manage");
                }
                that.loading = false;

              }, 0)
            } else {
              this.$message.error(res.data.data.message);
              that.loading = false;
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
  #login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 480px;
      .el-form-item__label{
        color: #fff;
      }
      h3{
        margin-bottom: 20px;
        width: 100%;
        text-align: center;
      }
    }
  }

</style>
