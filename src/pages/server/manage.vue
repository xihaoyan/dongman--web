<template>
  <div id="manage" v-loading="loading">
    <div class="container">
      <el-table
        :data="graphsData"
        border
        style="width: 100%"
        size="small"
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
      </el-table>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      graphsData: [],
      total: 0

    }
  },
  mounted() {
    this.getListData();
  },
  methods: {
    async getListData() {
      this.loading = true;
      const res = await this.$axios.get("/api/list/list", {
        pageNumber: 1,
        pageSize: 10
      });
      console.log(res, "res")
      this.graphsData = res.data.data.list;
      this.total = res.data.data.total;
      this.loading = false;


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
    overflow-y: auto;
    .container{
      width: 100%;
      box-sizing: border-box;
      background: rgba(255,255,255,.6);
      padding: 20px;
      height: 100%;
    }

  }

</style>
