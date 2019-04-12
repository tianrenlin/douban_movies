<template>
    <div id="mine">
        <mainHeader></mainHeader>
        <div class="mine">
            <div class="info">
                <div class="title">
                    <h2 class="name"><input v-model="name" readonly></h2>
                    <span class="fa fa-pencil-square-o" @click="modification"></span>
                </div>
                <div class="person">
                    <div class="poster">
                        <img :src="src" @click="actionSheet" alt="">
                        <input type="file" ref="files" id="file">
                    </div>
                    <div class="static">
                        <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday" readonly disableClear></mt-field>   
                        <mt-field label="手机" placeholder="请输入手机号" type="tel" v-model="phone"  disableClear readonly :attr="{maxlength:11}"></mt-field>
                        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" readonly disableClear></mt-field>
                        <mt-field label="地址" placeholder="请输入地址" type="address" v-model="address" readonly disableClear ></mt-field>
                    </div>
                </div>
                <mt-field class="intr" label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-model="introduction" readonly disableClear></mt-field>                    
                <mt-actionsheet :actions="actions" v-model="sheet"></mt-actionsheet>
            </div>
            <div class="headle">
                <div class="want_witched">
                    <fieldset>
                        <legend> ☆☆☆☆☆ |  ★★★★★ </legend> 
                            <div>
                                <mt-button type="primary" plain size="small" @click="want">想 看</mt-button>
                                <mt-button type="danger" plain size="small" @click="watched">看 过</mt-button>
                            </div>
                    </fieldset>
                </div>
            </div>
            <div class="abstract">
                <fieldset class="fdt">
                    <legend> 项目简介 </legend> 
                        <div class="content">
                            {{abstract}}
                        </div>
                </fieldset>
            </div>
            <transition name="want">
                <div class="want_watched" v-show="wantShow">
                    <fieldset>
                        <legend> 我想看的电影 </legend> 
                            <div class="content tab1">
                                <mu-chip delete v-for="(chip,index) in chip1" @delete="remove1(index)" :key="index" :color="color.length>index?color[index]:color[index%color.length]">
                                    <router-link :to="{path:url+chip.id}">
                                        <mu-avatar :size="32">
                                            <img :src="chip.src" >
                                        </mu-avatar>
                                        {{chip.name}}
                                    </router-link>
                                </mu-chip>
                            </div>
                    </fieldset>
                    <mt-button type="danger" @click="back1" class="back"> 返 回 </mt-button>
                </div>
            </transition>
            <transition name="want">
                <div class="want_watched" v-show="watchedShow">
                    <fieldset>
                        <legend> 我看过的电影 </legend> 
                            <div class="content tab2">
                                <mu-chip delete v-for="(chip,index) in chip2" @delete="remove2(index)" :key="index" :color="color.length>index?color[index]:color[index%color.length]">
                                    <router-link :to="{path:url+chip.id}">
                                        <mu-avatar :size="32">
                                            <img :src="chip.src" >
                                        </mu-avatar>
                                        {{chip.name}}
                                    </router-link>
                                </mu-chip>
                            </div>
                    </fieldset>
                    <mt-button type="danger" @click="back2" class="back"> 返 回 </mt-button>
                </div>
            </transition>
        </div>
        <Nav></Nav>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                mod:false,
                name:'刀郎',
                src:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1144022934,561917746&fm=58&bpow=450&bpoh=586',
                birthday:'1971-06-22',
                email:'12345678@qq.com',
                address:'四川省内江市资中县罗泉镇',
                phone:'12345678910',
                introduction:'大红大紫之际不忘初心，归隐乡里之时仍创佳作。',
                sheet:false,
                actions:[
                    {
                        name:'从相册中选择',
                        method:this.getPicture
                    }
                ],
                isShow:false,
                abstract:'该项目主要是由VUE+Mint-ui+Muse-ui构成，其数据几乎来自豆瓣电影开放API，其中用到了vue-cli、axios、vue-router、stylus、sass以及promise、import、webStorage等。',
                wantShow:this.$com.getSion('wantShow') || false,watchedShow:this.$com.getSion('watchedShow') || false,
                chip1:JSON.parse(this.$com.getSion('want_watch')),
                chip2:JSON.parse(this.$com.getSion('watched')),
                url:'detail?id=',
                color:['primary','secondary','success','warning','error'],
            }
        },
        created(){
            // 获取本地sion填充myInfo
            let myInfo = JSON.parse(this.$com.getSion('mineInfo'))
            let infoArr = ['name','src','birthday','email','address','phone','introduction']
                if(myInfo){
                    for(let i=0;i<infoArr.length;i++){
                        this.infoFn(infoArr[i],myInfo[0])
                    }
                }
        },
        methods:{
            modification:function(){   // 修改个人信息
                this.mod=!this.mod
                let fa = document.getElementsByClassName('fa')[0]
                let ipt = document.querySelectorAll('.info input')
                let txra = document.querySelectorAll('.mint-cell-value textarea')
                if(this.mod){   // 修改
                    fa.setAttribute("class", "fa fa-check-square-o")
                    this.changeMod(0,ipt)
                    this.changeMod(0,txra)
                }
                else{   // 完成
                    fa.setAttribute("class", "fa fa-pencil-square-o")
                    this.changeMod(1,ipt)
                    this.changeMod(1,txra)
                    this.$toast({
                        message: '修改成功！',
                        duration: 1800
                    });
                    let myInfo = `[{"name":"${this.name}","src":"${this.src}","birthday":"${this.birthday}","email":"${this.email}","address":"${this.address}","phone":"${this.phone}","introduction":"${this.introduction}"}]`
                    this.$com.setSion('mineInfo',myInfo)
                }
            },
            changeMod:function(judge,arr){
                if(judge){  // 完成
                    for(let i=0;i<arr.length;i++){
                        arr[i].setAttribute("readonly","readonly")
                    }
                }
                else{   // 修改
                    for(let i=0;i<arr.length;i++){
                        arr[i].removeAttribute("readonly")
                    }
                }
            },
            actionSheet:function(){
                if(this.mod){
                    this.sheet=true
                }
            },
            getPicture:function(){  // 从本地中选择（自带有拍照）
                let _this=this
                _this.$refs.files.click()
                // 打开本地文件夹
                document.getElementById('file').onchange=function(e){
                    let url = null;
                    let file = e.target.files[0]
                    if (window.createObjectURL!=undefined) {    // basic
                        url = window.createObjectURL(file) ;
                    } else if (window.URL!=undefined) {         // firefox
                        url = window.URL.createObjectURL(file) ;
                    } else if (window.webkitURL!=undefined) {   // webkit、chrome
                        url = window.webkitURL.createObjectURL(file) ;
                    }
                    _this.src=url
                }
                
            },
            back1:function(){
                this.wantShow=false
                this.$com.remSion('wantShow')
            },
            back2:function(){
                this.watchedShow=false
                this.$com.remSion('watchedShow')
            },
            want:function(){    // 想看
                this.wantShow=true
                this.$com.setSion('wantShow',true)
            },
            watched:function(){ // 看过
                this.watchedShow=true
                this.$com.setSion('watchedShow',true)
            },
            remove1:function(i) {
              this.chip1.splice(i, 1);  // 点击“x”
              // 获取ID
              let chip=document.querySelectorAll('.tab1 .mu-chip')[i].firstChild
              let href=chip.getAttribute("href")
              let id=href.substring(href.search(/=/)+1,href.length)
              // 进行删除
              this.$com.remWantWatchedSion('want_watch',JSON.parse(this.$com.getSion('want_watch')),id)
            },
            remove2:function(i) {
              this.chip2.splice(i, 1);  // 点击“x”
              // 获取ID
              let chip=document.querySelectorAll('.tab2 .mu-chip')[i].firstChild
              let href=chip.getAttribute("href")
              let id=href.substring(href.search(/=/)+1,href.length)
              console.log(id,1)
              // 进行删除
              this.$com.remWantWatchedSion('watched',JSON.parse(this.$com.getSion('watched')),id)
            },
            infoFn(parm,myInfo){
                this[parm] = myInfo[parm]
                
            },
        },
        

    }
</script>

<style lang="stylus" scoped>
    #mine
        .mine
            padding 0 10px
            margin: 60px 0
            display flex
            min-height 1vh
            flex-direction column
            .info
                .title
                    display flex
                    justify-content space-between
                    align-items center
                    .name
                        input
                            color #494949
                            font-size 16px;
                            font-weight bold
                            border none
                            outline none
                    span
                        color #26a2ff
                        font-size 20px
                .person
                    display flex
                    margin-top 10px
                    .poster
                        flex 2
                        height 160px
                        img 
                            width 100%
                            height 100%
                        #file
                            display none
                    .static
                        flex 4
                .intr
                    margin-top 10px
            .headle,.abstract
                fieldset
                    padding:10px 0;
                    width:99%
                    color:#333; 
                    border:#26a2ff dashed 1px;
                    legend
                        text-align center
                        color:#26a2ff;
                        background:#fff;
                    div
                        display flex
                        justify-content space-around
                .fdt
                    border:#26a2ff solid 1px;
            .want-enter-active, .want-leave-active
                transition all 0.5s linear
                transition translate3d(0,0,0)
            .want-enter, .want-leave
                opacity 0
                // transform translate3d(100%,0,0)
            .want_watched
                position absolute
                top 48px
                left 0
                right 0
                bottom 54px
                z-index 1
                background #fff
                padding-top 20px
                overflow hidden
                fieldset
                    border none
                    border-top:4px double #26a2ff;
                    legend
                        color #26a2ff
                        text-align center
                    .content
                        max-height: 545px;
                        padding-top 10px
                        display flex
                        justify-content space-between
                        flex-wrap wrap
                        overflow-y scroll
                        .mu-chip
                            margin 10px 0 
                            a
                                height 34px
                                color #fff
                                display: flex
                                align-items: center
                .back
                    position absolute
                    bottom 2px
                    width 100% 
                   
                    
        
        
        


            


    
</style>
