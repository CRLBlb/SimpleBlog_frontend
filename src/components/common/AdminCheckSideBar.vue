<template>
    <div>
        <el-col :span="3">
            <!--<h5>默认颜色</h5>-->
            <el-menu
                    default-active="3"
                    router
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                <el-menu-item index="1" :index="'/admin/check/blog'">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>博文审核</span>
                    </template>
                    <!--<el-menu-item-group>-->
                        <!--<template slot="title">分组一</template>-->
                        <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
                        <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
                    <!--</el-menu-item-group>-->
                    <!--<el-menu-item-group title="分组2">-->
                        <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
                    <!--</el-menu-item-group>-->
                    <!--<el-submenu index="1-4">-->
                        <!--<template slot="title">选项4</template>-->
                        <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
                    <!--</el-submenu>-->
                </el-menu-item>
                <el-menu-item index="2" :index="'/admin/check/comment'">
                    <i class="el-icon-menu"></i>
                    <span slot="title">评论审核</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "AdminSideBar",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>