<template>
    <div v-loading="loading">
        <Registration v-if="property == 1001"></Registration>
        <div v-else-if="property == 2001">
            <ToBeReviewed></ToBeReviewed>
        </div>
        <TaskApproval v-else></TaskApproval>
    </div>
</template>

<script>
import Registration from "../Registration/index.vue"
import ToBeReviewed from "../toBeReviewed/index.vue"
import TaskApproval from "../taskApproval/index.vue"
import { getNextTaskd } from "@/api/operate/anchorReview/reviewList/index";
import { getQueryString } from "../../../../utils/index";
export default {
    components: {
        Registration,
        ToBeReviewed,
        TaskApproval
    },
    data() {
        return {
            property: '',
            loading: false,
            userId: JSON.parse(localStorage.getItem("userId"))
        };
    },
    mounted() {
        console.log(this.property, "飒飒的")
        // this.loading = true
       this.getmethod()

    },
    methods: {
         getmethod() {
            this.loading = true
            this.$store.dispatch('query', { userId: this.userId }).then(res => {
                console.log(res.data,res)
            if(res.code == 200){
                if(res.data != undefined){
                    this.loading = false
                    this.property = res.data.taskType
                }else{
                    this.$message({
                            type: "error",
                            message: "暂无数据",
                        });
                    this.$store.dispatch("tagsView/delView", this.$route);
                    this.$router.replace({ path: "/operate/anchorReview/reviewList" }); // 关闭之后要返回的页面
                }
                
            }
            
        })
        },
    }
}

</script>