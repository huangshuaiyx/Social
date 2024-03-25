import { pageList, selectLogList } from "@/api/operate/anchormanagement/index";
import { getOptionsConfigData } from "@/api/operate/anchorReview/reviewList/index";
import { getQueryString } from "@/utils/index";

export default {
  data() {
    return {
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 6,
        parmas: {
          providerCode: null,
          auditUserName: null,
          auditStatus: '1',
          violationOption: null,
          orderId: null,
          statTime: [],
          logTime :[]
        },
      },
      violationList:[],
      /**类型 */
      typeOptions: [
        { value: '1', label: "已审核" },
        { value: '2', label: "不审核" },
        { value: '0', label: "待审核" },
      ],
      // 总条数
      total: 0,
      /**历史封禁记录 */
      banReasonShow: false,
      loading: false,
      auditProviderList: [],
      lishiList: [],
      arrsdf: [],
      cgded:[],
    };
  },
  created(){
    this.queryParams.parmas.orderId = this.$route.query.orderId ? this.$route.query.orderId : null
  },
async mounted()  {
    console.log(getQueryString("userId"))
await getOptionsConfigData({}).then(res => {  
      if (res.code == 200) {
        this.softpower = res.data.subjectiveOptions
        let arr = []
        res.data.generalViolationOptions.forEach(item => {
             item.optionsItem.forEach(it =>{
                arr.push(it)
             })
        })
        console.log(arr);
        let arr1 = []
        res.data.seriousViolationOptions.map(item => {
            item.optionsItem.forEach(it =>{
                arr1.push(it)
             })
        })
        // console.log(arr1);
        this.violationList = [...arr, ...arr1]
      }
    })
    if(getQueryString("userId") != undefined){
      this.queryParams.parmas.providerCode = getQueryString("userId")
      this.pageList()
    }else{
      this.queryParams.parmas.providerCode = null
      this.pageList()
    }
  },
  methods: {
    /** 查询审核主播列表 */
    pageList() {
        console.log(this.queryParams.parmas.violationOption);
      this.loading = true;
      let arr = []
      let arr1 = []
      let arr2 = []
      // if (localStorage.getItem("checket") != null) {
      //   let data = JSON.parse(localStorage.getItem("checket"));
      //   this.queryParams.parmas.providerCode = data.providerCode;
      //   this.queryParams.pageNum = data.pageNum;
      //   this.queryParams.parmas.auditStatus = data.auditStatus;
      //   localStorage.removeItem("checket");
      // }
      let obj = {
        ...this.queryParams
      }
      Object.keys(obj.parmas).forEach(item => {
        if (['logTime', 'statTime'].includes(item) && !obj.parmas[item]) {
            obj.parmas[item] = []
        } else if (!obj.parmas[item] && !['logTime', 'statTime'].includes(item)) {
            obj.parmas[item] = null
        }
      })
      obj.parmas.recordingStartTime = obj.parmas.statTime[0] ? obj.parmas.statTime[0] : null
      obj.parmas.recordingEndTime = obj.parmas.statTime[1] ? obj.parmas.statTime[1] : null
      obj.parmas.auditStartTime = obj.parmas.logTime[0] ? obj.parmas.logTime[0] : null
      obj.parmas.auditEndTime = obj.parmas.logTime[1] ? obj.parmas.logTime[1] : null
        pageList(obj).then((response) => {
            if(response.code == 200){
                response.data.list.forEach(item=>{
                    item.violationList = []
                    if(item.generalViolationOptions && item.generalViolationOptions.length){
                        this.violationList.forEach(i=> {
                            item.generalViolationOptions.forEach(it=>{
                                    if(it.options == i.key){
                                    item.violationList.push(i.name)
                                }
                            })
                        })
                    }
                    if(item.seriousViolationOptions && item.seriousViolationOptions.length){
                        this.violationList.forEach(i=> {
                            item.seriousViolationOptions.forEach(it=>{  
                                    if(it.options == i.key){
                                    item.violationList.push(i.name)
                                }
                            })
                        })
                    }
                })
                console.log(response.data.list);
                this.auditProviderList = response.data.list;
                this.total = response.data.total;
                this.loading = false;
                this.softpower.map((r, t) => {
                  arr.push({ topicName: r.topicName, topicCode: r.topicCode })
                  arr1.push(...r.optionsItem)
                })
                this.arrsdf = arr
                this.cgded = arr1
            }else{
                this.$message.error(response.msg)
                this.loading = false;
            }
          })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 6;
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.pageList();
      getOptionsConfigData({}).then(res => {
        if (res.code == 200) {
          this.softpower = res.data.subjectiveOptions
        }
      })
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 6;
      this.queryParams.parmas = {
            providerCode: null,
            auditUserName: null,
            auditStatus: '1',
            violationOption: null,
            orderId: null,
            statTime: [],
            logTime :[]
        },
      this.resetForm("queryForm");
      // localStorage.removeItem("checket");
      this.handleQuery();

    },
    changeSelese(val) {
      this.pageList()
    },
    /**质检 */
    edit(val) {
      console.log(val)
      // this.storages()
      location.href = `${window.location.origin}/#/operate/anchotinspection/qualitytesting?auditStatus=${val.auditStatus}&providerId=${val.providerId}&id=${val.id}`
    },
    /**历史 */
    liShi(x) {
      this.banReasonShow = true
      selectLogList({
        providerUserId: x.providerId, banTypes: [1, 2]
      }).then(res => {
        this.loading = true
        if (res.code == 200) {
          this.loading = false
          this.lishiList = res.data
        }
      })
    },
    // 状态
    auditProviderListType(row) {
      switch (row) {
        case 1:
          return "正常";
        case 2:
          return "禁用";
        case 3:
          return "注销";
        case 4:
          return "冻结";
          case 5:
            return '未通过能力检测';
        default:
          return "--";
      }
    },
    currentClick(ca) {
      console.log(ca)
    },
    // 封禁冻结状态
    banDone(row) {
      switch (row) {
        case 1:
          return "封禁";
        case 2:
          return "冻结";
        case 3:
          return "解封禁";
        case 4:
          return "解冻结";

        default:
          return "--";
      }
    },
    // 客观
    ruans(row) {
      for (let index = 0; index < this.cgded.length; index++) {
        if (row == this.cgded[index].key) {
          return this.cgded[index].name
        }
      }
    },
    ergcf(row) {
      for (let index = 0; index < this.arrsdf.length; index++) {
        if (row == this.arrsdf[index].topicCode) {
          return this.arrsdf[index].topicName
        }
      }
    },
    // 参数存储
    storages() {
      localStorage.setItem(
        "checket",
        JSON.stringify({
          pageNum: this.queryParams.pageNum,
          providerCode: this.queryParams.parmas.providerCode,
          auditStatus: this.queryParams.parmas.auditStatus,
        })
      );
    },

  },
}