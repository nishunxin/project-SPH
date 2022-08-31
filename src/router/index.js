//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
//引入二级路由
import myOrder from '@/views/Center/myOrder'
import groupOrder from '@/views/Center/groupOrder'

//引入store
import store from '@/store';

// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
 
// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
//  call || apply区别
//  相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//  不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {
    }, () => {
    })
  }
}
 
VueRouter.prototype.replace = function (location, resole, reject) {
  if (resole && reject) {
    originReplace.call(this, location, resole, reject);
  } else {
    originReplace.call(this, location, () => {
    }, () => {
    })
  }
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{ show:true }
        },
        {
            path:"/search/:keyword?",
            component:Search,
            meta:{ show:true },
            name:"search"
        },
        {
            path:"/login",
            component:Login,
            meta:{ show:false }
        },
        {
            path:"/register",
            component:Register,
            meta:{ show:false }
        },
        {
          path:"/detail/:skuid",
          component:Detail,
          meta:{ show:true }
        },
        {
          path:"/addcartsuccess",
          name:"addcartsuccess",
          component:AddCartSuccess,
          meta:{ show:true }
        },
        {
          path:"/shopcart",
          component:ShopCart,
          meta:{ show:true }
        },
        {
          path:"/trade",
          component:Trade,
          meta:{ show:true },
          //路由独享守卫
          beforeEnter: (to,from,next) =>{
            if(from.path == "/shopcart"){
              next();
            }else {
              next(false);
            }
          }
        },
        {
          path:"/pay",
          component:Pay,
          meta:{ show:true },
          beforeEnter: (to,from,next) =>{
            if(from.path == "/trade"){
              next();
            }else {
              next(false);
            }
          }
          
        },
        {
          path:"/paysuccess",
          component:PaySuccess,
          meta:{ show:true }
        },
        {
          path:"/center",
          component:Center,
          meta:{ show:true },
          //二级路由组件
          children: [
            {
              path: "myorder",
              component: myOrder,
            },
            {
              path: "grouporder",
              component: groupOrder,
            },
            {
              path:'/center',
              redirect:"/center/myorder"
           }
          ]
        },
        //路由重定向，访问/时，立马定向
        {
           path:'*',
           redirect:"/home"
        }
    ],
    //滚动行为
    scrollBehavior(to,from,savedPosition) {
      return { y: 0 };
    }
});

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to,from,next)=>{
  //to:可以获取到你要跳转到哪个路由信息
  //from：可以获取到从哪个路由而来的信息
  //next：放行函数  next()放行  next（path）放行到指定路由
  next();
  //用户登录了，才会有token，未登录一定没有
  let token = store.state.user.token;
  //用户信息
  let name = store.state.user.userInfo.name;
  //用户已经登录了
  if(token) {
    if(to.path=='/login'||to.path=='/register'){
      next('/');
    }else{
      //登录，去的不是login
      if(name){
        next();
      }else{
        //没有用户信息：派发action让仓库存储用户信息在跳转
        try {
          //获取用户信息成功
          await store.dispatch('getUserInfo');
          next();
        }catch(error){
          //token失效了获取不到用户信息，重新登录
          //清除token
          await store.dispatch('userLogout');
          next('/login');

        }
      }
    }
  } else {
    //未登录:不能去交易相关，不能去支付相关，不能去个人中心【pay|paysuccess】
    let toPath = to.path;
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
      next('/login?redirect='+toPath);
    }else{
      //去的不是以上路由---放行
      next();
    }
    
  }

});

export default router;
