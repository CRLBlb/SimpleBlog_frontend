<template>
    <el-container>
        <h5 style="text-align: left; font-size: 30px;">用户列表</h5>
        <el-header style="text-align: right">
            <el-input
                    style="width: 200px"
                    placeholder="请输入用户序号"
                    :trigger-on-focus="false"
                    v-model="userInput"
            ></el-input>
            <el-button v-on:click="findUserById">搜索</el-button>
        </el-header>

        <el-main>
            <!--搜索后的-->
            <div v-if="isVisual">
                <el-table :data="arraySearchData" style="width: 100%" border>
                    <el-table-column
                            v-for="(item,i) in title"
                            :key="i"
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                    ></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="warning"
                                    @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleStatus(scope.$index, scope.row)">改变黑名单状态</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--搜索前的-->
            <div v-else>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column
                            v-for="(item,i) in title"
                            :key="i"
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                    ></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="warning"
                                    @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleStatus(scope.$index, scope.row)">改变黑名单状态</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        // 依赖注入(在app.vue里面的刷新依赖)
        // inject: ['reload'],
        name: "UserList",
        data () {
            return {
                message: "用户列表",
                title:[
                    { prop: "userId", label: "序号", width: 100 },
                    { prop: "userPhone", label: "电话", width: 150 },
                    { prop: "userPassword", label: "密码", width: 200 },
                    { prop: "nickname", label: "昵称", width: 200 },
                    { prop: "userEmail", label: "邮箱", width: 200 },
                    { prop: "userCreateTime", label: "创建时间", width: 200 },
                    { prop: "status", label: "黑名单", width: 200 },
                ],
                tableData: [],
                userInput: "",
                searchData: {},
                arraySearchData: [],
                isVisual: false
            }
        },
        mounted(){
            this.findAllUsers()
        },
        methods: {
            // 获取全部用户列表
            findAllUsers(){
                this.$axios
                    .post('/admin/user/findAll')
                    .then(successResponse => {
                        this.tableData = successResponse.data
                        // 每条数据中添加一个字段用于确定是加入黑名单还是移出黑名单
                        this.tableData.forEach((value , index) => {
                            if(this.tableData[index].status){
                                value['blacklist'] = '加入黑名单'
                            } else {
                                value['blacklist'] = '移出黑名单'
                            }

                        })
                        // 修改位于黑名单的状态
                        let i
                        for(i = 0;i<this.tableData.length;i++){
                            if(this.tableData[i].status){
                                this.tableData[i].status = "状态正常"
                            }else{
                                this.tableData[i].status = "处于黑名单中"
                            }

                        }
                    })
                    .catch(failResponse => {
                        this.$notify.error({
                            title: '错误',
                            message: '请求出现错误！'
                        });
                    })
            },
            // 删除用户
            handleDelete(index, row) {
                this.$confirm('确定删除成员信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = '/admin/user/deleteById/'+row.userId
                    this.$axios
                        .post(url)
                        .then(successResponse => {
                            if(successResponse.data.code===200){
                                this.findAllUsers()
                                if(this.isVisual){
                                    this.findUserById()
                                }
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 加入黑名单
            handleStatus(index, row) {
                let url = '/admin/user/changeStatus/'+row.userId
                if(row.status==="处于黑名单中"){
                    url = url  + "/1"
                }else{
                    url = url + "/0"
                }
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        if(successResponse.data.code===200){
                            this.$notify.success({
                                title: '成功',
                                message: '更改成功!',
                            });
                        }else{
                            this.$notify.error({
                                title: '错误',
                                message: '更改失败！'
                            });
                        }
                        // 刷新慎用！！相当于重新加载界面
                        this.findAllUsers()
                        if(this.isVisual){
                            this.findUserById()
                        }
                        // 直接调用注入的依赖
                        // this.reload()
                    })
            },
            // 通过用户id获取用户信息
            findUserById(){
                this.isVisual = true
                let url = "/admin/user/findById/" + this.userInput
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.searchData = successResponse.data
                        // 添加一个字段用于确定是加入黑名单还是移出黑名单
                        if(this.searchData.status){
                            this.searchData.blacklist = '加入黑名单'
                        } else {
                            this.searchData.blacklist = '移出黑名单'
                        }
                        // 修改位于黑名单的状态
                        if(this.searchData.status){
                            this.searchData.status = "状态正常"
                        }else{
                            this.searchData.status = "处于黑名单中"
                        }
                        this.arraySearchData.pop();
                        this.arraySearchData.push(this.searchData);
                    })
                    .catch(failResponse => {
                        this.$notify.error({
                            title: '错误',
                            message: '请求出现错误！'
                        });
                    })
            }
        }
    }
</script>
