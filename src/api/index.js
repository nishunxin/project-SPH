//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

//三级联动接口
///api/product/getBaseCategoryList  get 无参数
//发请求:axios发请求返回结果promise对象
export const reqCategoryList = ()=> requests.get(`/product/getBaseCategoryList`);



//获取banner（Home首页轮播图数据接口）
export const reqGetBannerList = ()=> mockRequests.get('/banner');

//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor');

//获取搜索模块数据 地址：/api/list  方式：post 需要带参数
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params});

//获取商品详情数据 地址：/api/item/{ skuId }  方式：get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:"get"});

//将产品添加到购物车中（获取更新某一个产品的个数）
// 地址：/api/cart/addToCart/{ skuId }/{ skuNum } 方式：post
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

//获取购物车列表数据接口   地址：/api/cart/cartList  方式：get
export const reqCartList = ()=> requests({url:"/cart/cartList",method:"get"});

//删除购物车列表数据接口 地址：/api/cart/deleteCart/{skuId} 方式：DELETE
export const reqDeleteCartById = (skuId)=> requests({url:`/cart/deleteCart/${skuId}`,method:"delete"});

//切换商品选中状态数据接口 地址：/api/cart/checkCart/{skuID}/{isChecked} 方式：get
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"});

//获取验证码数据接口 地址：/api/user/passport/sendCode/{phone} 方式：get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:"get"});

//注册 地址：/api/user/passport/register  方式：post
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:"post"});

//登录  地址：/api/user/passport/login  方式：post
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:"post"});

//获取用户信息（需要带用户的token要信息） 地址：/api/user/passport/auth/getUserInfo 方式：get
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:"get"});

//退出登录 地址：/api/user/passport/logout 方式：get
export const reqLogout = ()=> requests({url:'/user/passport/logout',method:"get"});

//获取用户信息 地址：/api/user/userAddress/auth/findUserAddressList 方式：get
export const reqAddressInfo = ()=> requests({url:'/user/userAddress/auth/findUserAddressList',method:"get"});

//获取订单交易页信息 地址：/api/order/auth/trade 方式：get
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:"get"});

//提交订单  地址：/api/order/auth/submitOrder?tradeNo={tradeNo} 方式：post
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"});

//获取支付信息 地址：/api/payment/weixin/createNative/{orderId} 方式：get
export const reqPayInfo =(orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"});

//查询支付订单的状态 地址：/api/payment/weixin/queryPayStatus/{orderId} 方式：get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"});

//获取我的订单列表 地址：/api/order/auth/{page}/{limit} 方式：get
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:"get"});