import Vue from 'vue'
import App from './App.vue'
//引入组件----全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import { MessageBox } from 'element-ui'
//第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);

//elementui 注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


//引入路由
import router from '@/router';
//引入仓库
import store from '@/store';
//引入MockServer.js----mock数据
import '@/mock/mockServe';
//引入swiper样式
import "swiper/css/swiper.css";
//统一引入接口api文件夹里面全部请求函数
import * as API from '@/api';
// //引入插件
// import VueLazyload from 'vue-lazyload';
// //注册插件
// Vue.use(VueLazyload,{
//   //懒加载默认图片
//   loading:
// });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由信息：包括有$route和$router属性
  router,
  //注册仓库
  store
}).$mount('#app')
