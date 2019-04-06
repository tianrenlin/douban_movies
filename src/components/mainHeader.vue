// 主页面顶部
<template>
    <div id="mainHeader">
        <mt-header fixed title="豆瓣电影">
         <mt-button icon="search" slot="right" @click="search"></mt-button>
        </mt-header>
    </div>
</template>

<script>
    export default {
        data(){
            return{}
        },
        methods:{
            search(){
                this.$router.push({name:'search'})
            }
        },
    }
</script>

<style lang="stylus" scoped>
    
</style>
