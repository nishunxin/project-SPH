<template>
<div id="App">
  <Header></Header>
  <!-- 路由组件出口的地方 -->
  <router-view></router-view>
  <Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: '',
  components:{
    Header,
    Footer
  },
  mounted(){
    //派发一个action 获取商品分类的三级联动列表的数据 （app组件mounted只执行一次）。
    this.$store.dispatch('categoryList');
  }
}
</script>

<style scoped >

</style>
