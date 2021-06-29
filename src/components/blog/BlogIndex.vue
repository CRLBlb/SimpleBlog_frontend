<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
<!--      <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>-->
<!--      <SideMenu  ref="sideMenu"></SideMenu>-->
    </el-aside>
    <el-main>
      <blogs class="blogs-area" ref="blogsArea"></blogs>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from "@/components/blog/SideMenu";
import Blogs from "@/components/blog/Blogs";

export default {
  name: "BlogIndex",
  components: {Blogs, SideMenu},

  methods: {
  }
}
</script>

<style scoped>
/*.blogs-area {*/
/*  width: 990px;*/
/*  margin-left: auto;*/
/*  margin-right: auto;*/
/*}*/
</style>