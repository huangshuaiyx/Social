<style scoped lang="scss">
.tablist {
    display: flex;
    margin: 10px;
    .box-card {
        flex: 1;
        overflow: auto;
    }
    // .box-card::-webkit-scrollbar {
    //     width: 4px;
    // }
    // .box-card::-webkit-scrollbar-thumb {
    //     border-radius: 10px;
    //     background: rgba(0, 0, 0, 0.2);
    // }
    // .box-card::-webkit-scrollbar-track {
    //     border-radius: 0;
    //     background: rgba(0, 0, 0, 0.1);
    // }
}
</style>
<template>
    <div class="tablist">
        <el-card class="box-card" :style="{height:`calc(100vh - ${heights})`}">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="private收入" name="private">
                    <private ref="private" />
                </el-tab-pane>
                <el-tab-pane label="match收入" name="match">
                    <match ref="match" />
                </el-tab-pane>
                <el-tab-pane label="消息收入" name="message">
                    <message ref="message" />
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    components: {
        private: () => import('./list/private'),
        match: () => import('./list/match'),
        message: () => import('./list/message.vue'),
    },
    data () {
        return {
            activeName: "private",
            heights: '105px'
        }
    },
    created () {

    },
    methods: {
        handleClick () {
            switch (this.activeName) {
                case 'private':
                    this.$refs.private.getdatalist()
                    break;
                case 'match':
                    this.$refs.match.getdatalist()
                    break;
                case 'message':
                    this.$refs.message.getdatalist()
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

