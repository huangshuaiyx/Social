<template>
  <div class="videos">
    <div v-loading="loading">
      <el-upload
        class="upload-demo"
        ref="uploads"
        action="#"
        :http-request="uploadFiles"
        accept="mp4"
        :auto-upload="false"
        multiple
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUploads"
          >上传到服务器</el-button
        >
      </el-upload>
    </div>

    <div style="margin-top: 5px">
      <div
        v-for="(x, i) in formData.introductionVideoList"
        :key="i"
        style="position: relative"
      >
        <el-image
          :src="x.videoCoverPicture"
          :preview-src-list="[x.videoCoverPicture]"
          fit="cover"
          class="imgas"
          style="margin-left: 10px; width: 100px; height: 100px"
        >
        </el-image>
        <i
          class="el-icon-delete"
          style="position: absolute; right: 50px; top: 4px; z-index: 99"
          @click="delImg(x.id)"
          v-show="formData.introductionVideoList != null"
        ></i>
        <video
          :src="x.url"
          style="width: 200px; height: 100px; color: red"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
import {
  AlluploadImg,
  batchIncreaseMarketAnchorResource,
  delResource,
  getMarketAnchorInformation,
} from "@/api/operate/marketingAnchor/anchorList/index";
import { dataURLtoFile } from "../../../../utils/index";
export default {
  props: ["formData"],
  data() {
    return {
      /**遮罩层 */
      loading: false,
      property: "value",
      formDataIMGP: {},
      coverUrl: "",
      file: "",
    };
  },
  mounted() {
    console.log(window);
  },
  methods: {
    uploadFiles(file) {
      this.formDataIMGP.append("file", file.file);
      this.file = file;
    },
    async submitUploads() {
      this.loading = true;
      this.formDataIMGP = new FormData();
      this.$refs.uploads.submit();
      const { data: res } = await AlluploadImg(this.formDataIMGP);
      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("发布失败！");
      } else {
        this.loading = false;
        let arr = [];
        res.data.map((x) => {
          arr.push({ url: x.url, type: 3 });
        });
        this.formData.faceVideo = arr;
        console.log(this.formData.faceVideo);
        this.$refs.uploads.clearFiles();
        batchIncreaseMarketAnchorResource({
          resourceDefinitionList: this.formData.faceVideo,
          userId: this.formData.userId,
          type: 3,
        }).then((res) => {
          if (res.code == 200) {
            this.getMarketAnchorInformation();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        });
      }
    },
    /**删除资源 */
    delImg(val) {
      console.log(123);
      delResource({ resourceId: val }).then((res) => {
        if (res.code == 200) {
          getMarketAnchorInformation({ userId: this.formData.userId }).then(
            (res) => {
              if (res.code == 200) {
                this.formData = res.data;
              }
            }
          );
          this.$message({
            type: "success",
            message: "删除成功",
          });
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>

</style>