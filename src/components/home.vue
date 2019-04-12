<template>
  <div id="home">
    <mainHeader></mainHeader>
    <div id="navBar">
        <mt-navbar fixed v-model="selected">
            <mt-tab-item id="tab1">热播电影</mt-tab-item>
            <mt-tab-item id="tab2">即将上映</mt-tab-item>
        </mt-navbar>
          <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="tab1">
                    <List :subjects="subjects"></List>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab2">
                     <List :subjects="subjects2"></List>
                </mt-tab-container-item>
            </mt-tab-container>
          <!-- </mt-loadmore> -->
    </div>
    <Nav></Nav>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        selected:"tab1" ,
        //poster:'海报',title:'电影名称',scroe:'无',year:'年份',director:'导演',casts:'主演',watched:'看过人数',
        temporary:null, // 定义一个临时变量
        count:0,
        subjects:null,
        wserv:this.$com.wserv,
        
        temporary2:null, // 定义一个临时变量
        count2:0,
        subjects2:null,
      }
    },
    created(){
        // 正在热播
      this.$com.Get('/api/in_theaters')
      .then(res=>{
          this.temporary=res
          this.count=this.temporary.count
          this.subjects=this.temporary.subjects
      });
      // 即将上映
    this.$com.Get('/api/coming_soon')
      .then(res=>{
          this.temporary2=res
          this.count2=this.temporary2.count
          this.subjects2=this.temporary2.subjects
      });
    },
    methods:{

    },
  }
</script>

<style lang="scss" scoped>
  #home{
    .mint-tab-container{margin-top:2px;}
    .mint-navbar.is-fixed{top:48px;}  // navbar固定调整
    .mint-tab-container{margin-top: 130px;}  // container
    .mint-navbar .mint-tab-item.is-selected{margin-bottom: 0;}
  }
</style>

