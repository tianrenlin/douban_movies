<template>
    <div id="search">
        <form action="" v-on:submit.prevent="" class="searchBox">
            <mt-search  cancel-text="" placeholder="搜索" @keyup.native.enter="search"></mt-search>
            <div class="back" icon="back" @click="back">返回</div>
        </form>
           
        <div class="tagBox">
            <div class="classic flex">
                <mt-button plain type="primary">经典电影</mt-button>
                <mt-button plain type="primary">高分电影</mt-button>
                <mt-button plain type="primary">冷门佳片</mt-button>
            </div>
            <div class="type flex">
                <mt-button plain type="primary">剧情</mt-button>
                <mt-button plain type="primary">科幻</mt-button>
                <mt-button plain type="primary">喜剧</mt-button>
                <mt-button plain type="primary">爱情</mt-button>
                <mt-button plain type="primary">悬疑</mt-button>
                <mt-button plain type="primary">动作</mt-button>
                <mt-button plain type="primary">警匪</mt-button>
                <mt-button plain type="primary">恐怖</mt-button>
                <mt-button plain type="primary">青春</mt-button>
                <mt-button plain type="primary">文艺</mt-button>
                <mt-button plain type="primary">治愈</mt-button>
            </div>
            <div class="area flex">
                <mt-button plain type="primary">大陆</mt-button>
                <mt-button plain type="primary">香港</mt-button>
                <mt-button plain type="primary">美国</mt-button>
                <mt-button plain type="primary">欧洲</mt-button>
                <mt-button plain type="primary">印度</mt-button>
                <mt-button plain type="primary">韩国</mt-button>
                <mt-button plain type="primary">日本</mt-button>
                <mt-button plain type="primary">欧美</mt-button>
            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                subjects:'',
                tag:'',
                num:0,
            }
        },
        created(){
            
            
        },
        methods:{
            // 点击按钮跳到对应数据页面
            toDetail:function(tag){
                this.$router.push(`/views?search=${tag}`)
            },
            // 处理margin-right的问题
            MR:function(){
                var tye=document.getElementsByClassName('type')[0]
                var btn=document.querySelectorAll('.type button')
                for(var i=1;i<=btn.length;i++){
                    if(i%4==0){
                        btn[i-1].style.marginRight=0
                    }
                }
            },
            back:function(){
                this.$router.go(-1)
            },
            search:function(e){
                var getTag=e.target.value.replace(/(^\s*)|(\s*$)/g, "")
                if(getTag.length>0){
                    this.toDetail(getTag)
                }
            }
        },
        mounted(){
            let _this=this
            _this.MR()
            // 点击页面的快捷按钮
            var btn=document.querySelectorAll('#search button')
            for(var i=0;i<btn.length;i++){
                var j=btn[i]
                j.index=i
                j.onclick=function(e){
                    var getTag=e.target.innerText.replace(/(^\s*)|(\s*$)/g, "")
                    _this.toDetail(getTag)
                }
            }
            
        },
        watch:{
            
        }
    }
</script>

<style lang="stylus" scoped>
    #search
        background  #fff
        font-size 14px
        .searchBox
            display flex
            .mint-search
                flex 9
            .back
                flex 1
                color #fff
                height 44px
                line-height 44px
                background #26a2ff
        .tagBox
            padding 0 20px
            .flex
                display flex
                align-items center
                justify-content space-between
                flex-wrap wrap
                .mint-button
                    height 35px
            .classic
                width 100%
                height 72px
                border-bottom 1px solid #E6E6E6
                
            .type
                padding 20px 0
                justify-content flex-start
                border-bottom 1px solid #E6E6E6
                .mint-button--normal
                    padding 0 18px
                    margin-right 13px
                    margin-bottom 15px
            .area
                padding 20px 0
                justify-content flex-start
                border-bottom 1px solid #26a2ff
                .mint-button--normal
                    margin-right 5px
                    margin-bottom 15px
            
                

</style>
