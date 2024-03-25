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

    <div style="display: flex; justify-content: flex-start; margin-top: 5px">
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
          style="position: absolute; right: 3px; top: 4px"
          @click="delImg(x.id)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import {
  AlluploadImg,
  batchIncreaseMarketAnchorResource,
  uploadImg,
} from "@/api/operate/marketingAnchor/anchorList/index";
import { dataURLtoFile } from "../../../../utils/index";
export default {
  data() {
    return {
      /**遮罩层 */
      loading: false,
      property: "value",
      formData: {},
      formDataIMGP: {},
      coverUrl: "",
      file: "",
    };
  },
  mounted() {
    let asd = dataURLtoFile(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg==",
      "name"
    );
    console.log(asd);
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
        this.formData.privateAlbumList = arr;
        console.log(this.formData.privateAlbumList);
        this.$refs.uploads.clearFiles();
        batchIncreaseMarketAnchorResource({
          resourceDefinitionList: this.formData.privateAlbumList,
          userId: getQueryString("id"),
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

  },
};
</script>


<style lang="scss" scoped>
.videos {
  width: 400px;
  height: 150px;
  border: solid 1px;
  div:nth-child(2) {
    width: 100px;
    height: 100px;
    border: solid 1px;
  }
}
</style>