<template>
  <div id="manage" v-loading="loading">
    <Headerh></Headerh>
    <div class="container">
      <h3>动漫管理</h3>
      <router-link to="/editlist">
        <el-button type="primary" class="add_btn" size="small" icon="el-icon-plus">新增动漫</el-button>
      </router-link>
      <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" size="small" @keydown.enter.native="doSearch">
        <el-button slot="append" icon="el-icon-search" style="width:80px" @click="doSearch"></el-button>
      </el-input>
      <el-table
        :data="graphsData"
        border
        style="width: 100%"
        size="small"
        stripe
      >
        <el-table-column
          prop="name"
          label="动漫名称"
        >
        </el-table-column>
        <el-table-column
          prop="auth"
          label="动漫作者"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="动漫类别"
        >
        </el-table-column>
        <el-table-column
          prop="va_type"
          label="动漫类型"
        >
          <template scope="scope">
            {{scope.row.va_type == 1 ? '动画' : '漫画'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="动漫状态"
        >
          <template scope="scope">
            {{scope.row.va_type == 1 ? '完结' : '连载'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="last_hua"
          label="最后更新"
        >
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作"
          width="340px"
        >
          <template scope="scope">
            <el-button plain class="add_btn" type="primary" size="mini" icon="el-icon-edit" @click="toEdit(scope.row.id)">编辑</el-button>
            <el-button plain class="add_btn" type="danger" size="mini" icon="el-icon-delete" @click="toDelete(scope.row.id)">删除</el-button>
            <el-button plain class="add_btn" type="warning" size="mini" icon="el-icon-document" @click="toRemark(scope.row.id)">评论管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Headerh from "../../components/Headerh";
import qs from "qs";
export default {
  data() {
    return {
      loading: false,
      graphsData: [],
      total: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1,
      keyword: ""
    }
  },
  components: {
    Headerh
  },
  mounted() {
    this.getListData();
  },
  methods: {
    async getListData() {
      this.loading = true;
      const params = {
        pageNumber: 1,
        pageSize: 10
      }
      if(this.keyword) {
        params.keyword = this.keyword;
      }
      const res = await this.$axios.get("/api/list/list?" + qs.stringify(params));
      this.graphsData = res.data.data.list;
      this.total = res.data.data.total;
      this.loading = false;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.getListData();
    },
    toEdit(id) {
      this.$router.push("/editlist/" + id);
    },
    async toDelete(id) {
      await this.$axios.post("/api/list/delete", {id}).then(res => {
        this.getListData();
      });
    },
    toRemark(id) {
      this.$router.push("/remark/" + id);
    },
    doSearch() {
      this.getListData();
    }
  }
}
</script>
<style lang="less" scoped>
  #manage{
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    overflow-y: hidden;
    // overflow-y: auto;
    .container{
      width: 100%;
      box-sizing: border-box;
      background: rgba(255,255,255,.6);
      padding: 20px;
      height: 100%;
      overflow-y: auto;
      h3{
        margin-bottom: 20px;
        text-align: center;
      }
      .add_btn{
        margin-bottom: 20px;
      }
      .el-pagination{
        float: right;
        margin-top: 20px;
      }
      .input-with-select{
        width: 400px;
        margin-left: calc(50% - 300px);
      }

    }

  }

</style>
