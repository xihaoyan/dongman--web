/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div id="read" v-loading.fullscreen="loading">
    <div class="content">
      <div class="top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">去首页</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- {{graphsData}} -->
        <h3>第{{videoNum}}集- {{videoName}}</h3>
      </div>
      <div class="video-container">
        <video
          id="my-video"
          controls
          :currentTime="currentTime"
        >
          <template v-if="url">
            <source :src="url" type="video/mp4'"/>
            <source :src="url" type="video/webm" />
            <source :src="url" type="video/ogg" />
          </template>
        </video>
        <!-- <div class="btns">
          <div></div>
        </div> -->
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
    ></el-pagination>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loading: false,
      url: "",
      total: 10,
      currentPage: 1,
      videoNum: "",
      videoName: "",
      isFirst: false,
      currentTime: 0

    };
  },
  async mounted() {
    this.initVideo();
    if (this.$route.query.currentPage) {
      this.currentPage = Number(this.$route.query.currentPage + 1);
      await this.getGraphData(this.$route.query.currentPage);
    } else {
      await this.getGraphData();
    }
  },
  methods: {
    initVideo() {
      this.video = document.getElementById("my-video");
      const that = this;
      this.video.addEventListener("pause", function() {
        that.setHistory(that.currentPage - 1, that.video.currentTime);
      }, false);
    },
    getGraphData(currentPage, seconds) {
      this.loading = true;
      let url = "&id=" + this.$route.params.id;
      if (currentPage) {
        url += "&currentPage=" + currentPage;
      }
      // if (seconds) {
      //   url += "&seconds=" + seconds;
      // }
      this.$axios.get("/api/list/getItemImage?type=1&userId=" +
        sessionStorage.getItem("id") + url
      ).then(res => {
        this.url = res.data.data.data.urls[0];
        this.videoNum = res.data.data.data.num;
        this.videoName = res.data.data.data.name;
        this.total = res.data.data.total;
        this.loading = false;
        this.video.src = this.url;
        // this.currentTime = res.data.data.data.seconds;
        // this.video.currentTime = this.currentTime;
        if(this.isFirst) {
          this.video.play();
        }
      });
    },
    setHistory(currentPage, seconds) {
      let url = "&id=" + this.$route.params.id;
      if (currentPage) {
        url += "&currentPage=" + currentPage;
      }
      if (seconds) {
        url += "&seconds=" + seconds;
      }
      this.$axios.get("/api/list/getItemImage?type=1&userId=" +
        sessionStorage.getItem("id") + url
      ).then(res => {});
    },
    currentChange(val) {
      this.isFirst = true;
      this.currentPage = val;
      this.getGraphData(val - 1);

    }
  }
};
</script>
<style lang="less" scoped>
#read {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  // padding: 20px 40px;
  .top {
    display: flex;
    justify-content: space-around;
  }
  .content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    height: calc(100% - 60px);
    padding: 20px 0;
    background: rgba(255, 255, 255, 0.6);
    // background: rgba(0,0,0,.6);
    // margin-top: 10px;
    clear: both;
    overflow: auto;
    h3 {
      text-align: center;
      margin-bottom: 20px;
    }
    .image__lazy {
      width: 800px;
      height: 100%;
      margin: 0 auto;
      .el-image {
        width: 100%;
      }
    }
  }
  .el-pagination {
    margin: 14px auto 0 auto;
    // width: 340px;
    display: flex;
    justify-content: center;
  }
  .video-container{
    margin: 0 auto;
    width: 960px;
    height: 400px;
    position: relative;
    #my-video{
      width: 100%;
      height: 100%;
      display: block;
      outline: none;
      padding: 0;
      source{
        width: 100%;
        height: 100%;
      }
    }
    .btns{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 32px;
      background: rgba(0,0,0,.5);
      display: flex;
      justify-content: space-between;
    }
  }

}
</style>
