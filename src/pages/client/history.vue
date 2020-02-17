<template>
  <div id="history">
    <Header></Header>
    <div class="content">
      <el-card :body-style="{ padding: '0px' }" v-for="item in listData" :key="item.id">
        <!-- item.id, item.currentPage -->
        <img :src="item.img" class="image">
        <div style="padding: 14px;float:left;">
          <div class="name">{{item.name}}</div>
          <div class="desc">{{ item.desc }}</div>
          <div class="bottom clearfix">
            <time class="time">上次阅读至{{ item.last_hua }}</time>
            <el-button type="primary" class="button" size="small" @click="toRead(item.id, item.currentPage)">继续阅读</el-button>
          </div>
        </div>
      </el-card>
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
import Header from "../../components/Header"
export default {
  components: {
    Header
  },
  data() {
    return {
      listData: [
        {
          id: "0",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        },
        {
          id: "1",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        },
        {
          id: "2",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        },
        {
          id: "3",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        },
        {
          id: "4",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        },
        {
          id: "5",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        },
        {
          id: "6",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        },
        {
          id: "7",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        },
        {
          id: "8",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        },
        {
          id: "9",
          name: "爆宠狂妻之神医五小姐",
          img: "https://manhua.qpic.cn/vertical/0/09_11_52_15695e53333a1b4e2cb377dff8c11a04_1541735521990.jpg/420",
          desc: "【每周双更！周五/周日更新！】 现代女杀手穿越后重生于仙界废柴---将军府五小姐（少爷）司马幽月之身，由此开启了废柴逆袭模式，一路开挂，收获各类神兽和法器，并在此过程中与各色男主角们相遇…… 《神医五小姐》漫画读者群：626088440，二群：851059663",
          status: "2",
          star: "2",
          type: "玄幻",
          auth: "风行漫画工作室 ",
          last_hua: "87"
        }
      ]
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
    toRead(id, currentPage) {
      this.$router.push("/read/" + id + "?currentPage=" + currentPage);
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
      height: calc(100% - 166px);
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
        }
        .el-card__body{
          display: flex;
          justify-content: flex-start;
        }
      }

    }
    .pagination{
      width: 100%l;
      background: rgba(255,255,255,.6);
      padding-bottom: 16px;
    }
  }

</style>
