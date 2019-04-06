// 排行榜：top250、北美票房榜、新片榜、本周口碑榜
// 实现思路：先获取4个接口的数据，再分别截取前3个数据渲染到DOM
<template>
    <div id="rank">
        <mainHeader></mainHeader>
        <div class="box">
            <div class="item" @click="top250">
                <div class="detail">
                    <h2>{{title1}}</h2>
                    <span>8分以上好电影</span>
                </div>
                <div class="rank_img">
                    <img :src="(wserv)+d.images.small" alt="" v-for="(d,index) in data1.slice(0,3)" :key="index">
                </div>
            </div>
            <div class="item item2" @click="usa">
                <div class="detail">
                    <h2>{{title2}}</h2>
                    <span>{{date2}}</span>
                </div>
                <div class="rank_img">
                    <img :src="(wserv)+d.subject.images.small" alt="" v-for="(d,index) in data2.slice(0,3)" :key="index">
                </div>
            </div>
            <div class="item item3" @click="news">
                <div class="detail">
                    <h2>{{title3}}</h2>
                    <span>热播高分新片</span>
                </div>
                <div class="rank_img">
                    <img :src="(wserv)+d.images.small" alt="" v-for="(d,index) in data3.slice(0,3)" :key="index">
                </div>
            </div>
            <div class="item item4" @click="week">
                <div class="detail">
                    <h2>{{title4}}</h2>
                    <span>本周好电影</span>
                </div>
                <div class="rank_img">
                    <img :src="(wserv)+d.subject.images.small" alt="" v-for="(d,index) in data4.slice(0,3)" :key="index">
                </div>
            </div>
        </div>
        <Nav></Nav>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                wserv:this.$com.wserv,
                data1:null,title1:null,url1:'top250',
                data2:null,date2:null,title2:null,url2:'us_box',
                data3:null,title3:null,url3:'new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a',
                data4:null,title4:null,url4:'weekly?apikey=0df993c66c0c636e29ecbb5344252a4a',
                SetSion:this.$com.setSion
            }
        },
        created(){

            this.$com.Get(`/api/${this.url1}`)    // top250
            .then(res=>{
                this.data1=res.subjects
                this.title1=res.title
            })
            this.$com.Get(`/api/${this.url2}`)    // 北美票房榜
            .then(res=>{
                this.data2=res.subjects
                this.date2=res.date
                this.title2=res.title
            })
            this.$com.Get(`/api/${this.url3}`)    // 新片榜
            .then(res=>{
                this.data3=res.subjects
                this.title3=res.title
            })
            this.$com.Get(`/api/${this.url4}`)    // 本周口碑榜
            .then(res=>{
                this.data4=res.subjects.slice(0,3)
                this.title4=res.title
            })
        },
        methods:{
            top250:function(){
                this.$router.push({name:'rd',})
                this.$com.setSion('detailUrl',this.url1)
                // window.sessionStorage.setItem('detailUrl',this.url1);
            },
            usa:function(){
                this.$router.push({name:'rd',})
                window.sessionStorage.setItem('detailUrl',this.url2);
            },
            news:function(){
                this.$router.push({name:'rd',})
                window.sessionStorage.setItem('detailUrl',this.url3);
            },
            week:function(){
                this.$router.push({name:'rd',})
                window.sessionStorage.setItem('detailUrl',this.url4);
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" scoped>
    #rank{
        color: #fff;
        font-size: 12px;
        text-align: center;
        margin-top: 50px;
        .box{
            height: 580px;
            padding: 0 10px;
            margin-top: 65px;
            .item{
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 130px;
                margin-top: 14px;
                border-radius: 10px;
                background: linear-gradient(#e1a708,#efd491);
            
                .detail{
                    vertical-align: top;
                    display: inline-block;
                    box-sizing: border-box;
                    padding-top: 50px;
                    width: 40%;
                    height: 100%;
                    text-align: center;
                    h2{font-size: 18px;}
                }
                .rank_img{
                    vertical-align: top;
                    display: inline-block;
                    width: 55%;
                    height: 100%;
                    text-align: center;
                    img{
                        display: inline-block;
                        vertical-align: text-top;
                        position: relative;
                        top: 50%;
                        -webkit-transform: translateY(-50%);
                        transform: translateY(-50%);
                        width: 30%;
                        margin: 0;
                        &:nth-child(2){
                            width: 35%;
                        }
                    }
                }
        }
            .item2{background: linear-gradient(#a361c3,#d9b9e8);}
            .item3{background:linear-gradient(#dd7286,#f3b9c5)}
            .item4{background: linear-gradient(#26A2FF,#AAD6F5);}
        }
    }
</style>
