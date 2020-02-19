<template>
  <div id="list" v-loading.fullscreen="loading">
    <Header ref="header" @getListData="getListData"></Header>
    <div class="content">
      <template v-if="listData && listData.length > 0">
        <el-card :body-style="{ padding: '0px' }" v-for="item in listData" :key="item.id">
          <img :src="item.img" class="image" @click="toDetail(item.id)">
          <div class="card_text">
            <div class="name" @click="toDetail(item.id)">{{item.name}}</div>
            <div class="desc">{{item.desc}}</div>
            <div class="bottom clearfix">
              <time class="time">{{ item.status == '1' ? ('共' + item.last_hua + '集全') : ('更新至' + item.last_hua)}}</time>
            </div>
            <el-button type="danger" class="button" size="small" @click="startRead(item.id, item.va_type)">{{item.va_type == "1" ? "开始观看" : "开始阅读"}}</el-button>
          </div>
        </el-card>
      </template>
      <Nodata v-else></Nodata>

    </div>
    <div class="pagination" v-if="listData && listData.length > pageSize">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import Header from "../../components/Header";
import Nodata from "../../components/Nodata";
import qs from "qs";
export default {
  components: {
    Header,
    Nodata
  },
  data() {
    return {
      loading: false,
      listData: [],
      total: 0,
      pageSize: 10,
      pageNumber: 1
    }

  },
  mounted() {
    this.getListData({type: "全部"});
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    async getListData(data) {
      this.loading = true;
      let params =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      if(data) {
        params = Object.assign(data, params);
      }
      const query = qs.stringify(params);
      const res = await this.$axios.get("/api/list/list?" + query);
      this.listData = res.data.data.list;
      this.total = res.data.data.total;
      this.loading = false;
    },
    startRead(id, va_type) {
      if(va_type == "1") {
        this.$router.push("/video/" + id);
      }else if(va_type == "2") {
        this.$router.push("/read/" + id);
      }
    },
  }
}
</script>
<style lang="less" scoped>
  #list{
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    // background: url("../../assets/images/bg.jpg") 100% 100%;
    padding: 20px 40px;
    position: relative;
    .content{
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 126px);
      padding: 20px 20px 20px 40px;
      background: rgba(255,255,255,.6);
      // background: rgba(0,0,0,.6);
      clear: both;
      overflow: auto;
      .el-card{
        width: 405px;
        height: 190px;
        margin-right: 24px;
        margin-bottom: 24px;
        float: left;
        .image{
          width: 140px;
          height: 192px;
          cursor: pointer;
          float: left;
        }
        .name{
          cursor: pointer;
          font-weight: 900;
          color: #666;
        }
        .desc{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-top: 12px;
        }
        .el-card__body{
          display: flex;
          justify-content: flex-start;
        }
        .button{
          margin-top: 12px;
        }
        .card_text{
          padding: 12px 14px;
          float: left;
          width: calc(100% - 168px);
        }
        .bottom{
          margin-top: 12px;
          color: #E6A23C;
        }
      }

    }
    .pagination{
      width: 100%l;
      background: rgba(255,255,255,.6);
      padding-bottom: 16px;
      clear: both;
      overflow: hidden;
      .el-pagination{
        float: right;
      }
    }
  }

</style>
