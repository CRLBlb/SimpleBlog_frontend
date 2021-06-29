<template>
  <div class="grid-content bg-purple">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的关注</span>
      </div>
<!--      <div class="personal-relation" v-for="(star, index) in stars" @click="toOther(star.userId)">-->
      <div class="personal-relation" v-for="(star, index) in stars" >
        <router-link class="relation-item" :to="{path:'otherhome'
              ,query:{userId: star.userId}}">{{star.nickname}}</router-link>
        <el-divider></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
name: "FollowBar",
  data(){
  return{
    stars:[]
  }
  },
  methods:{
    toOther(starid){

      this.$router.push({
        name:"OtherHome",
        params:{starid:starid}
      })
    }
  },
  mounted() {
    this.$axios.get("/follow/"+this.$store.state.user.userId).then((res)=> {
          this.stars = res.data
        }
    )
  }
}
</script>

<style scoped>

</style>