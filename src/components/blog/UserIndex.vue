<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <!--      <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>-->
      <!--      <SideMenu  ref="sideMenu"></SideMenu>-->
    </el-aside>
    <el-main>
      <users class="users-area" ref="usersArea"></users>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from "@/components/blog/SideMenu";
import Users from "@/components/blog/Users";

export default {
  name: "UserIndex",
  components: {Users, SideMenu},

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