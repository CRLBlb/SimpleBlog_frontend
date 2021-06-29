<template>
  <div>

    <searchUserBar @onSearchUser="searchResult" ref="searchUserBar"></searchUserBar>
    <div style="margin-top: 40px">
      <div class="users-area">
        <el-card style="text-align: left">
          <div v-for="user in users" :key="user.userId">
            <div style="float:left;width:85%;height: 150px;">
              <!--点击用户昵称跳转到相应用户首页-->
              <router-link class="user-link" :to="{path:'/otherhome'
              ,query:{userId: user.userId}}">
                <span style="font-size: 20px"><strong>{{user.nickname}}</strong></span>
              </router-link>
<!--              <el-divider content-position="left">-->
<!--                {{user.userCreateTime}}-->
<!--              </el-divider>-->
              <router-link class="user-link" :to="{path:'/otherhome'
              ,query:{userId: user.userId}}">
                <p>{{user.userEmail}}</p>
              </router-link>
<!--              <el-divider content-position="right">-->
<!--                <i class="el-icon-caret-top"></i>-->
<!--                {{user.likeNum}}-->
<!--                <i class="el-icon-star-on"></i>-->
<!--                {{user.collectionNum}}-->
<!--              </el-divider>-->
            </div>
            <!--            文章封面-->
            <el-image
                style="margin:18px 0 0 30px;width:100px;height: 100px"
                :src="user.avatar"
                fit="cover">
            </el-image>
            <el-divider>
            </el-divider>
          </div>
        </el-card>
      </div>
      <!--      分页-->
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

<!--引入阿里图标库 https://www.iconfont.cn/collections/detail?cid=614-->

<script>
import SearchUserBar from "@/components/blog/SearchUserBar";

export default {
  name: 'Blogs',
  components: {SearchUserBar},
  data () {
    return {
      users: [],
      pageSize: 4,
      total: 0
    }
  },
  mounted () {
    this.loadUsers()
  },
  methods: {
    loadUsers () {
      var _this = this
      this.$axios.get('/user/findbynickname/' + this.pageSize + '/1'+'?nickname=').then(resp => {
        if (resp && resp.data.code === 200) {
          console.log("成功通过nickname查询用户信息")
          _this.users = resp.data.result.content
          _this.total = resp.data.result.totalElements
          console.log(_this.users[0])
        }
      })
    },
    //监控分页改变
    handleCurrentChange (page) {
      var _this = this
      this.$axios.get('/user/findbynickname/'
          + this.pageSize + '/' + page+'/'+'?nickname='+this.$refs.searchUserBar.searchnickname).then(resp => {
        if (resp && resp.data.code === 200) {
          _this.users = resp.data.result.content
          _this.total = resp.data.result.totalElements
        }
      }).catch(failResponse => {
        console.log(failResponse);
      })
    },
    //通过昵称进行搜索
    searchResult () {
      const _this = this;
      this.$axios
          .get('/user/findbynickname/'+ this.pageSize+'/1'+'?nickname='
              + this.$refs.searchUserBar.searchnickname, {
          }).then(resp => {
        if (resp && resp.status === 200) {
          console.log("成功查询用户信息！")
          _this.users = resp.data.result.content
          _this.total = resp.data.result.totalElements
          console.log(resp.data.result.content)
          console.log(resp.data.result.totalElements)
          console.log(this.$refs.searchUserBar.searchnickname)
        }
        else{
          console.log("查询用户信息失败！")
        }
      })
      // this.$axios.get('/blog/' + this.pageSize + '/1').then(resp => {
      //   if (resp && resp.data.code === 200) {
      //     console.log("succ")
      //     _this.blogs = resp.data.result.content
      //     _this.total = resp.data.result.totalElements
      //     console.log(_this.blogs[0])
      //   }
      // })
    },
  }
}
</script>



<style scoped>
.users-area {
  width: 990px;
  height: 750px;
  margin-left: auto;
  margin-right: auto;
}

.user-link {
  text-decoration: none;
  color: #606266;
}

.user-link:hover {
  color: #409EFF;
}

.active {
  color: #fff;
  border-bottom: 1px solid red;
}
</style>

