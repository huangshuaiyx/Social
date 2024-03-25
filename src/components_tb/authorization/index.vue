<template>
    <div id="authorization">
        <!-- 淘宝授权 -->
        <van-popup class="shouquan" :value="show" @input="v => $emit('changeShow', v)" round :close-on-click-overlay="false">
            <h3>淘宝授权</h3>
            <p>应淘宝要求</p>
            <p>用户必须进行淘宝授权才能购买商品</p>
            <button @click="shouquan">前往淘宝授权</button>
            <img @click="popupimg" src="../../assets/删除icon@2x.png" alt />
        </van-popup>
    </div>
</template>
<script>
import { baseUrl } from '@/config'
export default {
    name: 'authorization',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        popupimg() {
            this.$emit('changeShow', false)
        },
        //淘宝授权
        shouquan() {
            window.location.href = `https://oauth.taobao.com/authorize?response_type=code&client_id=30191213&redirect_uri=http://192.168.1.215:8080&state=1212&view=wap`
        }
    }
}
</script>
<style lang="scss" scoped>
#authorization {
    /* 淘宝授权 */
    .shouquan {
        width: 17.19rem;
        height: 12.56rem;
        text-align: center;
        h3 {
            width: 100%;
            height: 1.5625rem;
            margin: 1.25rem auto;
        }
        p {
            font-size: 0.88rem;
            color: #999999;
        }
        button {
            width: 14.6875rem;
            height: 2.75rem;
            background: #ff6303;
            border-radius: 1.38rem;
            border: none;
            color: white;
            margin-top: 2rem;
        }
        img {
            position: absolute;
            top: 0.5rem;
            right: 0.4rem;
        }
    }
}
</style>
