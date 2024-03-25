<template>
    <div class="app-container">
        <div class="title">
            <p>主页</p>
            <P @click="black">添加黑名单</P>
        </div>
        <p>
            允许GO work 的主播
        </p>
        <div style="display:flex">
            <p class="p" :label="x" v-for="(x, i) in goworkList" :key="i" @click="goWork(x)"
                :style="x.dictValue == '0' ? { color: 'gray' } : { color: '#1890ff' }"> <i class="el-icon-circle-check
" :style="x.dictValue == '0' ? { color: 'gray' } : { color: '#1890ff' }"></i>{{ x.dictLabel }}</p>
        </div>
        <p>
            允许使用Super work mode的主播
        </p>
        <div style="display:flex">
            <p class="p" :label="x" v-for="(x, i) in superworkList" :key="i" @click="upergoWork(x)"
                :style="x.dictValue == '0' ? { color: 'gray' } : { color: '#1890ff' }"> <i class="el-icon-circle-check
" :style="x.dictValue == '0' ? { color: 'gray' } : { color: '#1890ff' }"></i>{{ x.dictLabel }}</p>
        </div>
    </div>
</template>

<script>
import {
    selectMoreDictDataByDictType, updateDictValueByReq
} from "@/api/operate/anchormanagement/index";
export default {
    components: {}, //注册组件
    name: "",
    data() {
        return {
            // 遮罩层
            loading: true,
            checkList: [],
            checkListmode: [],
            goworkDis: false,
            goworkDisad: false,
            upgoworkDis: false,
            upgoworkDisad: false,
            goworkList: [

            ],
            superworkList: [],
            radio: ""
        };
    },
    created() {
        this.init()
    },
    mounted() {

    },
    methods: {
        init() {
            selectMoreDictDataByDictType({ "dictTypes": ['allow_gowork_provider', 'allow_super_gowork_provider'] }).then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.goworkList = res.data.allow_gowork_provider;
                    this.superworkList = res.data.allow_super_gowork_provider;
                }
            })
        },
        goWork(val) {

            updateDictValueByReq({
                dictType: val.dictType,
                dictKey: val.dictKey,
                dictValue: val.dictValue == "0" ? "1" : "0"
            }
            ).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '成功',
                        type: 'success'
                    });
                    this.init()
                }
            })

        },
        upergoWork(val) {
            updateDictValueByReq({
                dictType: val.dictType,
                dictKey: val.dictKey,
                dictValue: val.dictValue == "0" ? "1" : "0"
            }
            ).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '成功',
                        type: 'success'
                    });
                    this.init()
                }
            })
        },
        black() {
            this.$store.dispatch("tagsView/delView", this.$route);
            location.href = `${window.location.origin}/#/operate/Super/blackList`
        },

    },
};
</script>

<style lang="scss" scoped>
.app-container {

    .title {
        display: flex;

        p {
            width: 100px;
            height: 40px;
            background: rgb(48, 47, 47);
            border-radius: 10px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            margin: 0 5px;
        }
    }

    button {
        width: 100px;
        height: 40px;
        border-radius: 10px;
        text-align: center;
        line-height: 40px;
        color: #222;
        margin: 15px;
        border: none;
    }

    .el-icon-successd {
        color: rgb(3, 136, 245);
    }

    .p {
        margin: 2px 15px;
        padding: 0 5px;
    }


}
</style>
