<template>
    <el-container>
        <h5 style="text-align: left; font-size: 30px;">用户列表</h5>
        <el-header style="text-align: right">
            <el-autocomplete
                    :fetch-suggestions="providernameSearch"
                    placeholder="请输入用户序号"
                    @select="handleProvidername"
                    :trigger-on-focus="false"
            ></el-autocomplete>
            <el-button v-on:click="findUserList">搜索</el-button>
        </el-header>

        <el-main>
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column
                        v-for="(item,i) in title"
                        :key="i"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                ></el-table-column>
                <el-table-column label="操作" v-if="showOper">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">删除用户</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">加入黑名单</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <!--<table border="2">-->
            <!--<font>{{ message }}</font>-->
            <!--<tr>-->
                <!--<th v-for="th in title">{{th}} </th>-->
            <!--</tr>-->
            <!--<tr v-for = "user in users">-->
                <!--<td>{{user.userId}}</td>-->
                <!--<td >{{user.userPhone}}</td>-->
                <!--<td >{{user.userPassword}}</td>-->
                <!--<td>{{user.nickname}}</td>-->
                <!--<td >{{user.userEmail}}</td>-->
                <!--<td >{{user.userCreateTime}}</td>-->
                <!--<td>{{user.status}}</td>-->
            <!--</tr>-->
        <!--</table>-->
        <!--<button v-on:click="findUserList">查找全部用户</button>-->
        <!--<button v-on:click="findUserById">按照用户id查找用户</button>-->
    </el-container>
</template>

<script>
    export default {
        name: "HomePage",
        data () {
            return {
                showOper:true,
                message: "用户列表",
                title:[
                    { prop: "id", label: "序号", width: 180 },
                    { prop: "phone", label: "电话", width: 200 },
                    { prop: "password", label: "密码", width: 200 },
                    { prop: "avatar", label: "昵称", width: 200 },
                    { prop: "email", label: "邮箱", width: 200 },
                    { prop: "createTime", label: "创建时间", width: 200 },
                    { prop: "status", label: "黑名单", width: 200 },
                    // '序号','电话','密码','昵称','邮箱','用户创建时间','是否位于黑名单'
                ],
                tableData: [
                    { id: 1, phone:"17866666666", password:"123456", avatar: "小明", email:"1306664814@qq.com", createTime: "2010-1-2", status:"0" },
                    { id: 2, phone:"17866667777", password:"1234567", avatar: "小红", email:"1306667867@qq.com", createTime: "2015-1-2", status:"0" },
                    { id: 3, phone:"17866668888", password:"1234568", avatar: "小刚", email:"1306666666@qq.com", createTime: "2020-1-2", status:"0" },
                ],
                userId: 1,
                users: []
            }
        },
        methods: {
            providernameSearch(queryString,callback){
                var list = [{}]
                if(queryString && queryString.length>0){
                    let parms = {
                        name:queryString
                    }
                    providerformFindProvider(parms).then(res=>{
                        if(res.status == "ok"){
                            //处理成自己想要的格式
                            list = res.data.map(item=>{
                                return {
                                    id:`${item.id}`,
                                    value:`${item.name}`
                                }
                            })
                            callback(list);
                        }
                    })
                }
            },
            handleProvidername(item){
                this.query.providername = item.value;
                this.providername = item.value;
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            // 获取用户信息列表
            findUserList(){
                this.$axios
                    .post('/admin/homePage/findAll',{})
                    .then(successResponse => {
                        console.log(successResponse)
                        this.user = successResponse.data
                    })
                    .catch(failResponse => {
                        console.log("请求出现错误")
                    })
            },
            // 通过用户id获取用户信息
            findUserById(){
                this.$axios
                    .post('/admin/homePage/findById',{
                        userId: this.userId
                    })
                    .then(successResponse => {
                        this.user = successResponse.data
                    })
                    .catch(failResponse => {
                        console.log("请求出现错误")
                    })
            }
        }
    }
</script>

<style scoped>

</style>