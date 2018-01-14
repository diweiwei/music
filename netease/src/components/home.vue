<template>
  <div id="home">
    <!--<mynav></mynav>-->
    <h2 style="color: white;">你好！{{nickname}}</h2>
    <img :src="avatar" alt="hhh" class="avatar">
    <img :src="background" alt="hhh" class="bg">
    <!--<van-pull-refresh>-->
      <musiclist :listitem="play_listdata"></musiclist>
    <!--</van-pull-refresh>-->
    <!--<router-view></router-view>-->
  </div>
</template>
<script>
  import mynav from '@/components/components/nav'
  import musiclist from '@/components/components/musiclist'
  export default {
    name: "home",
    data: () => ({
      nickname: '',
      avatar: '',
      background: '',
      play_listdata:[]
    }),
    components: {
      mynav,
      musiclist
    },
    methods: {},
    mounted() {
      //本地存储 或 状态管理 两种方式传递参数
      let readParams = JSON.parse(localStorage.getItem('params'));
//      let readParams=JSON.parse(this.$store.state.params);
      this.nickname = readParams.profile.nickname;
      let _this = this;
      this.axios.all([
        this.axios.get(this.HOST + `/user/detail?uid=${readParams.profile.userId}`),
        this.axios.get(this.HOST + `/user/playlist?uid=${readParams.profile.userId}`),
      ]).then(this.axios.spread((userResp, playlist) => {
        // 上面两个请求都完成后，才执行这个回调方法
        _this.avatar = userResp.data.profile.avatarUrl;
        _this.background = userResp.data.profile.backgroundUrl;
//        console.log(userResp.data)
        for (let i=0,len=playlist.data.playlist.length;i<len;i++){
          _this.play_listdata.push({
            name:playlist.data.playlist[i].name,
            creator:playlist.data.playlist[i].creator,
            imgUrl:playlist.data.playlist[i].coverImgUrl,
            count:playlist.data.playlist[i].trackCount,
            id:playlist.data.playlist[i].id
          })
        }
      }));
    },
    computed: {}
  }
</script>
<style scoped>
  .avatar {
    width: 100px;
    border-radius: 50%;
  }
h2 {
  margin-top:60px;
}
  .bg {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(5px);
    transform: scale(1.1);
  }
</style>
