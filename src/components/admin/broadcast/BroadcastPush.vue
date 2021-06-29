<template>
    <el-container>
        <el-main>
            <el-card style="width: 500px">
                <el-form ref="form"  :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="公告标题" prop="broadcastTitle">
                        <el-input v-model="form.broadcastTitle"></el-input>
                    </el-form-item>
                    <el-form-item on-value="1" off-value="0"  label="匿名发布" >
                        <el-switch on-value="1" off-value="0" v-model="anonymous">
                        </el-switch>
                    </el-form-item>
                    <!--此处应当转为admin_id-->
                    <el-form-item label="创建人" v-if="!anonymous" >
                        <el-select style="align: left" v-model="form.adminId" placeholder="请选择创建人">
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公告内容"  prop="broadcastContent">
                        <el-input type="textarea" v-model="form.broadcastContent"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="推送用户" >-->
                        <!--<el-select split-button="true" style="align: left" v-model="form.user" @change="handleUserId($event)" placeholder="请选择用户">-->
                            <!--<el-option label="全部用户" value="AllUser"></el-option>-->
                            <!--<el-option label="单个用户" value="OneUser"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="推送用户"  >
                        <el-select style="align: left" v-model="form.userId" placeholder="请选择推送用户">
                          <el-option v-for="user in users" :key="user.userId" :value="user.userId" :label="user.userPhone" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即推送</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "BroadcastPush",
        data() {
            return {
                temp: false,
                anonymous: 1,
                form: {
                    adminId: '',
                    userId: '',
                    broadcastTitle: '',
                    broadcastContent: '',
                    broadcastCreateTime: '',
                },
                userForm:{
                    broadcastId: '',
                    userId: '',
                },
                systemTime: "",
                rules: {
                  // 要以数组形式展示
                  broadcastTitle: [
                    { required: true, message: "标题不能为空", trigger: "change" },
                  ],
                  broadcastContent: [
                    { required: true, message: "标题不能为空", trigger: "change" },
                  ]
                },
              users:[]
          }
        },
        mounted() {
            this.findAllUser()
        },
        methods: {
          findAllUser(){
            console.log(this.users)
            this.$axios
                .post('/admin/user/findAll')
                .then(successResponse=>{
                  this.users = successResponse.data
                  console.log(this.users)
                })
          },
            handleUserId(event){
                // console.log(typeof (event))
                // if(event.equals("AllUsers")){
                //     this.temp = false
                // } else if(event.equals("OneUser")){
                //     this.temp = true
                // }
                if(event==="AllUser"){
                    this.temp = false
                    console.log(this.temp)
                } else if(event==="OneUser"){
                    this.temp = true
                    console.log(this.temp)
                }
            },
            onSubmit() {
                let nowDate = new Date()
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate()
                }
                let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
                this.systemTime = date.year + '-' + date.month + '-' + date.date + ' ' + hh +':'+ mf +':' +ss
                this.form.broadcastCreateTime = this.systemTime
                console.log(this.form);
                this.$axios
                    .post('/admin/broadcast/createBroadcast',this.form)
                    .then(successResponse => {
                        if(successResponse.data === -1){
                            this.$notify.error({
                                title: '失败',
                                message: '博文添加失败！'
                            });
                        } else {
                          console.log(successResponse.data)
                          console.log(this.form.userId)
                            this.userForm.broadcastId = successResponse.data
                            this.userForm.userId = this.form.userId
                            this.$axios
                                .post('/admin/broadcast/createUserBroadcast', this.userForm)
                                .then(successResponse => {
                                    if (successResponse.data === 200) {
                                        this.$notify.success({
                                            title: '成功',
                                            message: '博文添加成功！'
                                        });
                                    }
                                })
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>