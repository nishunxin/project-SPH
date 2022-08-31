import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
//封装的临时游客函数
import { getUUID } from '@/utils/uuid_token';
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state,goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const actions = {
    //获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code == 200){
            commit("GETGOODINFO",result.data);
        }  
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车返回的解构，因为服务器没有返回其余多余的数据，所以这次不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code == 200) {
            return "ok"
        }else{
            return Promise.reject(new Error('faile'));
        }

    },
};
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};

//对外暴露store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})