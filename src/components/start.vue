<template>
    <div class="star">
        <span v-for="(item,index) in itemClasslass" class="star-item" :key="index" :class="item"></span>
    </div>
</template>
<script>
const lengths = 5;
const starOn = 'on';
const starHalf = 'half';
const starOff = 'off';
  export default({
    data(){
      return {
      }
    },
    props:{
      score:{
        type:Number,
        default:function(){
          return 5
        }
      }
    },
    created() {
    },
    computed:{
      itemClasslass(){//星星的数组
          let result = [];
          let score = Math.round(this.score) / 2;       //四舍五入 
          let starhalf = score%1 > 0 ? true : false ;  // 半星
          let fullstar = Math.floor(score);           // 全星
        // 存放全星
          for(var i=0 ; i<fullstar;i++){    
            result.push(starOn);
          }
        // 存放半星
          if(starhalf){                     
            result.push(starHalf)
          }
        // 存放无星且自动补齐
          if(result.length < lengths){
            var offstar = lengths - result.length;
            for(var i=0;i<offstar;i++){
                result.push(starOff);
            }
          };
          return result;
      }
    }
  })
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.stylus';
.star
    display flex
    flex-direction row
    align-items center
    .star-item
        width 10px
        height 10px
        display inline-block
        background-repeat no-repeat
        background-size 20px 20px
        &.on
            bg-image('full')
        &.half
            bg-image('half')
        &.off
            bg-image('null')
</style>
