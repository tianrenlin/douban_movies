<template>
    <div id="rd">
        <viceHeader :title="title"></viceHeader>
        <List :subjects="data"></List>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                wserv:this.$com.wserv,
                title:'排行详情页标题',
                data:null,
                GetSion:this.$com.getSion
            }
        },
        created(){
            this.$com.Get(`/api/${this.$com.getSion('detailUrl')}`)    // top250
            .then(res=>{
                
                this.title=res.title
                if(res.title=='豆瓣电影北美票房榜' || res.title=='豆瓣电影本周口碑榜'){
                    let dataArr=[]
                    res.subjects.forEach(item => {
                        dataArr.push(item.subject)
                    })
                    this.data=dataArr
                }
                else{
                    this.data=res.subjects
                }
                
            })
        }
    }
</script>

<style scoped>
    #list{margin-top: 85px;}
</style>
