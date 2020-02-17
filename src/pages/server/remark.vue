<template>
  <div id="manage" v-loading="loading">
    <Headerh></Headerh>
    <div class="container">
      <h3>评论管理</h3>
      <el-table
        :data="graphsData"
        border
        style="width: 100%"
        size="small"
        stripe
      >
        <el-table-column
          prop="username"
          label="评论者"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
        >
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="评论时间"
        >
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作"
          width="340px"
        >
          <template scope="scope">
            <el-button plain class="add_btn" type="danger" size="mini" icon="el-icon-delete" @click="deleteRemark(scope.row.remarkId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Headerh from "../../components/Headerh"
export default {
  data() {
    return {
      loading: false,
      graphsData: [],
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
      const res = await this.$axios.get("/api/list/getRemark?id=" + this.$route.params.id);
      this.graphsData = res.data.data;
      this.loading = false;
    },
    deleteRemark(remarkId) {
      this.loading = true;
      const params = {
        id: this.$route.params.id,
        remarkId: remarkId
      }
      this.$axios.post("/api/list/deleteRemark", params).then(res => {
        this.loading = false;
        this.getListData();
      })
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
    }

  }

</style>
