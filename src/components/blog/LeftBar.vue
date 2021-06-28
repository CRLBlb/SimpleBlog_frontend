<template>

  <div class="grid-content bg-purple" >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>作者信息</span>
      </div>

      <div>
        <el-image :src="authorInfo.avatar"
                  style="width: 100px;height: 100px; border-radius: 50%;margin-bottom: 20px"></el-image>
      </div>
      <span style="color:#222226;font-size:22px;font-weight:500;line-height:24px;">
        {{ authorInfo.nickname }}</span>
      <el-divider></el-divider>
      <el-card>
        <div class="personal-relation">
          <div class="relation-title">昵称:</div>
          <div class="relation-item">{{ authorInfo.nickname }}</div>
        </div>
        <div class="personal-relation">
          <div class="relation-item">Email:</div>
          <div class="relation-item">{{ authorInfo.userEmail }}</div>
        </div>
      </el-card>
      <el-divider></el-divider>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LeftBar",
  data() {
    return {
      authorInfo: {
        avatar: "",
        nickname: "",
        userEmail: "",
      },

    }
  },
  mounted() {
    // console.log("获取blogId")
    // console.log(this.$route.query.blogId)
    this.loadAuthorInfo(this.$route.query.blogId)
  },
  methods: {
    loadAuthorInfo(){
      this.$axios
          //根据blogId获取博文作者的userId
          .get('/blog/'+this.$route.query.blogId, { // 前端发送get请求
          })
          .then(response1 => {
            console.log("博文查询结果:")
            console.log(response1.data.result.userId)
            this.$axios
                .get('/user/'+1, { // 前端发送get请求
                })
                .then(response2 => {
                  console.log("作者查询结果:")
                  console.log(response2.data)
                  this.authorInfo.nickname = response2.data.nickname
                  this.authorInfo.userEmail = response2.data.userEmail
                  this.authorInfo.avatar = response2.data.avatar
                })
                // 错误处理
                .catch(error => {
                  console.log(error)
                  console.log('STH WRONG WITH IT')
                })
          })
          // 错误处理
          .catch(error => {
            console.log(error)
            console.log('STH WRONG WITH IT')
          })
    }
  }
}
</script>

<style scoped>
.personal-relation{
  display: flex;
}

</style>