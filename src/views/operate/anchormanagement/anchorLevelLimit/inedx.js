import { getList, update } from "@/api/operate/anchormanagement/index";

export default {
    name: "Config",
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
            afterValueData: [],
            beforeValueData: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    userCode: null,
                    agents: null,
                    category: 0,
                },
            },
            /**类型 */
            typeOptions: [
                { value: 0, label: "待限级" },
                { value: 1, label: "女神主播" },
                { value: 2, label: "普通主播" },
            ],
            // 表单参数
            form: {},
            //   修改状态
            editStuta: true,
            // 修改文案
            editTEXT: "",
            openGrade: false,
            id: ""
        };
    },
    created() {
        if (localStorage.getItem("pages") != null) {
            this.queryParams.pageNum = Number(localStorage.getItem("pages"))
            this.queryDataReviewList();
        } else {
            this.queryParams.pageNum = 1
            this.queryDataReviewList();
        }
        // console.log(localStorage.getItem("checket"),localStorage.getItem("sd"))
        // this.queryDataReviewList();

    },
    methods: {
        /** 查询审核主播列表 */
        queryDataReviewList() {
            this.loading = true;
            this.editStuta = true;
            localStorage.setItem("pages", JSON.stringify(this.queryParams.pageNum))
            getList(this.queryParams).then((response) => {
                this.auditProviderList = response.data.list;
                this.total = response.data.total;
                this.loading = false;
                let arr = [];
                response.data.list.map((res) => {
                    arr.push(res.image);
                });
                this.imgArr = arr;
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.queryParams.pageNum = 1;
            this.queryParams.pageSize = 10;
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.queryDataReviewList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams.pageNum = 1;
            this.queryParams.pageSize = 10;
            this.queryParams.parmas.userCode = null
            this.queryParams.parmas.userId = null
            this.queryParams.parmas.agents = null
            this.queryParams.parmas.category = 0
            this.resetForm("queryForm");
            this.handleQuery();
        },
        /**审核状态 */
        auditStatusType(row) {
            switch (row.auditStatus) {
                case 1:
                    return "审核中";
                case 2:
                    return <span style="color:red">审核失败</span>;
                case 3:
                    return <span style="color:green">审核成功</span>;
                default:
                    return "--";
            }
        },
        // 修改
        reviseCheck() {
            if (this.editStuta == true) {
                this.editStuta = false
            } else {
                this.editStuta = true
            }
        },
        // 女神主播
        goddessClick(val, id) {
            this.editTEXT = val
            this.id = id
            this.openGrade = true
        },
        ordinaryClick(val, id) {
            this.editTEXT = val
            this.id = id
            this.openGrade = true
        },
        submitGrade() {
            this.openGrade = false
            update({
                "id": this.id,
                "category": this.editTEXT
            }
            ).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: "成功",
                    });
                    this.editStuta = false
                    this.queryDataReviewList();
                }
            })
        },
        shengxiao(row) {
            switch (row.userStatus) {
                case "1":
                    return <span style="color:#67c23a">正常</span>;
                case "2":
                    return <span style="color:red">禁用</span>;
                case "3":
                    return <span style="color:#CFCFCF">注销</span>;
                case "4":
                    return <span style="color:#CDCD00">冻结</span>;
                case "5":
                    return <span style="color:#CDCD00">未通过能力检测</span>;

                default:
                    return "--";
            }
        },
        hostState(row) {
            switch (row.category) {
                case 0:
                    return <span style="color:#CDC9C9">待限级</span>;
                case 1:
                    return <span style="color:#EEAD0E">女神主播</span>;
                case 2:
                    return <span style="color:#CFCFCF">普通主播</span>;

                default:
                    return "--";
            }
        },
        /**跳转 */
        anchor(val) {
            console.log(val)
            // this.$store.dispatch("tagsView/delView", this.$route);
            location.href = `${window.location.origin}/#/operate/anchotinspection/anchotinspection?userId=${val}`
        },

        //  搜索框
        parameterInput(val) {
            console.log(val, "parameterInput")
            if (val == "") {
                this.queryParams.parmas.userId = null
            }
        },
        parameterInputsd(val) {
            console.log(val, "parameterInputsd")
            if (val == "") {
                this.queryParams.parmas.userCode = null
            }
        },
        parameterInputd(val) {
            console.log(val == "")
            if (val == "") {
                this.queryParams.parmas.agents = null
            }
        }

    },
};