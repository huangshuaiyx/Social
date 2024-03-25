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
                <el-tab-pane label="Host in Us" name="first">
                    <fristtable ref="first" />
                </el-tab-pane>
                <el-tab-pane label="Recommend Join" name="second">
                    <scendtable ref="second" />
                </el-tab-pane>
                <el-tab-pane label="Recommend Removal" name="third">
                    <threetable ref="third" />
                </el-tab-pane>
                <el-tab-pane label="Blocked Host List" name="fourth">
                    <fivetable ref="fourth" />
                </el-tab-pane>
                <el-tab-pane label="Search All" name="alltable">
                    <alltable ref="alltable" />
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    components: {
        fristtable: () => import('./fristtable.vue'),
        scendtable: () => import('./scendtable.vue'),
        threetable: () => import('./threetable.vue'),
        fivetable: () => import('./fivetable.vue'),
        alltable: () => import('./alltable.vue'),
    },
    data () {
        return {
            activeName: "first",
            heights: '105px'
        }
    },
    created () {

    },
    methods: {
        handleClick () {
            switch (this.activeName) {
                case 'first':
                    this.$refs.first.getDataList()
                    break;
                case 'second':
                    this.$refs.second.getDataList()
                    break;
                case 'third':
                    this.$refs.third.getDataList()
                    break;
                case 'fourth':
                    this.$refs.fourth.getDataList()
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

