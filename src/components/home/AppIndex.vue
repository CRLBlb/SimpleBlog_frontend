<template>
  <div style="margin-top: 40px">
    <div class="home">
      <div id="header-div">
        <div style="height: 150px"></div>
        <carousel></carousel>
      </div>
      <hot-blogs></hot-blogs>
    </div>
  </div>
</template>

<script>
import Carousel from './Carousel'
import HotBlogs from "@/components/blog/HotBlogs";
export default {
  name: 'AppIndex',
  components: {Carousel,HotBlogs}
}
</script>

<style scoped>
.home {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -20px;
}

#header-div {
  padding-bottom: 20px;
  padding-left: 5px;
  background-color: white;
}

#side-menu {
  position: fixed;
  margin-left: 50%;
  left: -680px;
  top: 100px;
}
</style>
