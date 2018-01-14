import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
      params:{},
      srcData:{url:'     '},
      songInfo:{
        al:{picUrl:'http://p1.music.126.net/MaUx2Rx92sBuE_5n8KfTog==/528865094249209.jpg'},
        ar:[{name:''}],
        name:'',
        trackIds:[],
        nowId:0 //正在播放的歌曲id
      },
      barNames:{},
      playstate:'播放',
      goBack:'wap-nav',  //导航条左侧按钮变化
      commentId:0
    },
    mulations:{

    }
})
