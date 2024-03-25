<template>
    <div id="googleStore">
        <div class="googleStore-div">
            <p>Update <span>{{ formData.appName }}</span></p>
            <p><span> {{ formData.appName }}</span>recommends that you update to latest version.</p>
            <div class="imgDiv">
                <img src="../../assets/one.png" alt="" />
                <img src="../../assets/two.png" alt="" />
                <img src="../../assets/three.png" alt="" />
                <img src="../../assets/ford.png" alt="" />
            </div>
            <p>Invitation Code: <span>{{ formData.verifyCode }}</span></p>
            <button @click="copyOrderId2(formData.verifyCode)">Copy</button>
            <p>{{formData.downloadLink}}</p>
            <div class="googleStore-div-div" @click="downClick">Click to download</div>
            <!-- <div style="height: 50px;" @click="downClick1">Click to download</div>
            <div style="height: 50px;" @click="downClick2">Click to download</div>
            <a href="www.baidu.com">go baidu</a> -->
        </div>
    </div>
</template>

<script>
import index from "./index.js";
export default index;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>