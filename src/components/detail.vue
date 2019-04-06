<template>
    <div id="detail">
        <viceHeader :title="title"></viceHeader>
        <!-- 电影海报 -->
        <div class="poster">
            <img :src="wserv+img" alt="">
        </div>
        <!-- 电影详情 -->
        <div class="move_info">
            <div class="probable">
                <div class="desc">
                    <h2 class="title">{{title}}</h2>
                    <span>{{year}} {{country}}</span>
                    <span class="tag">{{tag}}</span>
                    <span class="original_title overflowHidden1">原名: {{original_title}}</span>
                    <span class="pubdate ">其他译名：{{aka || aka.length>0?aka:'无'}}</span>
                    <span class="duration"></span>
                </div>
                <div class="rank">
                    <div class="origin">豆瓣评分</div>
                    <span class="rating">{{rat}}</span>
                    <div class="start">
                        <Start :score="rating"></Start>
                    </div>
                    <span class="num">{{ratings_count}}人</span>
                </div>
            </div>
            <div class="operate">
                <div class="want_watch" @click="wantWatch" v-if="this.want_watch || this.wantSion"><i class="fa fa-flag-o">☆☆☆☆☆</i></div>
                <div class="want_watch" @click="wantWatch" v-else>想看{{wish}}</div>
                <div class="watched" @click="Watched" v-if="this.watchs || this.watchedSion"><i class="fa fa-flag-checkered">★★★★★</i></div>
                <div class="watched" @click="Watched" v-else>已看过{{watched}}</div>
                
            </div>
            <div class="synopsis">
                <h2 class="title">剧情简介：</h2>
                <p class="content">{{summary}}</p>
            </div>
            <div class="movier">
                    <h2 class="title">电影人：</h2>
                    <div class="cast_box">

                        <div class="cast_item" v-for="dir in directors">
                            <img :src="wserv+dir.avatars.small" alt="">
                            <div class="item_title overflowHidden">{{dir.name}}</div>
                            <span>导演</span>
                        </div>

                        <div class="cast_item" v-for="cas in casts">
                            <img :src="wserv+cas.avatars.small" alt="">
                            <div class="item_title overflowHidden">{{cas.name}}</div>
                            <span></span>
                        </div>

                    </div>
            </div>
        </div>

        <!-- <Nav></Nav> -->
    </div>
</template>

<script>
    export default {
        data(){
            return{
                wserv:this.$com.wserv,
                tem:null, // 定义一个临时变量
                rat:null,
                title:'电影名',tag:'',original_title:'电影原名',ratings_count:'评分人数',comments:'评论数量',rating:0,summary:'电影简介',wish:'想看人数',watched:'已看过人数',year:'上映年份',img:'海报图片',country:'',aka:'其他译名',
                directors:'导演',casts:'主演',
                vy:'',
                want_watch:false,
                watchs:false,
                json:'',
                wantSion:false,
                watchedSion:false,
            }
        },
        created(){
            this.$ajax.get(`/api/subject/${this.$route.query.id}`)
            .then(res=>{
                this.tem=res.data
                this.title=this.tem.title
                this.original_title=this.tem.original_title
                this.ratings_count=this.tem.ratings_count    // 评分人数
                this.rating=this.tem.rating.average     // 评分
                this.rat=String(this.rating).length==1 && this.rating>0?`${this.rating}.0`:this.rating
                this.summary=this.tem.summary
                this.wish=this.tem.wish_count
                this.watched=this.tem.collect_count
                this.img=this.tem.images.large
                this.year=this.tem.year
                this.getItems(this.tem.countries)   // 国家
                this.country=this.vy
                this.getItems(this.tem.genres) // 电影标签
                this.tag=this.vy
                this.getItems(this.tem.aka) // 其他译名
                this.aka=this.vy
                this.directors=this.tem.directors   // 导演
                this.casts=this.tem.casts           // 主演
            })
            .catch(err=>{
                alert('错误:'+err)
            })
            this.change()
        },
        methods:{
            getItems:function(t){
                if(this.vy.length>0){
                    this.vy=''
                }
                t.forEach(item => {
                    this.vy+=`${item} `
                })
            },
            
            wantWatch:function(){   // 想看
                this.watchedSion=false
                this.want_watch=!this.want_watch
                if(this.watchs){
                    this.watchs=!this.watchs
                }
                else{
                    this.wantSion=false
                }
                let id = this.$com.getID()
                this.json=JSON.parse(`[{"id":${id},"name":"${this.title}","src":"${this.wserv+this.img}"}]`) // 避免错误先对象化一次
                
                if(this.want_watch){ // 保存到sion
                    this.$com.setWantWatchedSion('want_watch',JSON.stringify(this.json))
                    this.$com.remWantWatchedSion('watched',JSON.parse(this.$com.getSion('watched')),id)
                }
                else{   // 删除对应数据
                    this.$com.remWantWatchedSion('want_watch',JSON.parse(this.$com.getSion('want_watch')),id)
                }
            },
            Watched:function(){     // 已看过
                this.watchs=!this.watchs
                this.wantSion=false
                if(this.want_watch){
                    this.want_watch=!this.want_watch
                }
                else{
                    this.watchedSion=false
                }
                let id = this.$com.getID()
                this.json=JSON.parse(`[{"id":${id},"name":"${this.title}","src":"${this.wserv+this.img}"}]`) // 避免错误先对象化一次
               
               if(this.watchs){ // 保存到sion
                    this.$com.setWantWatchedSion('watched',JSON.stringify(this.json))
                    this.$com.remWantWatchedSion('want_watch',JSON.parse(this.$com.getSion('want_watch')),id)                    
                }
                else{   // 删除对应数据
                    this.$com.remWantWatchedSion('watched',JSON.parse(this.$com.getSion('watched')),id)
                }
            },
            judge(key){
                let id = this.$com.getID()
                let arr = JSON.parse(this.$com.getSion(key))
                let res = this.$com.searchJson(arr,id)
                return res
            },
            change:function(){
                if(this.judge('want_watch')){
                    this.wantSion=true
                    this.watchedSion=false
                    this.watchs=false
                }
                else{
                    this.wantSion=false
                }
                if(this.judge('watched')){
                    this.watchedSion=true
                    this.wantSion=false
                    this.want_watch=false
                }
                else{
                    this.watchedSion=false
                }
            },
        },
        watch:{
            
        }
    }
</script>

<style lang="stylus" scoped>
#detail
    color #777
    background #fff
    .poster
        text-align center
        padding 50px 0 20px
        background #555
        img
            width 50%
    
    .move_info
        padding 0 20px
        .probable
            display flex
            justify-content space-between
            height 140px
            .desc
                flex 70% 0 0
                overflow hidden
                display flex
                flex-direction column
                justify-content space-around
                .title
                    color #333
                    font-size 18px
                    padding 10px 0 5px
                span
                    font-size 12px

            .rank
                height 100px
                padding 10px 15px
                margin-top 15px
                box-shadow 0 0 5px #ccc
                background #f8f8f8
                display flex
                flex-direction column
                justify-content space-between
                align-items center
                span,.origin
                    font-size 12px
                .rating
                    font-size 18px
                    color #333
        .operate
            color #26a2ff
            height 3px
            margin-top 20px
            line-height 35px
            font-size 14px
            text-align center
            display flex
            div
                height 35px
                margin-right 20px
                border 1px solid #26a2ff
                border-radius 5px
            .want_watch
                flex 2
                i
                    font-size 24px
                    line-height 35px
            .watched
                flex 2
                i
                    font-size 24px
                    line-height 35px
        .synopsis
            margin-top 20px
            padding-top 20px
            .title
                font-size 12px
            .content
                color #333
                padding-top 10px
                font-size 14px
                line-height 25px
        .movier
            width 100%
            padding 10px 0
            .title
                font-size 12px 
                padding-bottom 4px
            .cast_box
                width 100%
                overflow hidden
                display flex
                flex-wrap nowrap
                overflow-x scroll
                .cast_item
                    width 90px
                    vertical-align top
                    font-size 12px 
                    text-align center
                    margin-right 8px
                    img 
                        width 90px
                        height 120px
                    .item_title
                        color #333333
                        height 17px


                    





</style>
