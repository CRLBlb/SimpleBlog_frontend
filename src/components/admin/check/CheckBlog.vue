<template>
    <el-container>
        <el-main>
            <div>
                <h5 style="text-align: left; font-size: 30px;">待审核博文列表</h5>
                <div style="text-align: right; font-size: 24px">
                    <el-input style="width: 200px" v-model="input" placeholder="请输入博文序号"></el-input>
                    <el-button @click="findBlogById">查询</el-button>
                </div>
            </div>
            <div v-if="isVisual">
                <el-table
                        :data="arraySearchData"
                        border
                        key="tableData.blogId"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="blogId"
                            label="博文序号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="blogCreateTime"
                            label="创建时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="userId"
                            label="作者"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="简介"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="博客状态"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
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
                        key="tableData.blogId">
                    <el-table-column
                            prop="blogId"
                            label="博文序号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="blogCreateTime"
                            label="创建时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="userPhone"
                            label="作者"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="简介"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="博客状态"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="detail(scope.row)" type="text" size="small">查看详情</el-button>
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
        name: "CheckBlog",
        data() {
            return {
                input: "",
                tableData: [],
                arraySearchData:[],
                searchData: "",
                isVisual: false,
                user:{}
            }
        },
        methods: {
            detail(row) {
                this.$router.push({name:'BlogDetail',params:{blogId:row.blogId}})
            },
            findAllBlog(){
                this.$axios
                    .post('/admin/blog/findAll')
                    .then(successResponse => {
                        this.tableData = successResponse.data
                        // 将userId找到对应的用户并加到表格当中
                        let i
                        for(i=0;i<this.tableData.length;i++){
                        }
                        // 修改博客状态
                        for(i = 0;i<this.tableData.length;i++){
                            if(this.tableData[i].status === 0){
                                this.tableData[i].status = '未审核'
                            } else if(this.tableData[i].status === 1) {
                                this.tableData[i].status = '审核通过'
                            } else if(this.tableData[i].status === 2){
                                this.tableData[i].status = '审核未通过'
                            }
                            this.findUserById(this.tableData[i].userId,i)
                        }
                    })
                    .catch(failResponse => {
                        this.$notify.error({
                            title: '错误',
                            message: '请求出现错误！'
                        });
                    })
            },
            findBlogById(){
                this.isVisual = true
                let url = '/admin/blog/findBlogById/' + this.input
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
            findUserById(userId,i){
                let url = '/admin/user/findById/' + this.tableData[i].userId
                this.$axios
                    .post(url)
                    .then(successResponse =>{
                        this.user = successResponse.data
                        this.tableData[i].userPhone = this.user.userPhone
                        let temp = this.tableData[i].blogId
                        this.tableData[i].blogId = 0
                        this.tableData[i].blogId = temp
                    })
            }
        },
        mounted(){
            this.findAllBlog()
        }
    }
</script>

<style scoped>

</style>