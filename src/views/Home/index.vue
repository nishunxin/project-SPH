<template>
  <div>
    <!-- 三级联动组件，不用再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor" />
    <Brand/>
  </div>
</template>

<script>
//引入其余组件
import ListContainer from '@/views/Home/ListContainer';
import Recommend from '@/views/Home/Recommend';
import Rank from '@/views/Home/Rank';
import Like from '@/views/Home/Like';
import Floor from '@/views/Home/Floor';
import Brand from '@/views/Home/Brand';
import {mapState} from 'vuex'
export default {
    name: '',
    components: {
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted(){
      //派发action，获取floor组件的数据
      this.$store.dispatch("getFloorList");

    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }
    
}
</script>

<style>

</style>