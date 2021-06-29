<template>
  <div>
    <div  class="my-reply">
      <el-avatar class="header-img" :size="40" :src="user.avatar"></el-avatar>
      <div class="reply-info" >
        {{user.nickname}}
        <el-form :model="comment" label-width="80px">
          <el-form-item>
            <el-input
                type="textarea"
                :rows="2"
                v-model="comment.commentContent" placeholder="请输入评论">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="reply-btn"
                       size="medium" @click="sendComment" type="primary">发表评论</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>

    <div style="margin-top: 40px">
      <div class="comments-area">
        <el-card style="text-align: left">
          <div v-for="comment in comments" :key="comment.comment.commentId" >
            <div style="float:left;width:85%;height: 150px;">
              <el-divider content-position="left">
                <router-link class="article-link" :to="{path:'/otherhome?userId='
              +comment.user.userId}">
                                  <span style="font-size: 20px">
                  <strong >{{comment.user.nickname}}</strong>
                </span>
                </router-link>
                <div>
                  <strong >{{comment.comment.commentCreateTime}}</strong>
                </div>
              </el-divider>
              <span style="font-size: 20px">
                <el-avatar
                    class="header-img"
                    :size="40"
                    :src="comment.user.avatar"></el-avatar>
              </span>
                <p>{{comment.comment.commentContent}}</p>

            </div>
          </div>
        </el-card>
      </div>
      <!--分页-->
      <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
  data(){
    return{
      //分页查询评论数据
      comments: [],
      // //分页查询相应发送评论用户数据
      // users:[],
      pageSize: 4,
      total: 0,
      //用户评论数据
      comment: {
        commentId:'',
        userId: '',
        blogId:'',
        commentContent:'',
        //获取当前时间，设置时间格式
        commentCreateTime:new Date().Format("yyyy-MM-dd HH:mm:ss"),
        //默认评论消息提醒未读
        status:0,
        //默认评论为审核中状态
        pass:0
      },
      //已登录用户数据
      user:{
        userId:this.$store.state.user.userId,
        avatar:this.$store.state.user.avatar,
        nickname:this.$store.state.user.nickname
      },
    }
  },
  mounted () {
    //打开界面时载入所有评论
    this.$axios.get('/commentnum/'+this.$route.query.blogId).then(resp=>{
      this.total= resp.data
    })
    this.loadComments()
  },
  methods: {
    //载入所有评论
    loadComments () {
      this.$axios.get('/comment/'+this.$route.query.blogId+'/' + this.pageSize + '/1').then(resp => {
          console.log("成功读取评论！")
          console.log(resp.data)
          this.comments = resp.data
          // this.total = resp.data.totalElements
          console.log("获取评论查询数据")
          console.log(this.comments)
        // console.log(this.comments[0])
          console.log("登录状态：")
          console.log(this.$store.state)
      })
    },
    //捕捉页面改变
    handleCurrentChange (page) {
      var _this = this
      this.$axios.get('/comment/'+this.$route.query.blogId+'/'+ this.pageSize + '/' + page).then(resp => {
          _this.comments = resp.data
      }).catch(failResponse => {
        console.log(failResponse);
      })
    },
    //评论文章
    sendComment(){
      // //输入为空
      if(this.comment.commentContent === "") {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      }
      else{
        //获取当前时间
        var timestamp = new Date( +new Date() )
        console.log("时间:")
        console.log(timestamp); //1495302061441
        this.$axios
            .post('/addcomment', {
              // commentId 后端 自增
              userId:this.$store.state.user.userId,
              blogId:this.$route.query.blogId,
              // blogId:1,
              commentContent:this.comment.commentContent,
              commentCreateTime:timestamp,
              status:this.comment.status,
              pass:this.comment.pass
            })
            .then(response2 => {

              console.log('显示response2!')
              console.log(response2.data.blogId)
              //发表评论后刷新页面
              this.loadComments()
              this.$axios.get('/sendOneWebSocket/'
                  +response2.data.blogId+'/comment')
                  .then(response2=> {
                    console.log("111")
                  })
              this.$message({
                showClose: true,
                type: 'warning',
                message: '评论发送成功,待审核通过后评论将会显示！'
              })
            })
            .catch(error => {
              console.log(error)
            })
        }
    },
    // //评论时间处理函数
    // dateStr(date){
    //   //获取js 时间戳
    //   var time=new Date().getTime();
    //   //去掉 js 时间戳后三位，与php 时间戳保持一致
    //   time=parseInt((time-date)/1000);
    //   //存储转换值
    //   var s;
    //   if(time<60*10){//十分钟内
    //     return '刚刚';
    //   }else if((time<60*60)&&(time>=60*10)){
    //     //超过十分钟少于1小时
    //     s = Math.floor(time/60);
    //     return  s+"分钟前";
    //   }else if((time<60*60*24)&&(time>=60*60)){
    //     //超过1小时少于24小时
    //     s = Math.floor(time/60/60);
    //     return  s+"小时前";
    //   }else if((time<60*60*24*30)&&(time>=60*60*24)){
    //     //超过1天少于30天内
    //     s = Math.floor(time/60/60/24);
    //     return s+"天前";
    //   }else{
    //     //超过30天ddd
    //     var date= new Date(parseInt(date));
    //     return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    //   }
    // }
  }
}
</script>




<!--使用stylus-loader-->
<!--执行以下语句导入-->
<!--npm i stylus stylus-loader &#45;&#45;save-dev-->
<style lang="stylus" scoped>
.comments-area
  width: 990px
  height: 750px
  margin-left: auto
  margin-right: auto
.my-reply
  padding 10px
  background-color #fafbfc
  .header-img
    display inline-block
    vertical-align top
  .reply-info
    display inline-block
    margin-left 5px
    width 90%
    @media screen and (max-width:1200px) {
      width 80%
    }
    .reply-input
      min-height 20px
      line-height 22px
      padding 10px 10px
      color #ccc
      background-color #fff
      border-radius 5px
      &:empty:before
        content attr(placeholder)
      &:focus:before
        content none
      &:focus
        padding 8px 8px
        border 2px solid blue
        box-shadow none
        outline none
</style>
