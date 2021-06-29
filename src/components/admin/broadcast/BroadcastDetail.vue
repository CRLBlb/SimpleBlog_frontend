<template>
    <el-container >
        <el-main>
            <el-card class="box-card" style="width: 100%">
                <div slot="header" class="clearfix">
                    <span style="text-align:center; font-size: 50px" >{{broadcast.broadcastTitle}}</span>
                </div>
                <div>
                    {{broadcast.broadcastContent}}
                </div>
            </el-card>

        </el-main>


    </el-container>
</template>

<script>
    export default {
        name: "BroadcastDetail",
        data(){
            return {
                broadcastId: 1,
                broadcast:""
            }
        },
        methods:{
            findBroadcastById(){
                let url = '/admin/broadcast/findBroadcastById/'+ this.broadcastId
                this.$axios
                    .post(url)
                    .then(successResponse => {
                        this.broadcast = successResponse.data
                    })
            }

        },
        mounted(){
            this.broadcastId=this.$route.params.broadcastId
            this.findBroadcastById()
        }

    }
</script>

<style scoped>

</style>