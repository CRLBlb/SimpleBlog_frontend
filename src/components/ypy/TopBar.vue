<template>
  <el-menu class="el-menu-demo" mode="horizontal" router>
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{item.navItem}}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
name: "TopBar",
  data(){
    return{
      navList: [
        {name: '/userhome', navItem: '我的文章'},
        {name: '/postpage', navItem: '发表博客'},
        {name: '/mylike', navItem: '我的点赞'},
        {name: '/mycollection', navItem: '我的收藏'}
      ]

    }
  },

}
</script>

<style scoped>

</style>