<template>
  <div id="read" v-loading.fullscreen="loading">
    <div class="content">
      <div class="top">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">去首页</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- {{graphsData}} -->
        <h3>第{{graphsData.num}}章- {{graphsData.name}}</h3>

      </div>


      <div class="image__lazy">
        <el-image v-for="url in graphsData.urls" :key="url" :src="url" lazy></el-image>
      </div>
    </div>
    <el-pagination
      :page-size="1"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      :prev-text="'上一章'"
      :next-text="'下一章'"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      graphsData: [],
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ],
      total: 10,
      currentPage: 1
    }
  },
  mounted() {
    if(this.$route.query.currentPage) {
      this.currentPage = Number(this.$route.query.currentPage);
      this.getGraphData(this.$route.query.currentPage);
    }else {
      this.getGraphData();
    }
  },
  methods: {
    getGraphData(currentPage) {
      this.loading = true;
      let url = "id=" + this.$route.params.id;
      if(currentPage) {
        url += '&currentPage=' + currentPage;
      }
      this.$axios.get("/api/list/getItemImage?type=1&userId=" + sessionStorage.getItem("id") + '&' + url).then(res => {
        this.graphsData = res.data.data.data;
        this.total = res.data.data.total;
        this.loading = false;
      })
    },
    currentChange(val) {
      this.getGraphData(val);
    }
  }
}
</script>
<style lang="less" scoped>
  #read{
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    // padding: 20px 40px;
    .top{
      display: flex;
      justify-content: space-around;
    }
    .content{
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      height: calc(100% - 60px);
      padding: 20px 0;
      background: rgba(255,255,255,.6);
      // background: rgba(0,0,0,.6);
      // margin-top: 10px;
      clear: both;
      overflow: auto;
      h3{
        text-align: center;
        margin-bottom: 20px;
      }
      .image__lazy{
        width: 800px;
        height: 100%;
        margin: 0 auto;
        .el-image{
          width: 100%;
        }
      }
    }
    .el-pagination{
      margin: 14px auto 0 auto;
      // width: 340px;
      display: flex;
      justify-content: center;
    }
  }
</style>
