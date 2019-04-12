<template>
    <div id="list" >
        <router-link :to="{name:'detail',query:{id:list.id}}" v-for="(list,index) in subjects" :key='index'>
            <div class="item">
                <div class="poster">
                    <img v-lazy="(wserv)+list.images.large" alt="">
                </div>
                <div class="detail">
                    <div class="title">
                        <h3 class="overflowHidden">{{list.title}}</h3>
                        <div class="score">{{String(list.rating.average).length==1 && list.rating.average>0?list.rating.average+'.0':list.rating.average}}</div>
                    </div>
                    <Start :score="list.rating.average"></Start>
                    <div class="year">年份：{{list.year}}</div>
                    <div class="director">导演：<span v-for="(d,index) in list.directors">{{d.name}} </span></div>
                    <div class="casts overflowHidden">主演: <span v-for="(c,index) in list.casts">{{c.name}} </span></div>
                    <div class="watched">{{list.collect_count}}人看过</div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        // 接收父组件传过来的值
        props:{
            subjects:{
                type:Array,
                required:true
            },
        },
        data(){
            return{
                wserv:this.$com.wserv
            }
        },
        created(){
            // this.casts.forEach(item => {
            //     this.cast+=`${item.name} `
            // })
            // this.rat=String(this.scroe).length==1 && this.scroe>0?`${this.scroe}.0`:this.scroe
        }
    }
</script>


<style lang="stylus" scoped>
    #list
        font-family: 'microsoft yahei';
        .item
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 125px;
            padding: 0 15px;
            margin-bottom  30px
            box-sizing border-box
            .poster
                width: 80px;height: 123px;margin-right: 10px;
                img
                    width: 80px;height: 120px;
        .detail
            width: 80%;height: 120px;color:#777;
            .title
                display:flex; 
                flex-direction: row;
                justify-content: space-between;
                h3
                    font-size: 14px;
                    color: #333;
                    width: 220px;
                    margin: 0
                .score
                    color: red;
                    width: 26px;
                    height: 26px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 22px;
                    border:2px solid #FF9900;
                    border-radius: 50%;
                
            
            .year,.watched
                font-size: 12px;
            .director,.casts
                width: 85%;
                font-size: 12px;
                span
                    font-size: 12px;
            .watchedfont-size
                12px;
                color: #333;
    // 懒加载 
    img[lazy=loading]
        background: url("../assets/img/lazy.gif")center center no-repeat;
    
</style>
