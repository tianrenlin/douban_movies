<template>
    <div id="nav">
		<mt-tabbar fixed v-model="active" value="active">
			<mt-tab-item id="/" :class="this.active=='/'?'blue':'gray'">
				<img slot="icon" src="../assets/img/index (1).png" v-if="this.active=='/'">
				<img slot="icon" src="../assets/img/index (2).png" v-else>
				<span class="tab">首页</span>
			</mt-tab-item>
			<mt-tab-item id="rank" :class="this.active=='rank'?'blue':'gray'">
				<img slot="icon" src="../assets/img/rank.png" v-if="this.active=='rank'">
				<img slot="icon" src="../assets/img/rank (2).png" v-else>
				<span class="tab">排行</span>
			</mt-tab-item>
			<mt-tab-item id="mine" :class="this.active=='mine'?'blue':'gray'">
				<img slot="icon" src="../assets/img/mine.png" v-if="this.active=='mine'">
				<img slot="icon" src="../assets/img/mine (2).png" v-else>
				<span class="tab">我的</span>
			</mt-tab-item>
		</mt-tabbar>
		<!-- <keep-alive exclude="home"> -->
			<router-view></router-view>
		<!-- </keep-alive> -->
    </div>
</template>

<script>
    export default {
        data(){
			return{
				active:'/',
			}
		},
		created(){
			var path=this.$router.currentRoute.path
			if(path.length>1){
				var newPath=String(path)
				this.active=newPath.substring(1,newPath.length)
			}
			else{
				this.active=path
			}
		},
		watch:{
			active:function(val){
				this.$router.push(val)
			}
		}
    }
</script>

<style lang="stylus" scoped>
    
	#nav
        margin-top: 50px;
		.tab
			font-size 12px
		.blue
			color #31A6FE
		.gray 
			color #777
    
</style>
