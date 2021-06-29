<template>
    <!--<el-card>-->
        <!--用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>-->
        <!--<br><br>-->
        <!--密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>-->
        <!--<br><br>-->
        <!--<button v-on:click="login">登录</button>-->
    <!--</el-card>-->
    <el-form class="login-container" label-position="left"
             label-width="0px">
        <h3 class="login_title">系统登录</h3>
        <el-form-item>
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="loginForm.password"
                      auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

    export default {
        name: 'Login',
        data () {
            return {
                loginForm: {
                    adminId: 1,
                    username: 'admin',
                    password: '123456'
                },
                responseResult: []
            }
        },
        methods: {

             // 管理员登录方法
            login () {
                this.$axios
                    .post('/admin/login',{
                        adminName: this.loginForm.username,
                        adminPassword: this.loginForm.password
                    })
                    .then(successResponse => {
                        console.log(successResponse.data.code)
                         // 登录成功，跳转到index界面
                        if (successResponse.data.code === 200) {
                            this.$router.replace({path: '/admin/home'})
                        } else if(successResponse.data.code === 400){
                            const h = this.$createElement;

                            this.$notify({
                                title: '用户名或密码错误',
                                message: h('b', { style: 'color: red'}, '请输入正确的用户名或密码！')
                            });
                        }
                    })
                    .catch(failResponse => {
                        const h = this.$createElement;

                        this.$notify({
                            title: '标题名称',
                            message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
                        });
                        console.log("请求出现错误")
                    })
            }
        }
    }
</script>
<style>
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

</style>
