import Vue from 'vue'
import App from './App'
import router from './router'

// ============================引入第三方组件===========================
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
 
import {Chip,Avatar} from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(Chip);
Vue.use(Avatar);


  // 左右活动 navbar
import { Navbar, TabItem, TabContainer,TabContainerItem} from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);



import Axios from 'axios'
Vue.prototype.$ajax=Axios
  //设置默认请求前缀
// Axios.defaults.baseURL="https://api.douban.com/v2/movie/"

  // 引入一些css
  import './assets/css/font-awesome.min.css'
  import './assets/css/common.stylus'
    // 引入一些js
  import COM from './assets/js/common.js'
  Vue.prototype.$com = COM

  // import BUS from './assets/js/bus.js'
  // Vue.prototype.$bus=BUS

Vue.config.productionTip = false

//  设置title
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
