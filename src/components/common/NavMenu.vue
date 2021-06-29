<template>
  <el-menu
      :default-active="'/index'"
      router
      mode="horizontal"
      background-color="white"
      text-color="#222"
      style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <el-submenu index="2" style="float: right; margin-right: 200px;" >
      <template slot="title">
      <!--用户头像-->
        <el-avatar :src="avatar" />
      </template>
      <el-submenu index="2-4">
        <template slot="title" >消息中心</template>
        <el-menu-item index="/information/broadcast">
          <el-badge is-dot :hidden="broadcast_tag" class="item">公告</el-badge>
        </el-menu-item>
        <el-menu-item index="/information/comment">
          <el-badge is-dot :hidden="comment_tag" class="item">评论</el-badge>
        </el-menu-item>
        <el-menu-item index="/information/follow">
          <el-badge is-dot :hidden="follow_tag" class="item">关注</el-badge>
        </el-menu-item>
        <el-menu-item index="/information/like">
          <el-badge is-dot :hidden="like_tag" class="item">点赞</el-badge>
        </el-menu-item>
        <el-menu-item index="/message">
          <el-badge is-dot :hidden="!unreadMessage" class="item">私信</el-badge>
        </el-menu-item>
        <el-menu-item index="/information/set">
          <el-badge is-dot :hidden="true" class="item">设置</el-badge>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="2-2" @click="userlogout" >退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>



export default {
  props:{
    comment:"",
    like:'',
    broadcast:'',
    follow:'',
    message:'',
    info:''
  },
  name: 'NavMenu',

  mounted() {
    this.$axios.get("/checkUnreadMessage?id="+this.$store.state.user.userId).then(success=>{
      this.unreadMessage = success.data
    })
  },


  //监听器
  watch: {
    comment: function (val) {
      this.comment_tag = val
    },
    follow: function (val) {
      this.follow_tag = val
    },
    broadcast: function (val) {
      this.broadcast_tag = val
    },
    like: function (val) {
      this.like_tag = val
    },
    message:function (val) {
      this.message_tag = val
    }
  },
  data () {
    return {
      unreadMessage:'',
      info_tag:true,
      count:0,
      broadcast_tag:this.broadcast,
      comment_tag:this.comment,
      follow_tag:this.follow,
      like_tag:this.like,
      message_tag:this.message,
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/blog', navItem: '博客'},
        {name: '/user', navItem: '博主'},
        {name: '/userhome', navItem: '个人中心'}
      ],
      //搜索框输入内容
      search_user:"",
      avatar:this.$store.state.user.avatar
    }
  },
  methods: {
    //用户登出
    userlogout () {
      console.log(this.$store.state.user) // 控制台打印日志
      window.localStorage.clear() // 清除所有缓存
      this.$router.replace({ path: '/login' })
    },
    //根据昵称搜索博主信息
    handleSearch () {
      let search_user = this.search_user
      let _this = this

      this.$axios
          .get('/findbynickname/'+ 4+'/1'+'?nickname='
              + search_user, {
          }).then(resp => {
        if (resp && resp.status === 200) {
          // console.log(resp)
          // _this.blogs = resp.data
          console.log("成功查询博主用户信息！")
          _this.blogs = resp.data.result.content
          _this.total = resp.data.result.totalElements
          console.log(_this.blogs[0])
        }
      })

    },
  }
}
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
