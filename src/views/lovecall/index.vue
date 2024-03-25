<template>
    <div class="lovecallall">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="A级用户" name="alevelusee">
                <Alevelusee v-if="activeName == 'alevelusee'" ref="alevelusee" />
            </el-tab-pane>
            <el-tab-pane label="B级用户" name="blevelusee">
                <Blevelusee v-if="activeName == 'blevelusee'" ref="blevelusee" />
            </el-tab-pane>
            <el-tab-pane label="C级用户" name="clevelusee">
                <Clevelusee v-if="activeName == 'clevelusee'" ref="clevelusee" />
            </el-tab-pane>
            <el-tab-pane label="D级用户" name="dlevelusee">
                <Dlevelusee v-if="activeName == 'dlevelusee'" ref="dlevelusee" />
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import Alevelusee from './alevelusee.vue'
import Blevelusee from './blevelusee.vue'
import Clevelusee from './clevelusee.vue'
import Dlevelusee from './dlevelusee.vue'
export default {
    components: {
        Alevelusee,
        Blevelusee,
        Clevelusee,
        Dlevelusee
    },
    data () {
        return {
            activeName: 'alevelusee',

        }
    },
    methods: {
        handleClick (tab, event) {
            this.activeName = tab.name
        },
    },
}
</script>
<style scoped lang="scss">
.lovecallall {
    padding: 0px 20px;
}
</style>
