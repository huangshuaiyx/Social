<template>

    <div class="box">
        <!-- <div>{{ router }}</div> -->
        <div v-for="(item,index) in router.options.routes" :key="index">
            <!-- <div>{{ item }}</div> -->
            <!-- <div>{{ item.path }}</div> -->
            <span @click="junp(item.path)" class="item" v-if="item.meta">{{ item.meta.title }}</span>
            <!-- <div>{{ data.timerID }}</div> -->
        </div>
    </div>
</template>

<script setup>
import router from "@/router/indedx"
console.log(router.options.routes);
const junp = (val) => {
    router.push(val)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
    display: flex;
    flex-wrap: wrap;
    background: #fff;
}
.item {
    display: inline-block;
    width: 180px;
    height: 50px;
    line-height: 50px;
}
</style>
