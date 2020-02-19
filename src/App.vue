<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
@import "./assets/var.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("./assets/images/bg.jpg") 100% 100%;
  position: relative;
  text-align: left;
}
.el-breadcrumb__item span,
.el-breadcrumb__item span{
  color: #000 !important;
  &:hover{
    color: #F56C6C !important;
  }
}
.el-breadcrumb__item span{
  cursor: pointer !important;
}
</style>
