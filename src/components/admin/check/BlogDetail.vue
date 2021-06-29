<template>
    <el-container>
        <el-main>
            <el-header >
                <div style="font-size: 24px">
                    {{ blog.title }}
                </div>
                <br/>
                <div style="font-size: 18px; display:inline">
                    简介：{{blog.description}} 作者：{{user.userPhone}}
                    <div style="text-align: right;display:inline">
                        点赞数：{{blog.likeNum}} 收藏数：{{blog.collectionNum}} 评论数：{{blog.commentNum}}
                    </div>
                </div>
            </el-header>
            <el-main>
                <el-card>
<!--                    正文:-->
<!--                    <br/><br/>-->
                  <div class="markdown-body">
                    <div v-html="blog.htmlContent"></div>
                  </div>
                </el-card>


            </el-main>
            <el-footer>
                <el-button type="primary" @click="pass">予以通过</el-button>
                <el-button type="danger"  @click="unpass">不予通过</el-button>
            </el-footer>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "BlogDetail",
        data(){
            return {
                blogId: 1,
                blog:"",
                user:""
            }
        },
        methods:{
            findBlogById(){
                let url = '/admin/blog/findBlogById/'+this.blogId
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.blog = successResponse.data
                        this.getUserInformation()
                    })
            },
          // 获取用户信息
            getUserInformation(){
                let url = '/admin/user/findById/'+this.blog.userId
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.user = successResponse.data
                    })
            },
            pass(){
                let url = '/admin/blog/changeStatus/'+ this.blog.blogId +"/1"
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.$notify({
                            title: '审核成功',
                            message: '该篇文章审核通过',
                            type: 'success'
                        });
                        this.$router.push('/admin/check/blog')
                    })
            },
            unpass(){
                let url = '/admin/blog/changeStatus/'+ this.blog.blogId +"/0"
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.$notify({
                            title: '审核成功',
                            message: '该篇文章审核未通过',
                            type: 'warning'
                        });
                        this.$router.push('/admin/check/blog')
                    })
            }
        },
        mounted(){
            this.blogId=this.$route.params.blogId
            this.findBlogById()
        }
    }
</script>

<style scoped>

</style>