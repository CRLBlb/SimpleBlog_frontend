<template>
    <div>
        <el-menu
                :default-active="'/index'"
                router
                mode="horizontal"
                background-color="white"
                text-color="#222"
                active-text-color="red"
                style="min-width: 1300px">
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                <div style="font-size: 20px;">{{ item.navItem }}</div>
            </el-menu-item>
        </el-menu>
    </div>

</template>

<script>
    import AdminSideBar from "./AdminCheckSideBar"
    export default {
        name: 'NavMenu',
        data () {
            return {
                navList: [
                    {name: '/admin/index', navItem: '首页'},
                    {name: '/admin/user', navItem: '用户管理'},
                    {name: '/admin/broadcast', navItem: '公告管理'},
                    {name: '/admin/check', navItem: '审核管理'}
                ]
            }
        },
        components: {
            AdminSideBar
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }
</style>
