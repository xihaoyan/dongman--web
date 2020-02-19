<template>
  <div>
    <div class="nav">
      <el-breadcrumb separator="/manage" v-if="pathName != '/manage'">
        <el-breadcrumb-item :to="{ path: '/manage' }">去首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown class="user_info">
      <span class="el-dropdown-link">
        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      username: sessionStorage.getItem("Token"),
      pathName: this.$route.path
    }
  },
  created() {
  },
  methods: {
    logout() {
      sessionStorage.removeItem("Token");
      this.$router.push("/login");
    },
  }
}
</script>

<style lang="less">
.user_info{
  position: absolute;
  top:30px;
  right: 50px;
  z-index: 999;
  color: #000;
}
.search{
  width: 600px;
  margin: 0px auto 30px;
  .el-input__inner:focus{
    border-color: #DCDFE6;
  }
}
.nav{
  position: absolute;
  top:30px;
  left: 50px;
  z-index: 999;
  color: #000;
}
</style>
