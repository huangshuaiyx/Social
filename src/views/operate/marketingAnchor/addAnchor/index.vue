<template>
  <div>
    <div class="center">
      <div class="top" id="markId">
        <!-- 头像 -->
        <div>
          <p>*头像</p>
          <el-upload class="avatar-uploader" :action="''" :auto-upload="false" :show-file-list="false"
            :on-change="handleAvatarChangeIconF" v-loading="faceloading" accept=".jpg,.jpeg,.png">
            <img v-if="formData.face" :src="formData.face" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 海报 -->
        <div>
          <p>*海报</p>
          <el-upload class="avatar-uploader" :action="''" :auto-upload="false" :show-file-list="false"
            :on-change="handleAvatarChangeIconPr" v-loading="posterloading" accept=".jpg,.jpeg,.png">
            <img v-if="formData.poster" :src="formData.poster" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 介绍视频 -->
        <div>
          <p style="width: 100px">*介绍视频</p>
          <div class="videos">
            <div v-loading="loadingVideo" v-show="
              formData.introductionVideoList != null
                ? formData.introductionVideoList.length < 2
                : 0
            " style="margin-left: 12px">
              <!-- <el-upload
                class="upload-demo"
                ref="uploadsd"
                action="#"
                :http-request="uploadFileVideo"
                :on-change="changUpload"
                :on-remove="removeUpload"
                accept=".mp4"
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
                  @click="submitUploadVideo"
                  v-show="changUploadShow == 1"
                  >上传到服务器</el-button
                >
              </el-upload> -->

              <el-upload accept="video/mp4" :limit="2" ref="videoUpload"
                :action="url"
                list-type="picture-card" :on-success="videoSuccess" :on-remove="removeUpload">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :append-to-body="true">
                <video id="upvideo" width="100%" autoplay height="400" :src="dialogImageUrl" controls></video>
              </el-dialog>
            </div>

            <div style="margin-top: 5px">
              <div v-for="(x, i) in formData.introductionVideoList" :key="i" style="position: relative; width: 260px">
                <i class="el-icon-delete" style="
                    position: absolute;
                    right: 50px;
                    top: 4px;
                    z-index: 99;
                    color: red;
                  " @click="delImg(x.id)" v-show="formData.introductionVideoList != null"></i>
                <video :src="x.url" controls="controls" style="
                    width: 200px;
                    height: 100px;
                    color: red;
                    margin-left: 10px;
                  " autoplay></video>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 相册 -->
      <div class="album">
        <div style="margin-top: 10px">
          <span>*相册</span>
          <div v-if="formData.albumList.length < 20" v-loading="albumloading" style="margin-top: 5px">
            <el-upload class="upload-demo" ref="upload" action="#" :http-request="uploadFile" accept=".jpg,.jpeg,.png"
              :auto-upload="false" multiple :limit="20 - formData.albumList.length" :on-exceed="handleExceedsd"
              :on-change="changUploadfore" :on-remove="removeUploadfore">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload"
                v-show="changUploadShow4 == 1">上传到服务器</el-button>
            </el-upload>
          </div>

          <div style="display: flex; justify-content: flex-start; margin-top: 5px">
            <div v-for="(x, i) in formData.albumList" :key="i" style="position: relative">
              <el-image :src="x.url" :preview-src-list="[x.url]" fit="cover" class="imgas"
                style="margin-left: 10px; width: 100px; height: 100px">
              </el-image>
              <i class="el-icon-delete" style="position: absolute; right: 3px; top: 4px; color: red"
                @click="delImg(x.id)"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 私密相册 -->
      <div class="album">
        <div style="margin-top: 10px">
          <span>*私密相册</span>
          <div v-loading="privateloading" v-show="
            formData.privateAlbumList != null
              ? formData.privateAlbumList.length < 20
              : 0
          ">
            <el-upload class="upload-demo" ref="uploads" action="#" :http-request="uploadFiles"
              :on-change="changUploadtwo" :on-remove="removeUploadtwo" accept=".jpg,.jpeg,.png" :auto-upload="false"
              multiple>
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px" size="small" type="success" @click="submitUploadpr"
                v-show="changUploadShow2 == 1">上传到服务器</el-button>
            </el-upload>
          </div>

          <div class="identical">
            <div v-for="(x, i) in formData.privateAlbumList" :key="i" class="buju">
              <el-image :src="x.url" :preview-src-list="privateAlbumListYu" fit="cover" class="imgas"
                style="margin-left: 10px; width: 100px; height: 100px">
              </el-image>
              <i class="el-icon-delete" style="position: absolute; right: 3px; top: 4px; color: red"
                @click="delImg(x.id)"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 私密视频 -->
      <div style="display: flex; margin-top: 20px; height: 250px">
        <div style="margin-top: 10px">
          <span>*私密视频</span>
          <div class="videos">
            <div v-loading="loadingVideod" style="margin-top: 5px" v-show="
              formData.privateVideoList != null
                ? formData.privateVideoList.length < 2
                : 0
            ">
              <el-upload accept="video/mp4" :limit="2" ref="videoUploadPr"
                :action="url"
                list-type="picture-card" :on-success="videoSuccessPr">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :append-to-body="true">
                <video id="upvideo" width="100%" autoplay height="500" :src="dialogImageUrl" controls></video>
              </el-dialog>
            </div>

            <div style="margin-top: 5px">
              <div v-for="(x, i) in formData.privateVideoList" :key="i" style="position: relative; width: 260px">
                <!-- <el-image
                  :src="x.videoCoverPicture"
                  :preview-src-list="[x.videoCoverPicture]"
                  fit="cover"
                  class="imgas"
                  style="margin-left: 10px; width: 100px; height: 100px"
                >
                </el-image> -->
                <i class="el-icon-delete" style="
                    position: absolute;
                    right: 50px;
                    top: 4px;
                    z-index: 99;
                    color: red;
                  "
                  @click="delImg(x.id)" v-show="formData.introductionVideoList != null"></i>
                <video :src="x.url" controls="controls" style="
                    width: 200px;
                    height: 100px;
                    color: red;
                    margin-left: 10px;
                  " autoplay></video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 身高 体重  -->
      <div class="repeat" id="heightandweight">
        <p>
          <span>*身高</span>
          <el-input placeholder="请输入身高" v-model="formData.height" type="Number" @blur="heightblur(formData.height)"
            max="190" min="140">
            <template slot="append">cm</template>
          </el-input>
        </p>
        <p>
          <span>*体重</span>
          <el-input placeholder="请输入体重" v-model="formData.weight" @blur="weightblur(formData.weight)" max="80" min="40"
            type="number">
            <template slot="append">KG</template>
          </el-input>
        </p>
      </div>
      <!-- 昵称 地区 -->
      <div class="repeat" id="heightandweight">
        <p>
          <span>*昵称</span>
          <el-input placeholder="请输入昵称" v-model="formData.nickname" @blur="nicknameblur(formData.nickname)">
          </el-input>
        </p>
        <p >
          <span style="dispaly:block">*地区</span>
          <el-select v-model="formData.regionCode" :disabled="disabledregion" placeholder="请选择"
            @change="regionCodeblur(formData.regionCode)">
            <el-option v-for="item in optionsregion" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 20px; color: blue" @click="disabledregion = false">修改</span>
        </p>
      </div>
      <!-- 年龄 -->
      <div class="repeat" id="heightandweight">
        <p>
          <span>*年龄</span>
          <!-- <el-date-picker
            v-model="formData.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="birthdayChange(formData.birthday)"
          >
          </el-date-picker> -->
          <el-input placeholder="请输入年龄" v-model="formData.birthday" @blur="birthdayChange(formData.birthday)" max="100"
            min="18" type="number">
          </el-input>
        </p>
      </div>

      <!-- 标签 -->
      <div class="repeat" id="heightandweight">
        <div style="margin-top: 15px">
          <span>*标签</span>
          <el-tag v-for="(x, i) in formData.tagDefinitionList" :key="i" closable @close="handleClose(x.id)"
            style="line-height: 28px">
            {{ x.text }}</el-tag>

          <button @click="biaoqian" style="margin-left: 5px">+</button>
        </div>
      </div>
      <!-- 第一语言 第二语言 -->
      <div class="repeat" id="heightandweight">
        <p>
          <span>第一语言</span>
          <el-select v-model="formData.language" placeholder="请选择" @change="languagechange(formData.language)">
            <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </p>
        <p>
          <span>第二语言</span>
          <el-select v-model="formData.secondLanguage" placeholder="请选择"
            @change="secondchange(formData.secondLanguage)">
            <el-option v-for="item in secondlanguage" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </p>
      </div>
      <!-- 在线状态 -->
      <div class="repeatNew">
        <span>在线状态</span>
        <p>
          <el-radio-group v-model="formData.online" @change="onlinechange(formData.online)">
            <el-radio :label="0">不在线</el-radio>
            <el-radio :label="1">在线</el-radio>
          </el-radio-group>
        </p>
      </div>
      <!-- 自我介绍 -->
      <div class="repeatNew">
        <p>
          <span>自我介绍</span>
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="formData.selfIntroduction"
            @blur="selfIntroductionblur(formData.selfIntroduction)">
          </el-input>
        </p>
      </div>
      <!--  招呼语 -->
      <div class="repeatNew" id="heightandweight">
        <p>
          <span>招呼语</span>
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="formData.text"
            @blur="textblur(formData.text)">
          </el-input>
        </p>
        <p >
          <span> 招呼语图片 </span>
          <el-upload class="avatar-uploader" :action="''" :auto-upload="false" :show-file-list="false"
            :on-change="handleAvatarChangeIconZ" v-loading="imageloading" accept=".jpg,.jpeg,.png">
            <img v-if="formData.image" :src="formData.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </p>
      </div>
      <!-- 标签弹框 -->
      <el-dialog title="标签" :visible.sync="centerDialogVisible" width="80%" center :modal="false"
        :close-on-press-escape="false" :close-on-click-modal="false">
        <!-- <div
          style="display: flex; justify-content: flex-start; flex-wrap: wrap"
        >
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{
              city
            }}</el-checkbox>
          </el-checkbox-group>
        </div> -->

        <el-table ref="multipleTable" v-loading="loading" :data="umsInfos" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="标签" align="center" prop="text" width="150" />

          <el-table-column label="更新时间" align="center" prop="updateBy" width="150" />
          <el-table-column label="更新人" align="center" prop="updateTime" width="150" />
        </el-table>

        <!-- <el-pagination
          background
          layout="prev, pager, next"
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getTagPageList"
          style="margin-left:80%;margin-top:5px"
        >
        </el-pagination> -->

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="labelOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import Videos from "../addAnchor/videos.vue"; //视频
// import ProVideos from "../addAnchor/proVideos.vue";
// import VideoUpload from "../../../../components/videoUpload/index";
// import ImageUpload from "../../../../components/ImageUpload/index.vue";
import {upbaseUrl} from "../../../../config/index"
import {
  getMarketAnchorInformation,
  uploadImg,
  modifyMarketAnchorInformation,
  modifyMarketAnchorOnlineStatus,
  modifyMarketAnchorCall,
  AlluploadImg,
  insertOperationTag,
  delResource,
  increaseMarketAnchorResource,
  delTagAndUserRelation,
  batchIncreaseMarketAnchorResource,
} from "@/api/operate/marketingAnchor/anchorList/index";

import { getTagPageList } from "@/api/operate/taglibrary/index";

import { getQueryString } from "../../../../utils/index";
export default {
  props: ["infoId"],
  name: "addAnchor",
  // components: { Videos, VideoUpload, ProVideos },
  data() {
    return {
      // 资料信息
      formData: {
        face: "",
        video: [
          {
            url: "",
          },
          { url: "" },
        ],
        age: 1,
        nickName: "",
        weight: "",
        height: "",
        region: "",
        second: "",
        first: "",
        radio: "1",
        textarea1: "",
        table: [],
        albumList: [],
      },
      dialogVisible: false,
      datas: {},
      letter_intentFile: [],
      images: "",
      // 地区信息
      optionsregion: [
        {
          value: "ID",
          label: "Indonesia",
        },
        {
          value: "IN",
          label: "India",
        },
        {
          value: "VN",
          label: "Vietnam",
        },
        {
          value: "SA",
          label: "Saudi Arabia",
        },
        {
          value: "US",
          label: "United States",
        },
        {
          value: "ES",
          label: "Spain",
        },
        {
          value: "PT",
          label: "Portugal",
        },
        {
          value: "FR",
          label: "France",
        },
        {
          value: "RU",
          label: "Russia",
        },
        {
          value: "JP",
          label: "Japan",
        },
        {
          value: "BR",
          label: "Brazil",
        },
        {
          value: "HK",
          label: "Hongkong",
        },
        {
          value: "TW",
          label: "Taiwan",
        },
        {
          value: "TR",
          label: "Turkey",
        },
        {
          value: "KR",
          label: "Korea",
        },
        {
          value: "PH",
          label: "Philippines",
        },
        {
          value: "UA",
          label: "Ukraine",
        },
        {
          value: "TH",
          label: "Thailand",
        },
      ],
      // 第一语言
      language: [
        {
          value: "ID",
          label: "印尼",
        },
        {
          value: "en",
          label: "英语",
        },
        {
          value: "hi",
          label: "印地语",
        },
        {
          value: "ta",
          label: "泰米勒语",
        },
        {
          value: "ur",
          label: "乌尔都语",
        },

        {
          value: "ar",
          label: "阿拉伯语",
        },
        {
          value: "es",
          label: "西班牙语",
        },
        {
          value: "fr",
          label: "法语",
        },

        {
          value: "pt",
          label: "葡萄牙语",
        },
        {
          value: "ru",
          label: "俄语",
        },
        {
          value: "vi",
          label: "越南语",
        },
      ],
      // 第二语言
      secondlanguage: [
        {
          value: "ID",
          label: "印尼",
        },
        {
          value: "en",
          label: "英语",
        },
        {
          value: "hi",
          label: "印地语",
        },
        {
          value: "ta",
          label: "泰米勒语",
        },
        {
          value: "ur",
          label: "乌尔都语",
        },

        {
          value: "ar",
          label: "阿拉伯语",
        },
        {
          value: "es",
          label: "西班牙语",
        },
        {
          value: "fr",
          label: "法语",
        },

        {
          value: "pt",
          label: "葡萄牙语",
        },
        {
          value: "ru",
          label: "俄语",
        },
        {
          value: "vi",
          label: "越南语",
        },
      ],
      // 地区是否禁用
      disabledregion: true,
      // 标签
      centerDialogVisible: false,
      // 标签数组
      checkedCities: [],
      // 标签数组
      cities: [
      ],
      isIndeterminate: true,
      /**详情 */
      info: {},
      multiple: true,
      formDateUrl: "",
      // 标签查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 100,
        parmas: {
          userId: null,
          userCode: null,
          nickName: null,
          userType: null,
          showStatus: null,
        },
      },
      /** 标签列表*/
      umsInfos: [],
      // 标签遮罩层
      loading: false,
      // 标签总条数
      total: 0,
      /**选中标签 */
      multipleSelectionList: [],
      // 相册参数
      formDataIMG: {},
      // 私密相册参数
      formDataIMGP: {},
      /**海报遮罩 */
      posterloading: false,
      /**头像遮罩 */
      faceloading: false,
      /**介绍视频遮罩 */
      loadingVideo: false,
      /**私密视频 */
      loadingVideod: false,
      /**私密相册遮罩 */
      privateloading: false,
      /**相册遮罩 */
      albumloading: false,
      /**招呼语图片遮罩 */
      imageloading: false,
      /**判断上传按钮是否展示 */
      changUploadShow: 0,
      /**判断上传按钮是否展示 */
      changUploadShow2: 0,
      /**判断上传按钮是否展示 */
      changUploadShow3: 0,
      /**判断上传按钮是否展示 */
      changUploadShow4: 0,
      pathUrl: "",
      dialogImageUrl: "",
      /**私密相册预览 */
      privateAlbumListYu: [],
      /**相册预览 */
      albumListYu: [],
      url:`${upbaseUrl}/third/resource/uploadAndGetFileInformation`
    };
  },
  created() {
    this.getMarketAnchorInformation();
    console.log(
      JSON.parse(JSON.stringify(this.formDataIMGP)),
      this.formDataIMGP.length
    );
  },
  mounted() {
    this.findvideocover();
  },
  methods: {
    /**私密相册超出限制 */
    handleExceeds(files, fileList) {
      console.log("触发");
      this.$message.warning(
        `当前限制选择 20 个文件,本次选择了 ${files.length} 个文件，已上传 ${this.formData.privateAlbumList.length} 个文件`
      );
    },
    /**相册超出限制 */
    handleExceedsd(files, fileList) {
      console.log("触发");
      this.$message.warning(
        `当前限制选择 20 个文件,本次选择了 ${files.length} 个文件，已上传 ${this.formData.albumList.length} 个文件`
      );
    },
    /**获取初始参数 */
    getMarketAnchorInformation() {
      getMarketAnchorInformation({ userId: getQueryString("id") }).then(
        (res) => {
          if (res.code == 200) {
            this.formData = res.data;
            this.formData.privateAlbumList.map((x) => {
              this.privateAlbumListYu.push(x.url);
            });
            this.formData.albumList.map((x) => {
              this.albumListYu.push(x.url);
            });
          }
        }
      );
    },
    // 年龄修改
    handleChange(value) {
      console.log(value);
    },
    // 标签
    handleCheckedCitiesChange() {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 标签确定
    labelOk() {
      console.log(this.multipleSelectionList);
      this.centerDialogVisible = false;
      // this.formData.table = this.checkedCities;
      insertOperationTag({
        tagIdList: this.multipleSelectionList,
        userId: this.formData.userId,
      }).then((res) => {
        if (res.code == 200) {
          this.getMarketAnchorInformation();
          this.$message({
            type: "success",
            message: "保存成功",
          });
        }
      });
    },
    // 删除标签
    handleClose(tag) {
      delTagAndUserRelation({ userId: this.formData.userId, tagId: tag }).then(
        (res) => {
          if (res.code == 200) {
            this.getMarketAnchorInformation();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        }
      );
    },
    // 头像
    handleAvatarChangeIconF(file, fileList) {
      //选中文件触发的change事件
      // const isLt2M = file.raw.size / 1024 / 1024 < 0.5  //限制上传文件的大小
      this.faceloading = true;
      let data = new FormData();
      data.append("file", file.raw);
      uploadImg(data).then((res) => {
        if (res.data.code == 200) {
          modifyMarketAnchorInformation({
            face: res.data.data.url,
            userId: getQueryString("id"),
          }).then((res) => {
            if (res.code == 200) {
              this.faceloading = false;
              this.getMarketAnchorInformation();
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          });
        }
      });
    },
    // 海报
    handleAvatarChangeIconPr(file, fileList) {
      //选中文件触发的change事件
      console.log(file);
      this.posterloading = true;
      // const isLt2M = file.raw.size / 1024 / 1024 < 0.5  //限制上传文件的大小
      this.formData.poster = URL.createObjectURL(file.raw); //赋值图片的url，用于图片回显功能
      let data = new FormData();
      data.append("file", file.raw);
      uploadImg(data).then((res) => {
        if (res.data.code == 200) {
          modifyMarketAnchorInformation({
            poster: res.data.data.url,
            userId: getQueryString("id"),
          }).then((res) => {
            if (res.code == 200) {
              this.posterloading = false;
              this.getMarketAnchorInformation();
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          });
        }
      });
    },
    // 视频
    handleAvatarChangeIconV(file, fileList) {
      //选中文件触发的change事件
      console.log(file);
      // const isLt2M = file.raw.size / 1024 / 1024 < 0.5  //限制上传文件的大小
      this.formData.poster = URL.createObjectURL(file.raw); //赋值图片的url，用于图片回显功能
      let data = new FormData();
      data.append("file", file.raw);
      uploadImg(data).then((res) => {
        if (res.data.code == 200) {
          modifyMarketAnchorInformation({
            poster: res.data.data.url,
            userId: getQueryString("id"),
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
      });
    },

    // 私密相册
    uploadFiles(file) {
      this.formDataIMGP.append("file", file.file);
      console.log(
        JSON.parse(JSON.stringify(this.formDataIMGP)),
        this.formDataIMGP.length
      );
    },
    changUploadtwo(file) {
      console.log(file);
      if (file) {
        this.changUploadShow2 = 1;
      }
    },
    removeUploadtwo(file) {
      if (file) {
        this.changUploadShow2 = 0;
      }
    },
    async submitUploadpr() {
      this.privateloading = true;
      this.formDataIMGP = new FormData();
      this.$refs.uploads.submit();
      const { data: res } = await AlluploadImg(this.formDataIMGP);
      console.log(res, "上传结构");
      if (res.code !== 200) {
        return this.$message.error("发布失败！");
      } else {
        let arr = [];
        res.data.map((x) => {
          arr.push({
            url: x.url,
            type: 3,
            ext: x.ext,
            height: x.height,
            size: x.size,
            width: x.width,
            duration: x.duration,
          });
        });
        this.formData.privateAlbumList = arr;
        this.$refs.uploads.clearFiles();
        batchIncreaseMarketAnchorResource({
          resourceDefinitionList: this.formData.privateAlbumList,
          userId: getQueryString("id"),
          type: 3,
        }).then((res) => {
          if (res.code == 200) {
            this.privateloading = false;
            this.getMarketAnchorInformation();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        });
      }
    },
    /**身高 */
    heightblur(val) {
      console.log(val);
      if (val != null) {
        if (val < 140) {
          this.$message({
            type: "warning",
            message: "最低140cm",
          });
          this.formData.height = 140;
        } else if (val > 190) {
          this.$message({
            type: "warning",
            message: "最高190cm",
          });
          this.formData.height = 190;
        } else {
          modifyMarketAnchorInformation({
            height: val,
            userId: getQueryString("id"),
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
      } else {
        this.$message.warning("请输入身高");
      }
    },
    /**体重 */
    weightblur(val) {
      console.log(val);
      if (val != null) {
        if (val < 40) {
          this.$message({
            type: "warning",
            message: "最小40kg",
          });
          this.formData.weight = 40;
        } else if (val > 80) {
          this.$message({
            type: "warning",
            message: "最大80kg",
          });
          this.formData.weight = 80;
        } else {
          modifyMarketAnchorInformation({
            weight: val,
            userId: getQueryString("id"),
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
      } else {
        this.$message.warning("请输入体重");
      }
    },
    /**昵称 */
    nicknameblur(val) {
      console.log(val);
      if (val != null) {
        modifyMarketAnchorInformation({
          nickname: val,
          userId: getQueryString("id"),
        }).then((res) => {
          if (res.code == 200) {
            this.getMarketAnchorInformation();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        });
      } else {
        this.$message.warning("请输入昵称");
      }
    },
    /**地区 */
    regionCodeblur(val) {
      console.log(val);
      modifyMarketAnchorInformation({
        regionCode: val,
        userId: getQueryString("id"),
      }).then((res) => {
        if (res.code == 200) {
          this.disabledregion = true;
          this.getMarketAnchorInformation();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    /**年龄 */
    birthdayChange(val) {
      if (val != null) {
        if (val < 18) {
          this.$message({
            type: "warning",
            message: "最小18",
          });
          modifyMarketAnchorInformation({
            birthday: 18,
            userId: getQueryString("id"),
          }).then((res) => {
            if (res.code == 200) {
              this.disabledregion = true;
              this.getMarketAnchorInformation();
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          });
        } else if (val > 100) {
          this.$message({
            type: "warning",
            message: "最大100",
          });
          modifyMarketAnchorInformation({
            birthday: 100,
            userId: getQueryString("id"),
          }).then((res) => {
            if (res.code == 200) {
              this.disabledregion = true;
              this.getMarketAnchorInformation();
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          });
        } else {
          modifyMarketAnchorInformation({
            birthday: val,
            userId: getQueryString("id"),
          }).then((res) => {
            if (res.code == 200) {
              this.disabledregion = true;
              this.getMarketAnchorInformation();
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          });
        }
      } else {
        this.$message.warning("请输入年龄");
      }
    },
    /**第一语言 */
    languagechange(val) {
      console.log(val);
      modifyMarketAnchorInformation({
        language: val,
        userId: getQueryString("id"),
      }).then((res) => {
        if (res.code == 200) {
          this.disabledregion = true;
          this.getMarketAnchorInformation();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    /**第er语言 */
    secondchange(val) {
      console.log(val);
      modifyMarketAnchorInformation({
        secondLanguage: val,
        userId: getQueryString("id"),
      }).then((res) => {
        if (res.code == 200) {
          this.disabledregion = true;
          this.getMarketAnchorInformation();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    /*在线状态 */
    onlinechange(val) {
      console.log(val);
      modifyMarketAnchorOnlineStatus({
        onlineStatus: val,
        userId: getQueryString("id"),
      }).then((res) => {
        if (res.code == 200) {
          this.disabledregion = true;
          this.getMarketAnchorInformation();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    /*自我介绍 */
    selfIntroductionblur(val) {
      console.log(val);
      modifyMarketAnchorInformation({
        selfIntroduction: val,
        userId: getQueryString("id"),
      }).then((res) => {
        if (res.code == 200) {
          this.disabledregion = true;
          this.getMarketAnchorInformation();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    /*招呼语文字 */
    textblur(val) {
      console.log(val);
      modifyMarketAnchorCall({
        text: val,
        userId: getQueryString("id"),
      }).then((res) => {
        if (res.code == 200) {
          this.disabledregion = true;
          this.getMarketAnchorInformation();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    // 招呼语相册
    handleAvatarChangeIconZ(file, fileList) {
      //选中文件触发的change事件
      console.log(file);
      this.imageloading = true;
      // const isLt2M = file.raw.size / 1024 / 1024 < 0.5  //限制上传文件的大小
      this.formData.image = URL.createObjectURL(file.raw); //赋值图片的url，用于图片回显功能
      let data = new FormData();
      data.append("file", file.raw);
      uploadImg(data).then((res) => {
        if (res.data.code == 200) {
          modifyMarketAnchorCall({
            image: res.data.data.url,
            userId: getQueryString("id"),
          }).then((res) => {
            if (res.code == 200) {
              this.imageloading = false;
              this.getMarketAnchorInformation();
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          });
        }
      });
    },
    // uploadImg(file, val) {
    //   //文件上传操作
    //   let formData = new FormData();
    //   formData.append("file", file.raw);
    //   uploadImg(formData, val).then((res) => {
    //     console.log(res);
    //     if (res.data.code == 200) {
    //       modifyMarketAnchorInformation({
    //         val: res.data.data.url,
    //         userId: getQueryString("id"),
    //       }).then((res) => {
    //         if (res.code == 200) {
    //           this.$message({
    //             type: "success",
    //             message: "修改成功",
    //           });
    //         }
    //       });
    //     }
    //   });
    // },
    /**标签 */
    biaoqian() {
      this.centerDialogVisible = true;
      this.queryParams.parmas.userType = 0;
      this.getTagPageList();
    },
    /** 查询标签 */
    getTagPageList() {
      this.loading = true;
      getTagPageList(this.queryParams).then((response) => {
        this.umsInfos = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /**标签选中 */
    handleSelectionChange(val) {
      let arr = [];
      val.map((x, i) => {
        arr.push(x.id);
      });
      this.multipleSelectionList = arr;
      console.log(this.multipleSelectionList);
    },
    /**删除资源 */
    delImg(val) {
      delResource({ resourceId: val }).then((res) => {
        if (res.code == 200) {
          this.getMarketAnchorInformation();
          this.$message({
            type: "success",
            message: "删除成功",
          });
        }
      });
    },

    //<!-- 相册 -->
    uploadFile(file) {
      this.formDataIMG.append("file", file.file);
    },
    changUploadfore(file) {
      console.log(file);
      if (file) {
        this.changUploadShow4 = 1;
      }
    },
    removeUploadfore(file) {
      if (file) {
        this.changUploadShow4 = 0;
      }
    },
    async submitUpload() {
      this.albumloading = true;
      this.formDataIMG = new FormData();
      this.$refs.upload.submit();
      const { data: res } = await AlluploadImg(this.formDataIMG);
      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("发布失败！");
      } else {
        let arr = [];
        res.data.map((x) => {
          arr.push({
            url: x.url,
            type: 1,
            ext: x.ext,
            height: x.height,
            size: x.size,
            width: x.width,
            duration: x.duration,
          });
        });
        this.formData.albumList = arr;
        this.$refs.upload.clearFiles();
        batchIncreaseMarketAnchorResource({
          resourceDefinitionList: this.formData.albumList,
          userId: getQueryString("id"),
        }).then((res) => {
          if (res.code == 200) {
            this.albumloading = false;
            this.getMarketAnchorInformation();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        });
      }
    },

    /**介绍视频 */
    uploadFileVideo(file) {
      this.formDataIMGP.append("file", file.file);
    },
    changUpload(file) {
      console.log(file);
      if (file) {
        this.changUploadShow = 1;
      }
    },
    removeUpload(file) {
      if (file) {
        this.changUploadShow = 0;
      }
    },
    async submitUploadVideo() {
      this.loadingVideo = true;
      this.formDataIMGP = new FormData();
      this.$refs.uploadsd.submit();
      const { data: res } = await AlluploadImg(this.formDataIMGP);
      console.log(res);
      if (res.code !== 200) {
        this.loadingVideo = false;
        return this.$message.error("发布失败！");
      } else {
        let arr = [];
        res.data.map((x) => {
          arr.push({
            url: x.url,
            type: 3,
            ext: x.ext,
            height: x.height,
            size: x.size,
            width: x.width,
            duration: x.duration,
          });
        });
        this.formData.introductionVideoList = arr;
        console.log(this.formData.introductionVideoList);
        this.$refs.uploadsd.clearFiles();
        batchIncreaseMarketAnchorResource({
          resourceDefinitionList: this.formData.introductionVideoList,
          userId: this.formData.userId,
          type: 3,
        }).then((res) => {
          if (res.code == 200) {
            this.loadingVideo = false;
            this.getMarketAnchorInformation();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        });
      }
    },
    // 视频上传成功之后调用的方法
    videoSuccess(res, file, fileList) {
      this.findvideocover(file.url, file, 2, res.data[0]);
      console.log(res, res.code, res.data[0].url);
      if (res.code == 200) {
        this.pathUrl = res.data[0].url;
      }
    },
    // 视频上传成功之后调用的方法
    videoSuccessPr(res, file, fileList) {
      this.findvideocover(file.url, file, 4, res.data[0]);
      console.log(res, res.code, res.data[0].url);
      if (res.code == 200) {
        this.pathUrl = res.data[0].url;
      } else {
        this.$message.error("发布失败！");
      }
    },

    //截取视频第一帧作为播放前默认图片
    findvideocover(url, file, type, res) {
      console.log(res);
      // const  video = document.getElementById("myvideo"); // 获取视频对象
      const video = document.createElement("video"); // 也可以自己创建video
      video.src = url; // url地址 url跟 视频流是一样的

      // var canvas = document.getElementById('mycanvas') // 获取 canvas 对象
      var canvas = document.createElement("canvas"); // 获取 canvas 对象
      const ctx = canvas.getContext("2d"); // 绘制2d
      video.crossOrigin = "anonymous"; // 解决跨域问题，也就是提示污染资源无法转换视频
      video.currentTime = 1; // 第一帧

      video.oncanplay = () => {
        console.log(video.clientWidth, video.clientHeight);
        canvas.width = video.clientWidth ? video.clientWidth : 320; // 获取视频宽度
        canvas.height = video.clientHeight ? video.clientHeight : 320; //获取视频身高
        // 利用canvas对象方法绘图
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // 转换成base64形式
        this.videoFirstimgsrc = canvas.toDataURL("image/png"); // 截取后的视频封面
        file.url = this.videoFirstimgsrc;
        // base64转成bolb文件
        const fileBolb = this.base64toFile(
          this.videoFirstimgsrc,
          this.getFileName(file)
        );
        console.log(fileBolb, file.url, this.videoFirstimgsrc);
        // 把首图上传生成云上地址
        this.getFirstPngUrl(fileBolb, type, res);
        video.remove();
        canvas.remove();
      };
    },

    base64toFile(baseUrl, filename = "file") {
      let arr = baseUrl.split(",");
      let type = arr[0].match(/:(.*?);/)[1]; // 解锁图片类型
      let bytes = atob(arr[1]); // 解码base64
      let n = bytes.length;
      let bufferArray = new Uint8Array(n);
      while (n--) {
        bufferArray[n] = bytes.charCodeAt(n);
      }
      return new File([bufferArray], filename, { type });
    },

    getFirstPngUrl(file, type, resd) {
      const fd = new FormData();
      fd.append("file", file);
      console.log(fd, "fd");
      uploadImg(fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        this.videoFirstimgsrc = res.url;
        console.log(this.videoFirstimgsrc, res);
        // this.videoWriteFileList[0].url = res.url;
        if (res.data.code == 200) {
          this.$refs.videoUpload.clearFiles();
          this.$refs.videoUploadPr.clearFiles();
          increaseMarketAnchorResource({
            userId: getQueryString("id"),
            url: this.pathUrl,
            videoCoverPicture: res.data.data.url,
            type: type,
            ext: resd.ext,
            height: resd.height,
            size: resd.size,
            width: resd.width,
            duration: resd.duration,
          }).then((res) => {
            if (res.code == 200) {
              this.getMarketAnchorInformation();
              this.$message({
                type: "success",
                message: "修改成功",
              });
            } else {
              this.$message.error("修改失败");
            }
          });
        }
      });
    },

    getFileName(file) {
      const type = file.raw.type.split("/")[1];
      let name = "";
      if (type) {
        name = file.raw.name.substring(0, file.raw.name.indexOf(`.${type}`));
      }
      return `${name}.png`;
    },
  },
};
</script>


<style lang="scss" scoped>
.center {
  width: 76%;
  height: auto;
  margin: 0 auto;

  .top {
    display: flex;
    justify-content: flex-start;

    P {
      width: 420px;
      display: flex;
      margin-left: 20px;

      span {
        line-height: 100px;
      }
    }
  }

  .album {
    display: flex;
    margin-top: 10px;

    P {
      display: flex;
      margin-left: 20px;

      span {
        line-height: 100px;
      }
    }

    .buju {
      position: relative;
      margin: 5px;
    }

    .identical {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-top: 5px;
    }
  }

  .SingleUpload {
    margin: 0 8px;
  }

  .repeat {
    width: 100%;
    display: flex;
    justify-content: space-between;

    p {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      span {
        width: 100px;
        line-height: 34px;
      }
    }
  }

  .repeatNew {
    display: flex;
    justify-content: space-between;

    p {
      display: flex;
      justify-content: flex-start;
    }

    span {
      line-height: 42px;
      width: 130px;
    }

    p:nth-child(2) {
      margin-left: 0px;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar {
    height: 100px;
    width: 100px;
  }

  .avatar-uploader {
    height: 100px;
    width: 100px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    margin: 0 8px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  ::v-deep .el-upload--picture-card {
    margin-top: 4%;
    height: 100px;
    width: 100px;
    line-height: 100px;
  }

  ::v-deep .el-upload-list--picture-card .el-upload-list__item {
    margin-top: 4%;
    height: 100px;
    width: 100px;
    line-height: 100px;
  }

  .el-tag {
    margin: 0 10px;
    text-align: center;
    line-height: 10px;
  }

  .videos {
    width: 500px;
    height: auto;

    div:nth-child(2) {
      width: 100px;
      height: 100px;
    }

    div:nth-child(1) {
      width: 350px;
    }
  }

  .el-upload-list__item {
    transition: none;
  }
}
</style>
