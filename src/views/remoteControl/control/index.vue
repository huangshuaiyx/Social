<template>
    <div class="app-container">
        <el-form :model="queryParams" :inline="true" v-show="showSearch" style="display: grid;">

            <el-form-item label="" prop="userId">
                <el-input v-model="queryParams.userId" placeholder="请输入userId" clearable size="small"
                    style="width: 240px" />
            </el-form-item>

            <el-form-item label="" prop="bizType">
                <el-select v-model="queryParams.bizType" placeholder="请输入参数" style="width:240px">
                    <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="" prop="payload" style="width:100%">
                <el-input style="width:240px" type="textarea" :rows="10" placeholder="请输入内容" v-model="queryParams.payload">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="mini" @click="WordPageListd()">发送
                </el-button>
            </el-form-item>
            {{ data }}
        </el-form>
    </div>
</template>
<script>
import {
    sendAppRemoteControl,
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
            queryParams: {
                appId: 200101,
                productId: 2001,
                userId: null,
                bizType: null,
                payload: null,
            },
            // 表单参数
            form: {},
            //   渠道
            options: [
                { value: "FILE_UPLOAD", label: "文件上传" },
                { value: "FILE_DELETE", label: "文件删除" },
                { value: "SCREEN_SHOT", label: "截图" },
                { value: "SCREEN_RECORD", label: "录屏" },
            ],
            data: null
        };
    },
    created() {
    },
    methods: {
        /** 查询用户信息 */
        WordPageListd() {
            let queryParams = { ...this.queryParams }
            if (queryParams.payload != null && queryParams.payload != "") {
                queryParams.payload = JSON.parse(queryParams.payload);
            } else {
                queryParams.payload = null;
            }
            sendAppRemoteControl(queryParams).then((response) => {
                console.log(response)
                if (response.code == 200) {
                    this.data = response.data
                }
            });
        },

        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },

    },
};
</script>


<style lang="scss" scoped>
.el-form-item--medium {
    .el-form-item__content {
        width: 80% !important;
    }
}

</style>