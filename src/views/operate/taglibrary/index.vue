<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleQuery(null, 'add')"
          >添加</el-button
        >
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="umsInfos">
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="标签" align="center" prop="text" width="120" />
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

      <el-table-column label="更新人"  align="center" prop="updateBy" />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small "
            @click="handleQuery(scope.row, 'edit')"
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
      @pagination="getTagPageList"
    />

    <el-dialog
      title=" 用户标签"
      :visible.sync="centerDialogVisible"
      width="25%"
      center
    >
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="OKinput">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTagPageList,
  increaseTag,
  modifyTag,
} from "@/api/operate/taglibrary/index";

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
          userId: null,
          userCode: null,
          nickName: null,
          userType: 1,
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
      editId:""
    };
  },
  created() {
    this.getTagPageList();
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
    getTagPageList() {
      this.loading = true;
      getTagPageList(this.queryParams).then((response) => {
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
    handleQuery(row, type) {
      this.centerDialogVisible = true;
      if (type == "add") {
        this.input = "";
        this.tagType = "add";
         this.editId = ""
      } else {
        this.input = row.text;
        this.tagType = "edit";
        this.editId = row.id
      }
    },
    /**状态按钮 */
    changeSwitch(row) {
      console.log("开关===>", row, this.values);
       modifyTag({
          id:row.id,
          text:row.input,
          showStatus: row.showStatus,
        }).then(res=>{
          if (res.code == 200) {
            this.getTagPageList();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }else{
             this.getTagPageList();
          }
        })
    },
    /**确认按钮 */
    OKinput() {
      console.log(this.input);
      if (this.tagType == "add") {
        increaseTag({ text: this.input }).then((res) => {
          if (res.code == 200) {
            this.getTagPageList();
            this.$message({
              type: "success",
              message: "添加成功",
            });
          }
        });
      }else{
        modifyTag({
          id:this.editId,
          text:this.input,
          showStatus:this.values,
        }).then(res=>{
          if (res.code == 200) {
            this.getTagPageList();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        })
      }
      this.centerDialogVisible = false;
    },
    // 标签类型
    auditProviderListType(row) {
      switch (row.bizType) {
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
  },
};
</script>


<style lang="scss" scoped>
.el-form-item {
  margin-left: 90%;
}
</style>