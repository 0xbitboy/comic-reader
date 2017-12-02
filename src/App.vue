<template>
  <div id="app">
    <keep-alive>
      <router-view name="alive"></router-view>
    </keep-alive>
    <router-view name="reset"></router-view>
  </div>
</template>


<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import 'assets/iconfont/iconfont.css';
@import 'styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
