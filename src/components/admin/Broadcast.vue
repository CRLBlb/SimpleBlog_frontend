<template>
    <el-container>
        <el-aside width="250px">
            <!--style="background-color: rgb(238, 241, 246)"-->
            <admin-broadcast-side-bar></admin-broadcast-side-bar>
        </el-aside>
        <router-view/>
    </el-container>
</template>

<script>
    import AdminBroadcastSideBar from "../common/AdminBroadcastSideBar"
    export default {
        name: "Broadcast",
        components: {
            AdminBroadcastSideBar
        }

    }
</script>


