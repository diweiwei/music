import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

Vue.use(Router)


let router=new Router({
  // scrollBehavior(to, from, savePosition) {
  //
  //   if (savePosition) {
  //     console.log(savePosition,'有');
  //     return savePosition;
  //   } else {
  //     console.log('没有')
  //     return {x:0,y:0}
  //   }
  // },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{
        index:0
      }
    },
    {
      path: '/home',
      name: 'home',
      component:resolve=>{
        require(['@/components/home'],resolve)
      },
      meta:{
        index:1
      }
    },
    {
      path: '/songlist',
      name: 'songlist',
      component:resolve=>{
        require(['@/components/songlist'],resolve)
      },
      meta:{
        index:2
      }
    },
    {
      path:'/comment',
      name:'comment',
      component:resolve=>{
        require(['@/components/comment'],resolve)
      },
      meta:{
        index:3
      }
    }
  ]
})
router.beforeEach((to,from,next)=> {
  // console.log(to.meta.index)
  // console.log(from.meta.index)
  next()
})
export default router
