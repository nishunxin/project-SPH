<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派 -->
      <div @mouseleave="leaveshow" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
              <h3 @mouseenter="changeIndex(index)" >
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
              </h3>
              <!-- 二级、三级分类 -->
              <div class="item-list clearfix" :style="{display:currentIndex==index ? 'block':'none'}">
                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          </div>
        </transition>
      </div>      
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
//引入lodash，按需引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data(){
    return {
      //存储用户移上哪一个一级分类
      currentIndex:-1,
      show:true
    }
  },
  //组件挂载完毕，可以向服务器发请求
  mounted(){
    //当组件挂载完毕，让show属性变为false，判断如果不是home组件，将typenav隐藏
    if(this.$route.path !='/home' ){
      this.show = false
    }
  },
  computed:{
    ...mapState({
      categoryList:(state) =>{
        //拿到后台数据并截取长度前15个  数据多了。
        return state.home.categoryList.slice(0,16);
      }
    })
  },
  methods: {
    //鼠标进入时响应式数据currentIndex属性(_.throttle是节流的方式)
    changeIndex:throttle(function (index) {
      //index：鼠标移上某一个一级分类的索引值
      this.currentIndex = index;
    },50),
    //鼠标移除事件的回调
    leaveIndex(){
      this.currentIndex = -1
    },
    //进行路由跳转的方法
    goSearch(event){
      //最好的解决方案：编程式导航+ 事件委派
      let element = event.target;
      //节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
      let {categoryname,category1id,category2id,category3id} = element.dataset;
      //如果标签身上有categoryname一定是a标签
      if(categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类、二级分类、三级分类的a标签
        if(category1id){
          query.category1id = category1id;
        }else if(category2id){
          query.category2id = category2id;
        }else{
          query.category3id = category3id;
        }
        //判断路由跳转的时候是否带有params参数，也一并传递过去
        if(this.$route.params) {
          location.params = this.$route.paeams;
        }
        //整理完参数
        location.query =query;
        //路由跳转
        this.$router.push(location);
      }

    },
    //鼠标移入时展现typenav
    entershow(){
      this.show = true
    },
    //当鼠标移除时隐藏typenav
    leaveshow() {
      this.currentIndex = -1;
      if(this.$route.path !='/home'){
        this.show = false
      }
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 481px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur{
          background:skyblue;
        }
      }
    }
    //过渡动画的样式(开始状态)
    .sort-enter{
      height: 0px;
    }
    //过渡动画的样式（结束的状态）
    .sort-enter-to{
      height: 481px;
    }
    //定义动画时间、速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>