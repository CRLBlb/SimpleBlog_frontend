<template>
    <div>
        <el-col :span="2">
            <!--<h5>默认颜色</h5>-->
            <el-menu
                    router
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                <el-menu-item index="1" :index="'/admin/broadcast/list'">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>公告列表</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="2" :index="'/admin/broadcast/push'">
                    <i class="el-icon-menu"></i>
                    <span slot="title">公告推送</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "AdminBroadcastSideBar",
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