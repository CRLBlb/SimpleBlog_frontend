<template>
    <el-container>
        <el-aside width="250px">
            <admin-check-side-bar></admin-check-side-bar>
        </el-aside>
        <router-view/>
    </el-container>
</template>

<script>
    import AdminCheckSideBar from "../common/AdminCheckSideBar"
    export default {
        name: "Check",
        components: {
            AdminCheckSideBar
        }
    }
</script>

<style scoped>

</style>