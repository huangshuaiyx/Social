<template>
    <div class="app-container">
        <el-form :inline="true" v-show="showSearch">

            <el-form-item label="" prop="userId">
                <el-input v-model="userId" placeholder="请输入内容" size="small" style="width: 400px" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="WordPageListd()">查询
                </el-button>
            </el-form-item>
        </el-form>
        <div class="center" v-show="data != null">{{ data }}</div>

    </div>
</template>
<script>
import {
    refreshToken,
} from "../../../api/remoteControl/index.js";

export default {
    name: "Config",
    data() {
        return {
            // 遮罩层
            loading: false,
            // 导出遮罩层
            exportLoading: false,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 查询参数
            userId: null,
            // 表单参数
            form: {},
            data: null
        };
    },
    created() {
    },
    methods: {
        /** 查询用户信息 */
        WordPageListd() {
            if (this.userId == null || this.userId == "") {
                this.$message.error('请输入内容');
            } else {
                refreshToken({ appId: this.userId }).then((response) => {
                    console.log(response)
                    if (response.code == 200) {
                        this.data = response.data
                    }
                });
            }

        },
    },
};
</script>


<style lang="scss" scoped>
.center {
    width: 460px;
    padding: 10px;
    height: auto;
    // border: solid 1px #999;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.302);
    overflow: hidden; //超出的文本隐藏
    // text-overflow: ellipsis; //溢出用省略号显示
    // white-space: nowrap; //溢出不换行
    word-break: break-all;
}
</style>