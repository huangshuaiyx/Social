<template>
    <div>
        宣传素材
    </div>
</template>


<script>
import { material } from "@/api/api.js"
export default {
    data () {
        return {
            materials:[],
            materialOlisd:{
                pageNum:'1',
                typeId:'1'
            }
        }
    },
    mounted(){
        material(this.materialOlisd)
    }
}
</script>

<style lang="scss" scoped>

</style>