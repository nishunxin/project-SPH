import { reqGetSearchInfo } from '@/api';
//search模块的小仓库
const state = {
    searchList:{},
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    },
};
const actions = {
    //获取search模块数据
    async getSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params);
        if(result.code == 200) {
            commit("GETSEARCHLIST",result.data)
        }
    }
};
//计算属性：主要是简化仓库中的数据
const getters = {
    goodsList(state){
        return state.searchList.goodsList || [];
    },
    attrsList(state){
        return state.searchList.attrsList;
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}