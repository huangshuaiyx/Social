<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleQueryadd(null, 'add')">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="umsInfos">
      <el-table-column label="敏感词" align="center" prop="value" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="small " @click="handleQuerydeted(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getTagPageList" />

    <el-dialog title="屏蔽词" :visible.sync="centerDialogVisible" width="30%" center>
      <el-input v-model="input" type="text" placeholder="请输入内容" maxlength="50"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="OKinput">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  pageList,
  adds,
  deletes,
} from "@/api/operate/Hostconfiguration/index.js";

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
      // 参数表格数据
      umsInfos: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {

        },
      },
      // 表单参数
      form: {},
      // 是否禁用
      values: 1,
      // 新增/编辑弹框
      centerDialogVisible: false,
      // 标签内容
      input: "",
      // 判断确定是add还是edit
      tagType: "add",
      editId: ""
    };
  },
  created() {
    this.getTagPageList();
  },
  methods: {
    /** 查询用户信息 */
    getTagPageList() {
      this.loading = true;
      pageList(this.queryParams).then((response) => {
        this.umsInfos = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.resetForm("form");
    },
    /** 添加 */
    handleQueryadd() {
      this.centerDialogVisible = true;
      this.input = "";
    },

    /**确认按钮 */
    OKinput() {
      console.log(this.input);
      adds({ value: this.input }).then((res) => {
        if (res.code == 200) {
          this.getTagPageList();
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.centerDialogVisible = false;

        }

      });
    },
    // 删除
    handleQuerydeted(val) {
      deletes({ id: val.id }).then((res) => {
        if (res.code == 200) {
          this.getTagPageList();
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.centerDialogVisible = false;

        }
      });
    }
  },

};
</script>


<style lang="scss" scoped>
.el-form-item {
  margin-left: 90%;
}
</style>