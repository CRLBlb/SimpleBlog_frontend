<template>
    <el-container>
        <el-main>
            <div>
                <h5 style="text-align: left; font-size: 30px;">待审核评论列表</h5>
                <!--<div style="text-align: right; font-size: 24px">-->
                    <!--<el-input style="width: 200px" v-model="input" placeholder="请输入评论序号"></el-input>-->
                    <!--<el-button @click="findById">查询</el-button>-->
                <!--</div>-->
            </div>
            <div v-if="isVisual">
                <el-table
                        :data="arraySearchData"
                        border
                        style="width: 100%"
                        :key="tableData.commentId">
                    <el-table-column
                            fixed
                            prop="commentId"
                            label="评论序号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="commentCreateTime"
                            label="创建时间"
                            width="200">
                    </el-table-column>

                    <el-table-column
                            prop="blogTitle"
                            label="隶属博文"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="userPhone"
                            label="发表者"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="commentContent"
                            label="内容"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="评论状态"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="审批结果"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="pass(scope.row)" type="text" size="small" style="color:green">通过</el-button>
                            <el-button @click="unpass(scope.row)" type="text" size="small" style="color:red">不通过</el-button>
                            <!--<el-button type="text" size="small">编辑</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-else>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                        :key="tableData.commentId">
                    <el-table-column
                            fixed
                            prop="commentId"
                            label="评论序号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="commentCreateTime"
                            label="创建时间"
                            width="200">
                    </el-table-column>

                    <el-table-column
                            prop="blogTitle"
                            label="隶属博文"
                            width="200"
                            :key="tableData.blogTitle">
                    </el-table-column>
                    <el-table-column
                            prop="userPhone"
                            label="发表者账号"
                            width="150"
                            :key="tableData.userPhone">
                    </el-table-column>
                    <el-table-column
                            prop="commentContent"
                            label="内容"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="pass"
                            label="评论状态"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="审批结果"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="pass(scope.row)" type="text" size="small" style="color:green">通过</el-button>
                            <el-button @click="unpass(scope.row)" type="text" size="small" style="color:red">不通过</el-button>
                            <!--<el-button type="text" size="small">编辑</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        // inject:['reload'],
        name: "CheckComment",
        data() {
            return{
                tableData:[],
                arraySearchData:[],
                searchData:{},
                isVisual: false,
                input:"",
                user:{}
            }
        },
        methods:{
            findAllComments(){
                this.$axios
                    .post('/admin/comment/findAll')
                    .then(successResponse => {
                        this.tableData = successResponse.data
                        console.log(this.tableData[0].status)
                        // 将评论状态的数字改为中文
                        let i
                        for(i = 0;i<this.tableData.length;i++){
                            if(this.tableData[i].pass === 0){
                                this.tableData[i].pass = '未审核'
                            } else if(this.tableData[i].pass === 1) {
                                this.tableData[i].pass = '审核通过'
                            } else{
                                this.tableData[i].pass = '审核未通过'
                            }
                            // 将发表者账号加上(强行改key，不能常用)，改着改着就乱了
                            this.findPublisherId(this.tableData[i].userId,i)
                            // 将博客标题添加上
                            this.findBlogTitleByCommentId(this.tableData[i].commentId,i)
                        }
                    })
                    .catch(failResponse => {
                        this.$notify.error({
                            title: '错误',
                            message: '请求出现错误！'
                        });
                    })
            },
            findById(){
                let url = '/admin/comment/find/' + this.input
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.searchData = successResponse.data
                        this.arraySearchData.pop();
                        this.arraySearchData.push(this.searchData);
                    })
                    .catch(failResponse => {
                        this.$notify.error({
                            title: '错误',
                            message: '请求出现错误！'
                        });
                    })
            },
            pass(row){
                let url = '/admin/comment/changeStatus/'+row.commentId+'/1'
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.findAllComments()
                        this.$notify.success({
                            title: '成功',
                            message: '更改成功!',
                        });
                    })
                    .catch(failResponse => {
                        this.$notify.error({
                            title: '错误',
                            message: '请求出现错误！'
                        });
                    })
            },
            unpass(row){
                let url = '/admin/comment/changeStatus/'+row.commentId+'/0'
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.findAllComments()
                        this.$notify.success({
                            title: '成功',
                            message: '更改成功!',
                        });
                    })
                    .catch(failResponse => {
                        this.$notify.error({
                            title: '错误',
                            message: '请求出现错误！'
                        });
                    })
            },
             // 直接在加载的时候加上
            findBlogTitleByCommentId(commentId,i){
                let url = '/admin/comment/findBlogByCommentId/'+commentId
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.tableData[i]['blogTitle'] = successResponse.data
                        this.tableData[i].commentId = 0
                        this.tableData[i].commentId = commentId
                        // 强行改key，强行重新渲染
                        // this.tableData[i]['commentId'] = 0
                        // this.tableData[i]['commentId'] = commentId
                    })
                    .catch(failResponse => {
                        this.$notify.error({
                            title: '错误',
                            message: '请求出现错误！'
                        });
                    })
            },
            // 通过用户id查找到发表者账号
            findPublisherId(userId,i){
                let url = '/admin/user/findById/'+userId
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.user = successResponse.data
                        this.tableData[i]['userPhone']=this.user.userPhone
                        // 强行改key，强行重新渲染
                        // this.tableData[i]['commentId'] = 0
                        // this.tableData[i]['commentId'] = commentId
                        // this.reload();
                    })
            }
        },
        mounted(){
            this.findAllComments()
            // this.reload()
        }

    }
</script>

<style scoped>

</style>