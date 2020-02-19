<template>
  <div id="headern">
    <el-dropdown class="user_info">
      <span class="el-dropdown-link">
        <i class="el-icon-user-solid"></i>
        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出登陆</el-dropdown-item>
        <el-dropdown-item @click.native="toMyStar">我的收藏</el-dropdown-item>
        <el-dropdown-item @click.native="toMyHistory">观看历史</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">去首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      keyword: "",
      activeType: "全部",
      username: sessionStorage.getItem("Token"),
      loading: false
    }
  },
  created() {

  },
  methods: {
    doSearch() {
      this.$emit("getListData", {keyword: this.keyword, type: this.activeType});
    },
    typeChange() {
      this.$emit("getListData", {keyword: this.keyword, type: this.activeType});
    },
    logout() {
      sessionStorage.removeItem("Token");
      this.$router.push("/login");
    },
    toMyStar() {
      this.$router.push("/mystar");
    },
    toMyHistory() {
      this.$router.push("/history");
    }
  }
}
</script>

<style lang="less" scoped>
.user_info{
  position: absolute;
  top:20px;
  right: 30px;
  z-index: 999;
  color: #000;
}
.el-breadcrumb{
  margin-right: 40px;
  height: 32px;
  line-height: 32px;
}

.nav{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
</style>
