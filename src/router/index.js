import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/components/home'
import Rank from '@/components/rank'
import Mine from '@/components/mine'
import Search from '@/components/search'
import rankDetail from '@/components/rankDetail'

  // 主页面顶部
import mainHeader from '@/components/mainHeader'
Vue.component('mainHeader',mainHeader)
  // 底部导航
import Nav from '@/components/nav'
Vue.component('Nav',Nav)
  // 列表
import List from '@/components/list'
Vue.component('List',List)
  // 列表页
  import Views from '@/components/view'
  Vue.component('Views',Views)
  // 评分星星 start
import Start from '@/components/start'
Vue.component('Start',Start)
  // 详情页 
import Detail from '@/components/detail'
Vue.component('Detail',Detail)
  // 副顶部标题
import viceHeader from '@/components/viceHeader'
Vue.component('viceHeader',viceHeader)


export default new Router({
  mode:'history',
  routes: [
    {name: 'home',path: '/',component: Home,meta:{title:'豆瓣电影-首页'}},
    {name: 'rank',path: '/rank',component: Rank,meta:{title:'豆瓣电影-排行'}},
    {name: 'mine',path: '/mine',component: Mine,meta:{title:'豆瓣电影-个人主页'}},
    {name: 'search',path: '/search',component: Search,meta:{title:'豆瓣电影-搜索'}},
    {name: 'detail',path: '/detail',component: Detail,meta:{title:'豆瓣电影-电影详情'}},
    {name:'views',path:'/views',component:Views,meta:{title:'豆瓣电影-搜索详情'}},
    {name:'rd',path:'/rank_detail',component:rankDetail,meta:{title:'豆瓣电影-排行详情'}},
    // {name:'nav',path:'/',component:Nav}
  ]
})
