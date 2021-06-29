<template>
    <el-container >
        <el-main>
            <div v-for="(broadcast,i) in broadcasts" >
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="text-align:center">{{ broadcast.broadcastTitle }}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="showDetail(broadcast.broadcastId)">查看</el-button>
                    </div>
                    <div>
                        {{ broadcast.broadcastContent }}
                    </div>
                </el-card>
                <br/>
            </div>
        </el-main>


    </el-container>
</template>

<script>
    export default {
        name: "BroadcastList",
        data(){
            return {
                broadcasts: []
            }
        },
        methods:{
            findAllBroadcasts(){
                this.$axios
                    .post('/admin/broadcast/findAll')
                    .then(successResponse => {
                         // 使用forEach+push的方式赋值数据，防止数据不加载
                        // successResponse.data.forEach(function (element) {
                        //     // 此句话报错，不知道为啥？？
                        //     this.broadcasts.push(element)
                        // })
                        this.broadcasts = successResponse.data
                        console.log(this.broadcasts)
                    })
                    .catch(failResponse => {
                        this.$notify.error({
                            title: '错误',
                            message: '无法查询到公告列表！'
                        });
                    })
            },
            showDetail(temp){
                this.$router.push({name:'BroadcastDetail',params:{broadcastId:temp}})
            }
        },
        mounted(){
            this.findAllBroadcasts()
        }
    }
</script>

<style scoped>

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both;
    }

    .box-card {
        width: 1200px;
    }
</style>