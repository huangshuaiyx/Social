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
          placeholder="请输入用户ID"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="userCode">
        <el-input
          v-model="queryParams.parmas.userCode"
          placeholder="请输入用户code"
          clearable
          size="small"
          style="width: 260px"
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


      <el-form-item>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="auditProviderList">
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column
        label="用户code"
        align="center"
        prop="userCode"
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

      <el-table-column label="昵称" align="center" prop="nickName" />
       <el-table-column label="注册时间" align="center" prop="regTime" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getMarketAnchorPageList"
    />

  </div>
</template>

<script>
import {
  popularByPage,
  modifyMarketAnchorOnlineStatus,
} from "@/api/operate/provider/recommend/recommend.js";
export default {
  components: { }, //注册组件
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
          userCode: null,
          nickName: null,
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
      // 是否禁用
      values: "1",
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
      popularByPage(this.queryParams).then((response) => {
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

      this.resetForm("queryForm");
      this.handleQuery();
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
