<template>
  <div>
    <input type="file" @change="uploadFile" id="fileInput" />
    <el-button @click="cutImage">截取视频第一帧</el-button>
    <video :src="videoUrl" controls="controls" id="fileVideo">您的浏览器不支持视频播放</video>
    视频第一帧： <img :src="videoImg">
    <canvas id="myCanvas" width="320" height="200" style="display:none"></canvas>
  </div>
</template>
<script>
export default {
  name: "videoupload",
  data () {
    return {
      videoUrl: '',
      videoImg: '',
      fileDetail: null
    }
  },
  methods: {
    cutImage () {
      // 获取音频标签
      let video = document.getElementById('fileVideo')
      let canvas = document.getElementById('myCanvas') // 获取 canvas 对象
      const ctx = canvas.getContext('2d') // 绘制2d
      video.crossOrigin = 'anonymous' // 解决跨域问题，也就是提示污染资源无法转换视频
      video.currentTime = 1 // 第一帧
      video.oncanplay = () => {
        console.log('video', video)
        canvas.width = video.clientWidth // 获取视频宽度
        canvas.height = video.clientHeight // 获取视频高度
        // 利用canvas对象方法绘图
        ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight)
        // 转换成base64形式
        const imgUrl = canvas.toDataURL('image/png') // 截取后的视频封面
        this.videoImg = [imgUrl]
      }
    },
    uploadFile () {
      // 获取上传文件标签
      let filesId = document.getElementById('fileInput')
      // 获取音频标签
      let video = document.getElementById('fileVideo')
      this.fileDetail = filesId.files
      console.log('fileDetail', this.fileDetail)
      let url = this.getFileURL(filesId.files[0])
      if (url) {
        this.isShowVideo = true
        // 给video标签设置src
        video.src = url
      }
    },
    getFileURL (file) {
      let getUrl = null
      if (window.createObjectURL !== undefined) {
        getUrl = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        // window.URL 标准定义
        // mozilla(firefox)
        // 获取一个http格式的url路径，这个时候就可以设置<img>中的显示
        getUrl = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        getUrl = window.webkitURL.createObjectURL(file)
      }
      return getUrl
    }
  }
}
</script>

<style lang="less" scoped>
</style>
