<template>
  <div class="home">
    <el-row :gutter="20" style="margin-top:10px;">
      <el-col :span="6">
        <!-- 左侧栏，显示个人用户信息-->
        <LeftBar style="margin-bottom: 50px"></LeftBar>
<!--        <LeftBar ></LeftBar>-->
        <FollowBar></FollowBar>
      </el-col>
      <el-col :span="18">
        <TopBar></TopBar>
        <PyLike></PyLike>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Content from "@/components/ypy/Content";
import LeftBar from "@/components/ypy/LeftBar";
import TopBar from "@/components/ypy/TopBar";
import FollowBar from "../components/ypy/FollowBar";
import PyLike from "@/components/ypy/PyLike";

export default {
  name: 'Home',
  components:{
    FollowBar,
    TopBar,
    PyLike,
    LeftBar,
  },

}
</script>
