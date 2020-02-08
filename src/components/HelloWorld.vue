<template>
  <div style="width:300px;padding-left:30px" class="my-time-line">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :type="activity.status == 'start' ? 'primary' : activity.status == 'kuaiwan' ? 'warning': activity.status == 'end' ? 'danger'  : 'plain'"
      >
        <div class="border_left"></div>
        <el-card shadow="never">

          <div class="title">{{activity.title}}</div>
          <div class="content">{{activity.content}}</div>
        </el-card>
        <div class="status-desc" :class="activity.status == 'start' ? 'primary' : activity.status == 'kuaiwan' ? 'warning': activity.status == 'end' ? 'danger'  : ''">{{activity.statusDesc}}</div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activities: [{
        content: '时间轴',
        title: '标题',
        status: "start",
        statusDesc: "开始"
      }, {
        content: '时间轴',
        title: '标题',
        status: "doing"
      }, {
        content: '时间轴时间轴时间轴时间间轴时间间轴时间时间轴时间间轴时间间轴时间',
        title: '标题',
        status: "kuaiwan",
        statusDesc: "快完"
      }, {
        content: '时间轴',
        title: '标题',
        status: "end",
        statusDesc: "危险"
      }]
    }
  }
  // 主要用到的颜色
  // #409EFF  primary
  // #E6A23C  warning
  // #F56C6C  danger
  // #ebeef5  文字块的颜色 灰色



}
</script>
<style>
  .el-card{
    position: relative;
    overflow: visible;
    background: #ebeef5;
    text-align: left;
    border: none;
    height: 100%;
  }
  .el-card .title{
    color: #409EFF;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .el-card .content{
    color: #666;
  }
  .border_left{
    width:0;
    height:0px;
    border-width:12px;
    border-style:solid;
    border-color:transparent #ebeef5 transparent transparent; /*右边不透明*/
    position:absolute;
    left: 4px;
    top: 50%;
    margin-top: -12px;
  }
  .el-timeline-item{
    box-sizing: border-box;
    height: 120px;
    margin-left: 12px;
    border-radius: 4px;
  }
  .el-timeline-item__wrapper,
  .el-timeline-item__content{
    height: 100%;
    border-radius: 4px;
  }
  .el-timeline-item__wrapper{
    top: -38px;
    margin-left: 6px;
  }
  .el-timeline-item__content{
    overflow-y: auto;
    margin-top: -12px;
    background: #ebeef5;
  }
  .status-desc{
    position: absolute;
    left: -67px;
    top: 33px;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
  }
  .status-desc.primary{
    background: #409EFF;
  }
  .status-desc.warning{
    background: #E6A23C;
  }
  .status-desc.danger{
    background: #F56C6C;
  }
  .el-timeline-item__node--normal{
    width: 20px;
    height: 20px;
    left: -6px;
  }
  .el-timeline-item__tail{
    border-color: #409EFF;
  }
  .el-timeline-item__node--normal{
    background-color: #fff;
    border: 1px solid #409EFF;
  }
  .el-timeline-item__node--primary{
    background-color: #409EFF;
  }
  .el-timeline-item__node--warning{
    background-color: #E6A23C;
  }
  .el-timeline-item__node--danger{
    background-color: #F56C6C;
    border-color: #F56C6C;
  }

</style>
