<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="标题" prop="name">
        <el-input placeholder="请输入内容" v-model="queryParams.parmas.name" class="input-with-select">
          <el-button slot="append" @click="handleQuery" type="primary" style="background-color: #1890ff; color: #fff">搜索
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="usable">
        <el-select v-model="queryParams.parmas.usable" placeholder="请选择状态" @change="typeChange">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="usable">
        <el-select v-model="queryParams.parmas.versionCode" placeholder="请选择剧本" @change="getStrategyMessagePageList()">
          <el-option v-for="item in optionsVersion" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="userCode">
        <el-select v-model="queryParams.parmas.languageCode" placeholder="请选择语言" @change="languageChange(1)">
          <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-date-picker v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="timeChang">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleCheck(null, 'add')" style="width: 100px">添加</el-button>
        <el-button type="primary" size="mini" @click="resetQuery" style="width: 100px">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="umsInfos">
      <el-table-column label="故事线ID" align="center" prop="id" width="220" />
      <el-table-column label="标题" align="center" prop="name" width="250" />
      <el-table-column label="更新人" align="center" prop="updateBy" width="120" />
      <el-table-column label="语言" align="center" prop="languageCode" />
      <el-table-column label="剧本" align="center" prop="versionCode" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="250" />
      <el-table-column label="状态" align="center" prop="usable" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.usable" :active-value="1" :inactive-value="0" active-color="#13ce66"
            inactive-color="#ff4949" @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'edit')">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getStrategyMessagePageList" />

    <!-- 添加资料 -->
    <el-dialog title="策略信" :visible.sync="addData" width="80%" center :close-on-press-escape="false"
      :close-on-click-modal="false" >
      <div>
        <p style="display: flex; justify-content: flex-start">
          <span>策略信标题：</span>
          <el-input v-model="policyLetter.name" style="width: 240px" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span>语言：</span>
          <el-select v-model="policyLetter.languageCode" placeholder="请选择语言" @change="languageChange(2)"
            style="margin-left: 42px">
            <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </p>
        <p>
          <span>剧本：</span>
          <el-select v-model="policyLetter.versionCode" placeholder="请选择剧本" @change="languageChange(2)"
            style="margin-left: 42px" :disabled="disabled">
            <el-option v-for="item in optionsVersion" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </p>
        <p>
          <span>内容类型: </span>
          <el-select v-model="policyLetter.contentType" placeholder="请选择类型" @change="languageChange(2)"
            style="margin-left: 21px" :disabled="disabled">
            <el-option v-for="item in contentVersion" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </p>
        <div class="strategy-text" v-show="judgment != 'add'">策略信内容</div>

        <div v-show="judgment != 'add'">
          <div class="quite" v-for="(x, i) in contentTypeList" :key="i">
            <div>
              <span style="margin-right: 50px">类型：</span>
              <el-select v-model="x.contentType" placeholder="请选择策略类型" :disabled="x.sorts == null ? false : true">
                <el-option v-for="item in policytype" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- 有内容 -->
            <div class="tyle" v-if="x.contentType == 1">
              <div id="erty">
                <span>问题：</span>
                <el-input v-model="x.content" style="width: 240px" placeholder="请输入内容" type="textarea" autosize>
                </el-input>
              </div>
              <div id="erty">
                <p id="erty" v-for="(o, p) in x.strategyMessageReplyList" :key="p">
                  <span>答案{{ p + 1 }}：</span>
                  <el-input v-model="o.content" style="width: 240px" placeholder="请输入内容" type="textarea" autosize>
                  </el-input>
                </p>
                <!-- <p style="margin-left: 100px">
                  <span>台词2：</span>
                  <el-input
                    v-model="x.Line2"
                    style="width: 240px"
                    placeholder="请输入内容"
                    type="textarea"
                    autosize
                  ></el-input>
                </p> -->
              </div>
            </div>
            <!-- 无内容 -->
            <div class="tyle" v-else>
              <div v-if="x.contentType == 1 || x.contentType == 0" id="erty">
                <span>内容：</span>
                <el-input v-model="x.content" style="width: 240px" placeholder="请输入内容" type="textarea" autosize>
                </el-input>
              </div>
            </div>
            <!-- 2.0 营销呼叫, 倒计时呼叫 -->
            <div class="tyle" v-if="policyLetter.versionCode == '2.0'">
              <div id="erty" v-if="x.contentType == 4 || x.contentType == 6">
                <span>内容：</span>
                <el-input v-model="x.content" style="width: 240px" placeholder="请输入内容" type="textarea" autosize>
                </el-input>
              </div>
            </div>
            <!-- 语言 -->
            <div class="tyle" v-if="policyLetter.versionCode == '2.0'">
              <div id="erty" v-if="x.contentType == 8">

                <el-upload class="upload-demo" ref="uploadsd" action="#" :http-request="uploadFiles" accept=".mp3"
                  :auto-upload="false" multiple :limit="1" :on-exceed="handleExceedsd" :file-list="fileList1"
                  :on-change="handleReplaceAvatarChange" :on-remove="removeUploadfore" :show-file-list="false">
                  <el-button slot="trigger" size="small" type="primary" @click="clicks(x, i)">选取文件</el-button>
                  <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload(x)"
                    v-show="x.changUploadShow4 == 1">上传到服务器</el-button>
                </el-upload>

                <!-- <el-upload class="upload-demo" ref="uploadsd" action="#" :http-request="uploadFiles" accept=".mp3" :auto-upload="false"
                  multiple :limit="1" :on-exceed="handleExceedsd" :file-list="fileList1"
                  :on-change="handleReplaceAvatarChange" :on-remove="removeUploadfore" :show-file-list="false">
                  <el-button size="small" type="primary">选取文件</el-button>
                </el-upload> -->
                <audio controls v-if="x.content != null" :src="x.content" preload="auto" ref="audioRef"></audio>


              </div>

            </div>
            <!-- H5链接 -->
            <div class="tyle" v-if="policyLetter.versionCode == '2.0'">
              <div id="erty" v-if="x.contentType == 9">
                <span>内容：</span>
                <el-input v-model="x.content" style="width: 240px" placeholder="请输入内容" type="textarea" autosize>
                </el-input>
              </div>
              <div id="erty" v-if="x.contentType == 9">
                <span>链接：</span>
                <el-input v-model="x.link" style="width: 240px" placeholder="请输入内容" type="textarea" autosize>
                </el-input>
                <button style="height: 30px;width: 50px;margin-left: 10px;margin-top: 5px;"
                  v-if="x.contentType == 9 && x.link != null && x.link != ''" @click="seeview(x.link)">查看</button>
              </div>
            </div>
            <!-- 延迟时间 -->
            <div class="cesdf" id="cesdfd">
              <span style="margin-right: 30px">延迟时间：</span>
              <div class="yanchi">
                <el-input v-model="x.delayStart" style="width: 80px" placeholder=""></el-input>
                <span>-</span>
                <el-input v-model="x.delayEnd" style="width: 80px" placeholder=""></el-input>
                <span>S</span>
              </div>
            </div>

            <div class="but" id="posred">
              <el-button type="primary" size="mini" @click="dropStrategy(i)" style="margin-top: 20px; width: 100px"
                v-if="i !== contentTypeList.length - 1">降序</el-button>
              <el-button type="primary" size="mini" @click="upStrategy(i)" style="margin-top: 20px; width: 100px"
                v-if="i !== 0">升序</el-button>
              <el-button type="danger" size="mini" @click="deletStrategy(i)" style="margin-top: 20px; width: 100px">删除
              </el-button>
            </div>
          </div>
          <el-button type="primary" size="mini" @click="addStrategy" style="margin-top: 20px; width: 100px">添加
          </el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determineOk" :disabled="disabledOk" v-preventReClick="2000">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getStrategyMessagePageList,
  getStrategyMessageFullContent,
  saveStrategyMessageFullContent,
  increaseStrategyMessageTemplate,
  modifyStrategyMessageTemplate,
  uploadFile
} from "@/api/operate/strategy/index";

export default {
  name: "Config",
  data() {
    return {
      disabledOk: false,
      // 遮罩层
      loading: false,
      // 导出遮罩层
      exportLoading: false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      umsInfos: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          name: null,
          usable: null,
          languageCode: null, // 语言
          startDate: null,
          endDate: null,
          versionCode: null
        },
      },
      /**时间 */
      time: [],
      // 状态
      options: [
        {
          value: 1,
          label: "开启",
        },
        {
          value: 0,
          label: "隐藏",
        },
      ],
      // 内容类型
      contentVersion: [
        {
          value: 'normal',
          label: "普通",
        },
        {
          value: 'sex',
          label: "性感",
        },
      ],
      // 剧本
      optionsVersion: [
        {
          value: '1.0',
          label: "1.0",
        },
        {
          value: '2.0',
          label: "2.0",
        },
      ],
      // 语言
      language: [
        {
          value: "en",
          label: "英语",
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
          value: "id",
          label: "印尼语",
        },
      ],
      // 策略类型
      policytype: [
      ],
      // 表单参数
      formData: {
        id: null,
        contentType: null,
        content: null,
        sorts: null,
        lastStatus: null,
        delayStart: "5",
        delayEnd: "10",
        strategyMessageReplyList: [{ content: "" }, { content: "" }],
        link: null,
        changUploadShow4: 0
      },
      values: "1",
      /**资料弹框 */
      addData: false,
      title: "",
      // 0 表原顺序，1降序2升序
      selectType: 0,
      /**唯一id */
      id: null,
      /** 策略信内容-标题 */
      policyLetter: {},
      /** 策略信内容-内容 */
      contentTypeList: [],
      /**判断是add还是edit */
      judgment: null,
      /**添加 */
      addOrl: true,
      disabled: false,
      // 语言
      audioForm: { voiceUrl: "" },
      fileList: [],
      audioFlag: false,
      audioUploadPercent: 0,
      changUploadShow4: 0,
      formDataIMG: {},
      showfilelist: true,
      fileList1: [],
      detailsYunyin: {}
    };
  },
  created() {
    this.getStrategyMessagePageList();
  },
  methods: {
    /** 查询用户信息 */
    getStrategyMessagePageList() {
      this.loading = true;
      getStrategyMessagePageList(this.queryParams).then((response) => {
        this.umsInfos = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 添加/修改 */
    handleCheck(row, type) {
      console.log(row, type);
      this.addData = true;
      if (type == "edit") {
        this.disabled = true
        if (row.versionCode == '1.0') {
          this.policytype = [
            {
              value: 1,
              label: "问答剧本",
            },
            {
              value: 0,
              label: "文案",
            },
            {
              value: 2,
              label: "图片",
            },
            {
              value: 4,
              label: "营销呼叫",
            },
            // {
            //   value: 5,
            //   label: "私密照片",
            // },
            // {
            //   value: 6,
            //   label: "倒计时呼叫",
            // },
          ]
        } else {
          this.policytype = [
            {
              value: 1,
              label: "问答剧本",
            },
            {
              value: 0,
              label: "文案",
            },
            {
              value: 2,
              label: "图片",
            },
            {
              value: 4,
              label: "营销呼叫",
            },
            {
              value: 5,
              label: "私密照片",
            },
            {
              value: 6,
              label: "倒计时呼叫",
            },
            {
              value: 7,
              label: "私密视频",
            },
            {
              value: 8,
              label: "语音消息",
            },
            {
              value: 9,
              label: "h5链接",
            },
          ]
        }

        getStrategyMessageFullContent({ id: row.id }).then((res) => {
          console.log(row, type, res);
          if (res.code == 200) {
            this.policyLetter = res.data.strategyMessageTemplate;
            this.contentTypeList = res.data.strategyMessageContentList;
            console.log(this.policyLetter)

          }
        });
        this.judgment = "edit";
        this.addOrl = true;
      } else {
        this.disabled = false
        this.contentTypeList = [];
        this.policyLetter = {};
        this.judgment = "add";
        this.detailsYunyin = {}
      }
    },
    // 取消按钮
    cancel() {
      this.addData = false;
      // this.$refs.uploadsd[0].clearFiles()

    },
    // 表单重置
    reset() {
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.getStrategyMessagePageList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userId: null,
          usable: null,
          name: null,
          usable: null,
          languageCode: null,
          startDate: null,
          endDate: null,
        },
      };
      this.time = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /**时间的确定 */
    timeChang() {
      this.queryParams.parmas.startDate = `${this.time[0]} 00:00:00`;
      this.queryParams.parmas.endDate = `${this.time[1]} 23:59:59`;
      console.log(
        this.queryParams.parmas.startDate,
        this.queryParams.parmas.endDate,
        this.time
      );

      this.getStrategyMessagePageList();
    },
    /** 语言选择 */
    languageChange(val) {
      if (val == 1) {
        console.log(this.queryParams.parmas.languageCode);
        this.getStrategyMessagePageList();
      }
    },
    /** 状态选择 */
    typeChange() {
      console.log(this.queryParams.parmas.languageCode);

      this.getStrategyMessagePageList();
    },
    /**状态按钮 */
    changeSwitch(row) {
      console.log("开关===>", row, this.values);
      modifyStrategyMessageTemplate({
        id: row.id,
        usable: row.usable,
        languageCode: row.languageCode,
        name: row.name
      }).then((res) => {
        if (res.code == 200) {
          this.getStrategyMessagePageList();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else {
          this.getStrategyMessagePageList();
        }
      });
    },
    /** 弹框确定 */
    determineOk() {
      console.log(this.contentTypeList, this.policyLetter);


      if (this.judgment == "edit") {
        console.log(this.contentTypeList == 'null')
        if (this.contentTypeList != null) {
          if (this.contains(this.contentTypeList) == undefined) {
            return
          } else {
            saveStrategyMessageFullContent({
              strategyMessageTemplate: this.policyLetter,
              strategyMessageContentList: this.contentTypeList,
            }).then((res) => {
              if (res.code == 200) {
                this.getStrategyMessagePageList();
                this.addData = false;
                this.$message({
                  type: "success",
                  message: "修改成功",
                });
              }
            });
          }


        } else {
          this.$message({
            type: "error",
            message: "请添加内容",
          });
        }

        // this.contentTypeList.map(x => {
        //   if (x.contentType == 9) {
        //     if (/^http(s)?:\/\//.test(x.content)) {
        //       console.log('属性值是一个链接');
        //     } else {
        //       this.$message.error('请输入正确的H5链接')
        //       return
        //     }
        //   }
        // })




      } else {

        increaseStrategyMessageTemplate({
          languageCode: this.policyLetter.languageCode,
          name: this.policyLetter.name,
          versionCode: this.policyLetter.versionCode,
          contentType: this.policyLetter.contentType
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.addData = false;
            this.getStrategyMessagePageList();
          }
        });
      }
    },

    contains(arr) {
      for (var i = 0; i < arr.length; i++) {
        console.log(arr[i].link)
        if (arr[i].link == null || arr[i].link == "") {
            if(arr[i].contentType == 9){
            this.$message({
                type: "error",
                message: "H5链接不能为空",
              });
              return
            }
        } else {
          if (arr[i].link.search("http") != -1 || arr[i].link.search('https') != -1) {
            return true;
          }
        }

      }
      return false;
    },
    //**添加策略 */
    addStrategy() {
      let formData = { ...this.formData };
      this.addOrl = false;
      (formData = {
        id: "",
        contentType: null,
        content: null,
        sorts: null,
        lastStatus: null,
        delayStart: "5",
        delayEnd: "10",
        strategyMessageReplyList: [{ content: null }, { content: null }],
        link: null
      }),
        (formData.id = this.id++);

      console.log(formData);
      if (this.contentTypeList == null) {
        this.contentTypeList = [];
        this.contentTypeList.push(formData);
      } else {
        this.contentTypeList.push(formData);
      }

    },
    /**删除 */
    deletStrategy(index) {
      this.contentTypeList.splice(index, 1);
    },
    /**降序 */
    dropStrategy(index) {
      console.log("downClick", index);
      let newArr = this.swapItems(this.contentTypeList, index, index + 1);
      this.contentTypeList = newArr;
    },
    /**升序 */
    upStrategy(index) {
      console.log("upClick", index);
      let newArr = this.swapItems(this.contentTypeList, index, index - 1);
      this.contentTypeList = newArr;
      console.log(this.contentTypeList);
    },
    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    // 资料类型
    auditProviderListType(row) {
      switch (row.type) {
        case 0:
          return "文本";
        case 1:
          return "选项";
        case 2:
          return "图片";
        case 3:
          return "视频";
        case 4:
          return "营销呼叫";
        default:
          return "--";
      }
    },
    // 音频上传成功    
    handleReplaceAvatarSuccess(res, file, fileList) {
      console.log(res, file, fileList, 11111111111)
      this.audioFlag = false;
      this.audioUploadPercent = 0;
      if (res.code == 200) {
        this.audioForm.voiceUrl = process.env.VUE_APP_BASE_API + res.fileName;
        this.audioForm.voiceName = fileList[0].name
      } else {
        this.$message.error('视频上传失败，请重新上传！');
      }
    },

    async handleReplaceAvatarChange(file, fileList) {
      console.log('则会那个擦', file, fileList)
      if (file) {
        this.detailsYunyin.changUploadShow4 = 1;
      }
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.fileList1 = fileList
      console.log(file, fileList, 222222222222)
    },
    /**上传文件限制--只能上传mp3格式的文件 */
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 50;
      if (['audio/mp3', 'audio/mpeg'].indexOf(file.type) == -1) {
        this.$message.error('请上传正确的音频格式');
        return false;
      }
      if (!isLt10M) {
        this.$message.error('上传音频大小不能超过50MB哦!');
        return false;
      }
    },
    // 查看
    seeview(val) {
      window.open(val)
    },
    /**语言超出限制 */
    handleExceedsd(files, fileList) {
      console.log("触发", files[0], fileList[0]);
      if (files) {
        this.detailsYunyin.changUploadShow4 = 1;
        this.showfilelist = true;
      }
    },
    removeUploadfore(file) {
      if (file) {
        this.detailsYunyin.changUploadShow4 = 0;
        this.showfilelist = true;
      }
    },
    uploadFiles(file) {
      console.log('更新', file)
      this.formDataIMG.append("file", file.file);
      this.formDataIMG.append("bizId", 1);
    },
    async submitUpload(val) {
      console.log(val)
      this.formDataIMG = new FormData();
      console.log(this.$refs.uploadsd[0])
      this.$refs.uploadsd[0].submit();
      const { data: res } = await uploadFile(this.formDataIMG);
      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("发布失败！");
      } else {
        val.changUploadShow4 = 0;
        this.showfilelist = false;
        console.log(res.data.fileUrl)
        val.content = res.data.fileUrl
        this.fileList1 = []
        console.log(res.data.fileUrl, val)
        this.$refs.uploadsd[0].clearFiles()
      }
    },
    clicks(x, i) {
      console.log(x, i)
      this.detailsYunyin = x
    }



  },
};
</script>

<style lang="scss" scoped>
.strategy-text {
  width: 100%;
  border-bottom: solid 1px;
  font-size: 20px;
}

.quite {
  border: dashed 1px;
  padding: 5px 10px;
  position: relative;
  margin: 10px 0;

  .tyle {
    margin: 10px 0;

    div {
      display: flex;
      justify-content: flex-start;

      span {
        line-height: 50px;
        margin-right: 50px;
      }

      p {
        display: flex;
        justify-content: flex-start;
      }
    }
  }

  .cesdf {
    display: flex;
    justify-content: flex-start
  }

  .yanchi {
    width: 490px;
    display: flex;
    justify-content: flex-start;

    span {
      margin: 9px 10px;
    }
  }

  .but {
    position: absolute;
    top: 10px;
    right: 20px;
  }
}
</style>
