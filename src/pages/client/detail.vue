<template>
  <div id="detail" v-loading.fullscreen="loading">
    <Header></Header>
    <div class="content">
      <div class="detail_desc">
        <div class="top">
          <div class="images">
            <img :src="detailData.img" >
            <div class="status">{{detailData.status == 1 ? '已完结' : '连载中'}}</div>
          </div>
          <div class="text_info">
            <div class="name">{{detailData.name}}</div>
            <div class="auth">作者：{{detailData.auth}}</div>
            <div class="desc">{{detailData.desc}}</div>
            <div class="bottom clearfix">
              <el-button type="danger" size="medium" @click="toRead(1)">{{detailData.va_type == "1" ? '开始观看' : '开始阅读'}}</el-button>
              <!-- :icon="detailData.star == 1 ? 'el-icon-star-on' : 'el-icon-star-off'" -->
              <el-button type="warning" plain size="medium"
                :icon="stars.indexOf(detailData.id) > -1 ? 'el-icon-star-on' : 'el-icon-star-off'"
                @click="handleStar"
              >{{stars.indexOf(detailData.id) > -1 ? '取消收藏' : '收藏'}}</el-button>
            </div>
          </div>
        </div>
        <div class="detail_zhangjie">
          <h3>更新{{detailData.va_type == "1" ? '剧集' : '章节'}}</h3>
          <div v-for="item in detailData.graphs" :key="item.num" class="graph"
            @click="toRead(item.num, item.seconds)"
          >
            第{{item.num}}{{detailData.va_type == "1" ? '集' : '章'}}：{{item.name}}
          </div>
        </div>
      </div>
      <div class="remark">
        <h3>全部评论</h3>
        <el-input placeholder="请输入内容" v-model="remarkKey" class="input-with-select" size="small">
          <el-button slot="append" style="width:80px" @click="addRemark">发表评论</el-button>
        </el-input>
        <div v-for="(item,index) in detailData.remarks" :key="index" class="remark_item">
          <div class="username">
            <span>用户名：{{item.username}}</span>
            <span>{{item.update_Date}}</span>
            <el-button
              type="text"
              size="mini"
              style="color: #F56C6C;"
              v-if="username == item.username"
              @click="deleteRemark(item.remarkId)"
            >删除</el-button>
          </div>
          <div class="remark_content">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/Headern";
export default {
  components: {
    Header
  },
  data() {
    return {
      loading: false,
      remarkKey: "",
      detailData: {
        id: "0",
        name: "爆宠狂妻之神医五小姐",
        img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
        desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
        status: "2",
        star: "2",
        type: "玄幻",
        auth: "风行漫画工作室 ",
        last_hua: 87,
        graphs: [
          {
            name: "卑微帝王",
            num: 1,
            images: "1,2,3,4",  // 存储该章节漫文件id, 如果是动漫，由多个ID，用逗号分割
          },
          {
            name: "讨厌飞行",
            num: 2,
            images: "1,2,3,4"
          },
          {
            name: "美好的正太",
            num: 3,
            images: "1,2,3,4"
          }
        ],
        remarks: [
          {
            content: "卑微帝王",
            username: "勿忘我",
            update_Date: "2019-02-01"
          },
          {
            content: "卑微帝王",
            username: "勿忘我",
            update_Date: "2019-02-01"
          },
          {
            content: "卑微帝王",
            username: "勿忘我",
            update_Date: "2019-02-01"
          },
          {
            content: "卑微帝王",
            username: "勿忘我",
            update_Date: "2019-02-01"
          },
          {
            content: "卑微帝王卑微帝王卑微帝王卑微帝王卑微帝王卑微卑微帝王卑微帝王卑微帝王卑微帝王卑微帝王",
            username: "勿忘我",
            update_Date: "2019-02-01"
          }
        ],
      },
      itemId: null,
      username: sessionStorage.getItem("Token"),
      stars: []
    }
  },
  watch: {
    "$route": {
      handler(val) {
        if(val.params.id) {
          this.itemId = val.params.id;
          this.getInfoItem();
          this.getItemStar();
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getInfoItem() {
      this.loading = true;
      this.$axios.get("/api/list/getItem?id=" + this.itemId).then(res => {
        const data = res.data.data;
        this.detailData.img = data.img;
        this.detailData.id = data.id;
        this.detailData.name = data.name;
        this.detailData.type = data.type;
        this.detailData.auth = data.auth;
        this.detailData.desc = data.desc;
        this.detailData.status = data.status;
        this.detailData.va_type = data.va_type;
        this.detailData.graphs = JSON.parse(data.graphs);
        this.detailData.remarks = data.remark ? JSON.parse(data.remark) : [];
        this.loading = false;
      })
    },
    addRemark() {
      this.loading = true;
      const params = {
        id: this.itemId,
        content: this.remarkKey,
        username: this.username,
        update_Date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
      }
      this.$axios.post("/api/list/addRemark", params).then(res => {
        this.loading = false;
        this.getInfoItem();
        this.remarkKey = "";
      })
    },
    deleteRemark(remarkId) {
      this.loading = true;
      const params = {
        id: this.itemId,
        remarkId: remarkId
      }
      this.$axios.post("/api/list/deleteRemark", params).then(res => {
        this.loading = false;
        this.getInfoItem();
      })
    },
    getItemStar() {
      this.stars = sessionStorage.getItem("star") ? sessionStorage.getItem("star") : [];
    },
    handleStar() {
      this.loading = true;
      this.$axios.post("/api/user/handleStar", {
        id: this.itemId,
        userId: sessionStorage.getItem("id")
      }).then(res => {
        this.loading = false;
        sessionStorage.setItem("star", res.data.data.star);
        this.getInfoItem();
        this.getItemStar();

      })
    },
    toRead(currentPage, seconds) {
      console.log(currentPage, "222")
      if(this.detailData.va_type == "1") {
        // 动画
        let url = "/video/" + this.detailData.id;
        if(currentPage) {
          url += "?currentPage=" + (Number(currentPage) - 1);
        }
        if(seconds) {
          url += "&seconds=" + seconds;
        }
        this.$router.push(url);
      }else if(this.detailData.va_type == "2") {
        // 漫画
        let url = "/read/" + this.detailData.id;
        if(currentPage) {
          url += "?currentPage=" + (Number(currentPage) - 1);
        }
        this.$router.push(url);
      }

    }
  }
}
</script>
<style lang="less" scoped>
  #detail{
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    // background: url("../../assets/images/bg.jpg") 100% 100%;
    padding: 20px 40px;
    .content{
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 50px);
      padding: 20px 20px 20px 40px;
      background: rgba(255,255,255,.6);
      // background: rgba(0,0,0,.6);
      margin-top: 10px;
      clear: both;
      overflow: hidden;
      .detail_desc{
        width: 50%;
        float: left;
        .top{
          display: flex;
          justify-content: flex-start;
          .images{
            width: 250px;
            height: 308px;
            background: url("../../assets/images/page_works.png") no-repeat;
            position: relative;
            img{
              width: 210px;
              height: 280px;
              margin-left: 20px;
            }
            .status{
              box-sizing: border-box;
              height: 32px;
              line-height: 32px;
              font-size: 14px;
              text-align: left;
              color: #fff;
              padding-left: 12px;
              position: absolute;
              bottom: 26px;
              left: 19px;
              width: 100%;
              background: url("../../assets/images/page_works.png") no-repeat;
              background-position: -339px 0px;

            }
          }
          .text_info{
            float: left;
            flex: 1;
            text-align: left;
            margin-left: 20px;
            .name{
              font-size: 24px;
              margin-bottom: 14px;
            }
            .auth{
              font-size: 14px;
              color: #333;
              margin-bottom: 14px;
            }
            .desc{
              font-size: 14px;
              color: #666;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 6;
              -webkit-box-orient: vertical;
            }
            .bottom{
              margin-top: 20px;
            }
          }
        }
        .detail_zhangjie{
          text-align: left;
          h3{
            margin: 20px 0;
          }
          .graph{
            display: inline-block;
            width: 200px;
            color: #333;
            font-size: 14px;
            cursor: pointer;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &:hover{
              color:#E6A23C;
            }
          }
        }

      }
      .remark{
        width: 40%;
        float: right;
        text-align: left;
        h3{
          color: #F56C6C;
        }
        .el-input{
          margin-top: 20px;
          width: 400px;
        }
        .remark_item{
          margin: 10px 0;
          .username{
            color: #409EFF;
            font-weight: 900;
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
          }
          .remark_content{
            padding: 0 20px;
          }

        }
      }

    }
  }

</style>
