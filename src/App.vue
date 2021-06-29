<template>
  <div id="app">
    <!--子组件显示位置-->
    <!--通过isRouterAlive属性 控制<router-view>的显示隐藏-->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // 使用provide/inject 组合，调用reload方法，
  // 需要刷新的页面中注入App.vue组件提供（provide）的 reload 依赖
  // ，然后直接用this.reload来调用就行
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    // 让isRouterAlive显示一遍再隐藏一遍以实现刷新
    reload(){
      this.isRouterAlive =false;
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
