<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="" prop="userId">
        <el-input
          v-model="queryParams.parmas.userId"
          placeholder="请输入长ID"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="userCode">
        <el-input
          v-model="queryParams.parmas.userCode"
          placeholder="请输入短ID"
          clearable
          size="small"
          style="width: 220px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="nickName">
        <el-input
          v-model="queryParams.parmas.nickName"
          placeholder="请输入昵称"
          clearable
          size="small"
          style="width: 220px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="" prop="online">
        <el-select v-model="queryParams.parmas.online" placeholder="请选择在线状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="regionCode">
        <el-select v-model="queryParams.parmas.regionCode" placeholder="请选择国家">
          <el-option
            v-for="item in optionsregion"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        > -->
      </el-form-item>

      <el-form-item label="" prop="">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="timeChang"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleCheck(null, 'add')"
          >添加营销主播</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="auditProviderList">
      <el-table-column label="主播ID" align="center" prop="userId" />
      <el-table-column
        label="昵称"
        align="center"
        prop="nickName"
        width="120"
      />
      <el-table-column label="状态" align="center" prop="" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showStatus"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeSwitch(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center">
        <!--判断是否是图片消息     -->
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.face"
              :preview-src-list="[scope.row.face]"
            >
              <div slot="error" class="image-slot">
                <img
                  src="../../../../assets/images/moren.png"
                  style="width: 100%"
                  alt=""
                />
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      />
      <el-table-column label="更新人" align="center" prop="updateBy" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleCheck(scope.row, 'edit')"
            >修改资料
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleCheck(scope.row, 'see')"
            >查看主播资料
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getMarketAnchorPageList"
    />

    <!-- 添加资料 -->
    <!-- <el-dialog title="提示" :visible.sync="addData" width="80%" center>
      <AddAnchor ref="home" :infoId="infoId" />
    </el-dialog> -->
  </div>
</template>

<script>
import {
  getMarketAnchorPageList,
  modifyMarketAnchorOnlineStatus,
  createMarketAnchor,
  getMarketAnchorInformation,
} from "@/api/operate/marketingAnchor/anchorList/index";
import AddAnchor from "../addAnchor/index.vue";
import SeeAnchor from "../seeAnchor/index.vue";
export default {
  components: { AddAnchor, SeeAnchor }, //注册组件
  name: "",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 参数表格数据
      auditProviderList: [],
      beforeValueData: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userId: null,
          online: null,
          startCreateTime: null,
          endCreateTime: null,
          nickName: null,
          regionCode:null
          
        },
      },
      //   在线查询
      options: [
        {
          value: 1,
          label: "在线的",
        },
        {
          value: 0,
          label: "离线的",
        },
      ],
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
      // 是否禁用
      values: "1",
      // 起止时间
      pickerOptions: {
        shortcuts: [
          {
            text: "最近三天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      // 添加资料
      addData: false,
      /**主播详情 */
      infoId: "",
      infos: {},
    };
  },
  created() {
    this.getMarketAnchorPageList();
  },
  methods: {
    /** 查询审核主播列表 */
    getMarketAnchorPageList() {
      this.loading = true;
      getMarketAnchorPageList(this.queryParams).then((response) => {
        this.auditProviderList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 资料类型
    auditProviderListType(row) {
      switch (row.type) {
        case 1:
          return "昵称";
        case 2:
          return "头像";
        case 3:
          return "海报";
        case 4:
          return "视频";
        case 5:
          return "自我介绍";
        case 6:
          return "相册";
        default:
          return "--";
      }
    },
    /** 跳转审核页面 */
    handleCheck(row, type) {
      if (type == "edit") {
        this.addData = true;
        console.log(this, window);
        window.open(
          `${window.location.origin}/#/operate/marketingAnchor/addAnchor?id=${row.userId}`
        );
      } else if (type == "see") {
        this.addData = true;

        window.open(
          `${window.location.origin}/#/operate/marketingAnchor/seeAnchor?id=${row.userId}`
        );
        console.log("see");
      } else if (type == "add") {
        createMarketAnchor().then((res) => {
          if (res.code == 200) {
            this.getMarketAnchorPageList();
          }
        });
      }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /**状态按钮 */
    changeSwitch(row) {
      console.log("开关===>", row, this.values);
      modifyMarketAnchorOnlineStatus({
        userId: row.userId,
        showStatus: row.showStatus,
      }).then((res) => {
        if (res.code == 200) {
          this.getMarketAnchorPageList();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else {
          this.getMarketAnchorPageList();
        }
      });
    },
    // 表单重置
    reset() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.queryParams.parmas = {};
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getMarketAnchorPageList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.queryParams.parmas = {};

      this.value2 = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /**时间的确定 */
    timeChang() {
      console.log(this.pickerOptions, this.value2);
      this.queryParams.parmas.startCreateTime = this.value2[0];
      this.queryParams.parmas.endCreateTime = this.value2[1];
      this.getMarketAnchorPageList();
    },
    /** 确定添加 */
    determineOk() {
      this.$nextTick((v) => {
        console.log(this.$refs.home.formData);
        this.addData = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
// .avatar {
//   width: 100px;
//   height: 100px;
//   display: block;
// }

// .el-upload {
//   display: flex;
// }

.top {
  display: flex;
  justify-content: flex-start;
  P {
    display: flex;
    margin-left: 20px;
    span {
      line-height: 140px;
    }
  }
}

.album {
  P {
    display: flex;
    margin-left: 20px;
    span {
      line-height: 140px;
    }
  }
}

.SingleUpload {
  margin: 0 8px;
}

.repeat {
  display: flex;
  justify-content: space-between;
  p {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    span {
      width: 80px;
      line-height: 34px;
    }
  }
}

.repeatNew {
  display: flex;
  justify-content: flex-start;
  span {
    line-height: 42px;
    padding: 0 43px 0 0;
  }
}

.el-dialog .el-dialog--center {
  position: relative;
}
</style>
