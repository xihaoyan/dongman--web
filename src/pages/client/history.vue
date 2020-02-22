<template>
  <div id="history">
    <Header></Header>
    <div class="content">
      <template v-if="listData && listData.length > 0">
        <el-card :body-style="{ padding: '0px' }" v-for="item in listData" :key="item.id">
          <!-- item.id, item.currentPage -->
          <img :src="item.img" class="image">
          <div style="padding: 14px;float:left;">
            <div class="name">{{item.name}}</div>
            <div class="desc">{{ item.desc }}</div>
            <div class="bottom clearfix">
              <time class="time">{{item.va_type == "1" ? `上次观看至第${Number(item.currentPage)}集` : `上次阅读至第${Number(item.currentPage)}章`}}</time>
            </div>
            <el-button type="primary" class="button" size="small" @click="toRead(item)">
              {{item.va_type == "1" ? '继续观看' : '继续阅读'}}
            </el-button>
          </div>
        </el-card>
      </template>
      <Nodata v-else></Nodata>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="listData.length">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import Header from "../../components/Headern";
import Nodata from "../../components/Nodata";
export default {
  components: {
    Header,
    Nodata
  },
  data() {
    return {
      listData: []
    }

  },
  mounted() {
    this.getHistory();
  },
  methods: {
    async getHistory() {
      this.loading = true;
      this.$axios.get("/api/user/getHistory?userId=" + sessionStorage.getItem("id"))
      .then(res => {
        this.loading = false;
        this.listData = res.data.data;
      })
    },
    toDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    toRead(item) {
      const {id, currentPage, seconds, va_type} = item;
      if(va_type == "1") {
        let url = "/video/" + id + "?currentPage=" + currentPage;
        if(seconds) {
          url += '&seconds=' + seconds;
        }
        this.$router.push(url);
      }else if(va_type == "2") {
        const url = "/read/" + id + "?currentPage=" + currentPage;
        this.$router.push(url);
      }

    }
  }
}
</script>
<style lang="less">
  #history{
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    // background: url("../../assets/images/bg.jpg") 100% 100%;
    padding: 20px 40px;
    text-align: left;
    .content{
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 50px);
      padding: 20px 20px 20px 40px;
      background: rgba(255,255,255,.6);
      // background: rgba(0,0,0,.6);
      margin-top: 10px;
      clear: both;
      overflow: auto;
      .el-card{
        width: 484px;
        height: 190px;
        margin-right: 24px;
        margin-bottom: 24px;
        float: left;
        .image{
          width: 140px;
          cursor: pointer;
        }
        .name{
          cursor: pointer;
        }
        .desc{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin: 12px 0;
        }
        .el-card__body{
          display: flex;
          justify-content: flex-start;
        }
        .bottom{
          margin-bottom: 10px;
        }
      }

    }
    .pagination{
      width: 100%l;
      background: rgba(255,255,255,.6);
      padding-bottom: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }

</style>
