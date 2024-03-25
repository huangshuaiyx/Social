<template>
    <div>
        营销爆款
    </div>
</template>

<script>
import { Marketing ,marketModuleType } from "@/api/api.js"
export default {
    data () {
        return {
            Marketing:[],
            MarketingLost:{
                pageNum:'1',
                typeId:'',
                userId: this.$store.state.userId && this.$store.state.userId,
            }
        }
    },
    mounted(){
            Marketing(this.MarketingLost).then(res=>{
                console.log(res.data.data.goodsList)
                this.Marketing = res.data.data.goodsList
            })
            marketModuleType({marketType:2})
    }
}
</script>