<template>
    <div id="guige">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="主播ID" prop="providerUserId">
                <el-input v-model="zhuboID" placeholder="请输入参数名称" clearable size="small"
                    style="width: 240px" @keyup.enter.native="handleQuery" />
            </el-form-item>
        </el-form>
        <H2>补贴规格</H2>
        <el-button class="addButton" type="primary" round size="small" @click="specificationAdd"
            style="margin-top:15px">添加
        </el-button>
        <div class="guisd" v-for="(x, i) in subsidyList" :key="i">
            <div>
                <p>设定补贴时段</p>
                <div style="margin-bottom:15px">
                    <el-time-select placeholder="起始时间" v-model="x.startTime" :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '24:00'
                    }" format='HH:mm:ss'>
                    </el-time-select>
                    <span style="font-size:20px;margin-left:20px;margin-right:20px">to</span>
                    <el-time-select placeholder="结束时间" v-model="x.endTime" :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '24:00',
                        minTime: x.startTime
                    }" format='HH:mm:ss'>
                    </el-time-select>
                </div>
            </div>
            <div>
                <p>设定补贴规格</p>
                <el-select v-model="x.specification" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <p>设定补贴时段达标时长上下限(小时)</p>
                <el-input-number v-model="x.durationStarts"  controls-position="right" @change="handleChangeStarts(x.durationStarts)" :min="1"
                    :max="10"></el-input-number>
                /
                <el-input-number v-model="x.durationEnd" controls-position="right" @change="handleChangeEnd(x.durationEnd)" :min="1"
                    :max="10"></el-input-number>
            </div>

            <div>
                <p>操作</p>
                <el-button type="danger" round size="small" @click="specificationDelet(i)" style="margin-top:15px">删除
                </el-button>
            </div>
        </div>

        <div class="but">
            <button>确定</button>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            // 更改补贴弹框
            centerDialogVisible: false,
            subsidyData: {
                startTime: '',
                endTime: '',
                id: null,
                specification: '',
                durationStarts: "",
                durationEnd: ""
            },
            subsidyList: [],
            /**补贴规格 */
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            /**主播ID */
            zhuboID:""
        };
    },
    methods: {
        /**添加补贴主播 */
        specificationAdd() {
            let subsidyData = { ...this.subsidyData }
            subsidyData.id += 1
            this.subsidyList.push(subsidyData)
            console.log(subsidyData)
        },
        /**时段 */
        handleChangeStarts(x){
            console.log(this.subsidyData.durationStarts,x)
        },
         /**时段 */
        handleChangeEnd(x){
            console.log(this.subsidyData.durationEnd,x)
        },
        /**删除 */
        specificationDelet(index){
            this.subsidyList.splice(index, 1);
        }
    }
}
</script>


<style lang="scss" scoped>
#guige {
    width: 100%;
    height: 100%;
    padding: 0 0 100px;
    overflow: hidden;

    H2 {
        width: 100%;
        text-align: center;
    }

    .addButton {
        position: absolute;
        top: 10px;
        right: 100px;
    }

    .guisd {
        display: flex;
        justify-content: flex-start;
        width: 90%;
        height: 80%;
        border: solid 1px;
        margin: 0 auto;

        div {
            margin: 20px;

            p {
                text-align: center;
            }
        }
        .el-input-number--medium {
            width: 80px;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 150px;
        }

    }
    .but{
        width: 100%;
        height: 100px;
        position: absolute;
        bottom: 0;
    }

}
</style>
