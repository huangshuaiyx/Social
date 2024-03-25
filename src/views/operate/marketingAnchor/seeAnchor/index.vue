<template>
  <div>
    <div class="center">
      <div class="top">
        <div>
          <p>*头像</p>
          <el-image
            style="width: 100px; height: 100px"
            :src="formData.face"
            :preview-src-list="[formData.face]"
            fit="contain"
          />
        </div>
        <div>
          <p>*海报</p>
          <el-image
            style="width: 100px; height: 100px"
            :src="formData.poster"
            :preview-src-list="[formData.poster]"
            fit="contain"
          />
        </div>
        <div style="margin-top: 20px">
          <p>*介绍视频</p>
          <div
            style="width: 350px; display: flex"
            v-for="(x, i) in formData.introductionVideoList"
            :key="i"
          >
            <video
              :src="x.url"
              controls="controls"
              width="200"
              height="140"
              style="margin-left: 10px; margin-top: 10px"
            />
          </div>
        </div>
      </div>
      <!-- 相册 -->
      <div class="album">
        <div>
          <div>
            <span>*相册</span>
          </div>
          <div
            v-if="
              formData.albumList != null ? formData.albumList.length : 0 != 0
            "
          >
            <el-image
              v-for="(x, i) in formData.albumList"
              :key="i"
              :src="x.url"
              :preview-src-list="albumListYu"
              fit="cover"
              class="imgas"
              style="margin-left: 10px; width: 100px; height: 100px"
            />
          </div>
          <div v-else>
            <img
              src="../../../../assets/images/moren.png"
              alt=""
              style="width: 130px; height: 100px"
            />
          </div>
        </div>
      </div>
      <!-- 私密相册 -->
      <div class="album">
        <div>
          <span>*私密相册</span>
          <div
            v-if="
              formData.privateAlbumList != null
                ? formData.privateAlbumList.length
                : 0 != 0
            "
          >
            <el-image
              v-for="(x, i) in formData.privateAlbumList"
              :key="i"
              :src="x.url"
              :preview-src-list="privateAlbumListYu"
              fit="cover"
              class="imgas"
              style="margin-left: 10px; width: 100px; height: 100px"
            />
          </div>
          <div v-else>
            <img
              src="../../../../assets/images/moren.png"
              alt=""
              style="width: 130px; height: 100px"
            />
          </div>
        </div>
      </div>
      <!-- 私密视频 -->
      <div class="album">
        <div>
          <span>*私密视频</span>
          <div
            style="width: 350px; display: flex"
            v-for="(x, i) in formData.privateVideoList"
            :key="i"
          >
            <video
              :src="x.url"
              controls="controls"
              width="200"
              height="140"
              style="margin-left: 10px; margin-top: 10px"
            />
          </div>
        </div>
      </div>
      <!-- 身高 体重  -->
      <div class="repeat" id="heightandweight">
        <p>
          <span>*身高</span>
          <el-input placeholder="请输入身高" v-model="formData.height" disabled>
            <template slot="append">cm</template>
          </el-input>
        </p>
        <p>
          <span>*体重</span>
          <el-input placeholder="请输入体重" v-model="formData.weight" disabled>
            <template slot="append">KG</template>
          </el-input>
        </p>
      </div>
      <!-- 昵称 地区 -->
      <div class="repeat" id="heightandweight">
        <p>
          <span>*昵称</span>
          <el-input
            placeholder="请输入昵称"
            v-model="formData.nickname"
            disabled
          >
          </el-input>
        </p>
        <p style="margin-left: 200px">
          <span>*地区</span>
          <el-select
            v-model="formData.regionCode"
            disabled
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionsregion"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <!-- 年龄 -->
      <div class="repeat" id="heightandweight">
        <p>
          <span>*年龄</span>
          <el-input v-model="formData.birthday" disabled> </el-input>
        </p>
      </div>

      <!-- 标签 -->
      <div class="repeat" id="heightandweight">
        <p>
          <span>*标签</span>
          <el-tag
            v-for="(x, i) in formData.tagDefinitionList"
            :key="i"
            @close="handleClose(x.id)"
            style="line-height: 28px"
          >
            {{ x.text }}</el-tag
          >
        </p>
      </div>
      <!-- 第一语言 第二语言 -->
      <div class="repeat" id="heightandweight">
        <p>
          <span>第一语言</span>
          <el-select v-model="formData.language" placeholder="请选择" disabled>
            <el-option
              v-for="item in language"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </p>
        <p>
          <span>第二语言</span>
          <el-select
            v-model="formData.secondLanguage"
            placeholder="请选择"
            disabled
          >
            <el-option
              v-for="item in secondlanguage"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <!-- 在线状态 -->
      <div class="repeatNew">
        <span>在线状态</span>
        <p>
          <el-radio v-model="formData.online" :label="0" disabled
            >不在线</el-radio
          >
          <el-radio v-model="formData.online" :label="1" disabled
            >在线</el-radio
          >
        </p>
      </div>
      <!-- 自我介绍 -->
      <div class="repeatNew">
        <p>
          <span>自我介绍</span>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formData.selfIntroduction"
            disabled
          >
          </el-input>
        </p>
      </div>
      <!--  招呼语 -->
      <div class="repeatNew" id="heightandweight">
        <p>
          <span>招呼语</span>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="formData.text"
            disabled
          >
          </el-input>
        </p>
        <p >
          <span> 招呼语图片 </span>
          <el-image
            :src="formData.image"
            :preview-src-list="[formData.image]"
            fit="cover"
            class="imgas"
            style="margin-left: 10px; width: 100px; height: 100px"
          />
        </p>
      </div>
      <!-- 标签弹框 -->
      <el-dialog
        title="标签"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        :modal="false"
      >
        <div
          style="display: flex; justify-content: flex-start; flex-wrap: wrap"
        >
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{
              city
            }}</el-checkbox>
          </el-checkbox-group>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="labelOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SingleUpload from "../../../../components/singleUpload/index.vue"; //单张
import VideoUpload from "../../../../components/videoUpload/index";
import ImageUpload from "../../../../components/ImageUpload/index.vue";
import { getMarketAnchorInformation } from "@/api/operate/marketingAnchor/anchorList/index";
import { getQueryString } from "../../../../utils/index";
export default {
  props: ["mssage", "infos"],
  name: "addAnchor",
  components: { SingleUpload, VideoUpload },
  data() {
    return {
      // 资料信息
      formData: {},
      //**打招呼 */
      dazh: {},
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
          label: "Taiwan	",
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
          value: "hi",
          label: "印地语",
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

        {
          value: "ta",
          label: "泰米勒语",
        },
        {
          value: "ur",
          label: "乌尔都语",
        },
        {
          value: "en",
          label: "英语",
        },
      ],
      // 第二语言
      secondlanguage: [
          {
          value: "ID",
          label: "印尼",
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
          value: "hi",
          label: "印地语",
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

        {
          value: "ta",
          label: "泰米勒语",
        },
        {
          value: "ur",
          label: "乌尔都语",
        },
        {
          value: "en",
          label: "英语",
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
        "上海",
        "北京",
        "广州",
        "深圳",
        "阿斯顿",
        "全文",
        "自行车",
        "过分",
      ],
      isIndeterminate: true,
      /**详情 */
      info: {},
      /**私密相册预览 */
      privateAlbumListYu: [],
      /**相册预览 */
      albumListYu: [],
    };
  },
  mounted() {
    getMarketAnchorInformation({ userId: getQueryString("id") }).then((res) => {
      if (res.code == 200) {
        this.formData = res.data;
        this.formData.privateAlbumList.map((x) => {
          this.privateAlbumListYu.push(x.url);
        });
        this.formData.albumList.map((x) => {
          this.albumListYu.push(x.url);
        });
      }
    });
  },
  methods: {
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
      console.log(this.checkedCities);
      this.centerDialogVisible = false;
      this.formData.table = this.checkedCities;
    },
    // 删除标签
    handleClose(tag) {
      this.formData.table.splice(this.formData.table.indexOf(tag), 1);
    },
  },
  watch: {
    formData(val) {
      console.log(val);
    },
  },
};
</script>


<style lang="scss" scoped>
.center {
  width: 90%;
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
    margin: 5px 0;
    P:nth-child(1) {
      display: flex;
      margin-left: 20px;
      flex-wrap: wrap;
      width: 100px;
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
}
</style>
