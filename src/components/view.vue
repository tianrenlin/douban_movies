<template>
    <div id="view">
        <mt-header :title="title" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="back">返回</mt-button>
            </router-link>
        </mt-header>
        <List :subjects="subjects"></List>
    </div>
</template>

<script>
    // import BUS from '../assets/js/bus.js'
    export default {
        data(){
            return{
                subjects:'',
                wserv:this.$com.wserv,
                tag:'',
                title:'',
            }
        },
        created(){
            this.tag=this.$route.query.search   //获取当前路由关键字
            this.title=`${this.tag}标签的电影`
            this.$ajax.get(`/api/search?tag=${this.tag}&start=${this.num}&count=20`)
                .then(res=>{
                    this.subjects=res.data.subjects
                })
        },
        methods: {
            back:function(){
                this.$router.go(-1)
            }
        },
    }
</script>

<style scoped>
    #list{margin-top: 85px;}
</style>