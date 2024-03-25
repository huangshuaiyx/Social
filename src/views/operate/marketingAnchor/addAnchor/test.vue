<template>
  <div  style="margin-top:50px">
      <!-- <video :src="videoSrc" id="videoPlay" height="414" width="720" style="margin-top:50px" controls="controls">您的浏览器不支持 video 视屏播放。</video> -->
      <video :src="videoSrc" controls style="width:1000px;"></video>
        <div>
            <img :src="imgSrc">
        </div>
        <div>
            <button @click="cutPicture">
                截图
            </button>
        </div>
        <canvas id="myCanvas" width="343" height="200"></canvas>
  </div>
</template>

<script>
export default {
    data() {
        return {
            videoSrc:'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
            imgSrc:''
        }
    },
    methods: {
        //截取当前帧的图片
        cutPicture(){
            var v = document.querySelector("video");
            let canvas = document.getElementById('myCanvas')
            var ctx = canvas.getContext('2d');                  
            ctx.drawImage(v, 0, 0, 343, 200);
            var oGrayImg = canvas.toDataURL('image/jpeg');
            this.imgSrc = oGrayImg
        },
    }
}
</script>
