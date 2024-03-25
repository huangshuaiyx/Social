<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="" prop="word">
        <el-input
          v-model="queryParams.parmas.word"
          placeholder="请输入话术"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="getRefuseWordPageList()"
          @clear="getRefuseWordPageList()"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="getRefuseWordPageList()"
          >搜索</el-button
        >
        <el-button type="primary" size="mini" @click="handleQuery"
          >添加话术</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="refuseList">
      <el-table-column label="ID" align="center" prop="id" width="200" />
      <el-table-column
        label="话术"
        align="center"
        prop="word"
        width="280"
        :show-overflow-tooltip="true"
      />

      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="状态" align="center" prop="condition" />
      <el-table-column
        label="更新人"
        align="center"
        prop="updateBy"
        width="120"
      />
      <el-table-column label="操作" align="center" width="700">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.condition"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeSwitch(scope.row)"
            style="margin-right: 10px"
          >
          </el-switch>
          <el-button
            type="primary"
            size="small "
            @click="handleCheck(scope.row)"
            >修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getRefuseWordPageList"
    />

    <el-dialog
      title=" 用户标签"
      :visible.sync="centerDialogVisible"
      width="25%"
      center
    >
      <el-input
        v-model="input"
        placeholder="请输入内容"
        type="textarea"
        autosize
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="OKinput">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRefuseWordPageList,
  increaseRefuseWord,
  modifyRefuseWord,
} from "@/api/operate/marketingAnchor/refuse";

export default {
  name: "Config",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 导出遮罩层
      exportLoading: false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      refuseList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          word: null,
          condition: null,
        },
      },
      // 表单参数
      form: {},
      // 新增/编辑弹框
      centerDialogVisible: false,
      // 标签内容
      input: "",
      /** 是否add */
      refuseID: "add",
      /** id */
      Id: "",
    };
  },
  created() {
    this.getRefuseWordPageList();
  },
  methods: {
    userTypeFormat(row) {
      let str = "";
      this.userTypeOptions.forEach((t) => {
        if (t.value === row.userType) {
          str = t.label;
        }
      });
      return str;
    },
    userStatusFormat(row) {
      let str = "";
      this.userStatusOptions.forEach((t) => {
        if (t.value === row.userStatus) {
          str = t.label;
        }
      });
      return str;
    },
    /** 查询用户信息 */
    getRefuseWordPageList() {
      this.loading = true;
      getRefuseWordPageList(this.queryParams).then((response) => {
        this.refuseList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 修改 */
    handleCheck(row) {
      console.log(row);
      this.centerDialogVisible = true;
      this.refuseID = "edit";
      this.Id = row.id;
      this.input = row.word;
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.queryParams.parmas = {};
      this.resetForm("queryForm");
      this.getRefuseWordPageList();
    },
    // 表单重置
    reset() {
      this.resetForm("form");
    },
    /** 添加 */
    handleQuery() {
      this.centerDialogVisible = true;
      this.input = "";
      this.refuseID = "add";
    },
    /**状态按钮 */
    changeSwitch(row) {
      console.log("开关===>", row.condition, this.values);
      modifyRefuseWord({ condition: row.condition, id: row.id }).then((res) => {
        if (res.code == 200) {
          this.getRefuseWordPageList();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    /**确认按钮 */
    OKinput() {
      console.log(this.input);
      this.centerDialogVisible = false;
      if (this.refuseID == "add") {
        increaseRefuseWord({ word: this.input }).then((res) => {
          if (res.code == 200) {
            this.getRefuseWordPageList();
            this.$message({
              type: "success",
              message: "添加成功",
            });
          }
        });
      } else {
        modifyRefuseWord({ word: this.input, id: this.Id }).then((res) => {
          if (res.code == 200) {
            this.getRefuseWordPageList();
            this.$message({
              type: "success",
              message: "添加成功",
            });
          }
        });
      }
    },
    /*搜索 */
    handleSearch() {},
  },
};
</script>

