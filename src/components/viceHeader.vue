<template>
    <div id="vice">
        <mt-header fixed :title="title">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="back">返回</mt-button>
            </router-link>
        </mt-header>
    </div>
</template>

<script>
    export default {
        props:{
            title:{     // 标题
                type:String,
                required:true
            }
        },
        methods:{
            back:function(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="stylus">

</style>
