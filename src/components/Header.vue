<template>
  <div id="header">
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
    <div class="search">
      <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @keydown.enter.native="doSearch">
        <el-button slot="append" icon="el-icon-search" style="width:80px" @click="doSearch"></el-button>
      </el-input>
    </div>
    <div class="nav">
      <el-radio-group v-model="activeType" @change="typeChange">
        <el-radio-button label="全部" value="0"></el-radio-button>
        <el-radio-button label="玄幻" value="1"></el-radio-button>
        <el-radio-button label="校园" value="2"></el-radio-button>
        <el-radio-button label="言情" value="3"></el-radio-button>
        <el-radio-button label="爆笑" value="4"></el-radio-button>
        <el-radio-button label="推理" value="5"></el-radio-button>
      </el-radio-group>
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
.search{
  width: 600px;
  margin: 0px auto 30px;
  .el-input__inner:focus{
    border-color: #DCDFE6;
  }
}
.nav{
  padding: 0px 40px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
</style>
