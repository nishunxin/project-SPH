import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api";
import { Promise } from "core-js";

const state = {
    cartList:[],
};

const mutations = {
    GETCARTLIST(state,cartList) {
        state.cartList = cartList;
    }
};

const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if(result.code == 200) {
            commit("GETCARTLIST",result.data)
        }
    },
    //删除购物车列表数据
    async deleteCartListBySkuId({ commit },skuId) {
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200) {
            return 'ok';
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById({ commit },{skuId,isChecked}) {
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code == 200) {
            return 'ok';
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}) {
        //context:小仓库
        //获取购物车中全部的产品
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId) :'';
            //将每一次返回的promise添加到数组当中
            PromiseAll.push(promise);
        });
        //只要全部的p1|p2.....都成功，返回的结果即为成功
        return Promise.all(PromiseAll);
    },
    //修改全部产品的状态
    updateAllCartChecked({dispatch,state},isChecked) {
        //数组
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach((item)=> {
            let promise = dispatch("updateCheckedById",{
                skuId:item.skuId,
                isChecked,             
            });
            //将每一次返回的promise添加到数组当中
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    }
};

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
};

//对外暴露store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})