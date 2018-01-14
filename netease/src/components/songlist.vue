<template>
  <div id="songlist">
    <div class="header">
      <div class="h_l">
        <img :src="coverImgUrl" alt="">
      </div>
      <div class="h_r">
        <div>{{listname}}</div>
      </div>
    </div>
    <img :src="coverImgUrl" alt="" class="bg1">
    <div class="main_bg">
      <div v-for="(i,index) in songlistData" class="song_list">
        <div class="left">
          <div>{{i.name}}</div>
          <div style="color: grey;font-size: 12px">
            <span v-for="x in i.ar">{{x.name}}</span>
          </div>
        </div>
        <div class="right">
          <!--<span v-on:click="_play(i.id)">播放</span>-->
          <van-icon name="play"  v-on:click="_play(i.id)"/>&nbsp;
          <van-icon name="more-o" v-on:click="showhide(i.id)"/>
        </div>

      </div>
    </div>
    <van-actionsheet v-model="show" :actions="actions" />
  </div>
</template>
<script>
  export default {
    name:'songlist',
    data: () => ({
      disabled:false,
      show:false,
     songlistData:[],
      coverImgUrl:'',
      listname:'',
      actions: [
        {
          name: '下载',
          id:null,
          callback: (name)=>{
            console.log(name.id)
          }
        },
        {
          name: '信用卡支付'
        },
        {
          name: '选项',
          loading: true
        }
      ]
    }),
    mounted(){
      let _this = this;
      this.axios.all([
        this.axios.get(this.HOST + `/playlist/detail?id=${this.$route.query.id}`)
      ]).then(this.axios.spread((songlistData) => {
        console.log(songlistData.data)
        localStorage.setItem('songlistData',JSON.stringify(songlistData.data));

          console.log(songlistData.data.playlist.tracks)
          _this.songlistData=songlistData.data.playlist.tracks;

        _this.coverImgUrl=songlistData.data.playlist.coverImgUrl;
        _this.listname=songlistData.data.playlist.name;
        let idarr=[];
        for(let i=0,len=songlistData.data.playlist.trackIds.length;i<len;i++){
          idarr.push(songlistData.data.playlist.trackIds[i].id)
        }
        _this.$store.state.trackIds=idarr;
//        console.log(_this.songlistData)
      }));
    },
    methods:{
      showhide(id){
        this.show=this.show?false:true;
        this.actions[0].id=id;
      },
      loadMore(){
        this.disabled=true;
        console.log(1)
        let data = JSON.parse(localStorage.getItem('songlistData'));
        for(let i=0;i<5;i++){
          this.songlistData.push(data[i])
        }

      },
      onClick(name){
        console.log(name)
      },
      _play(id){
//        console.log('play')
//        this.axios({
//          url:this.HOST + `/music/url?id=${id}`,
//        }).then((res)=>{
//          console.log(res.data)
//          this.$store.state.srcData=res.data.data[0];
//          this.$store.state.thisid=res.data.data[0].id;
//      })
        //
        let _this=this;
        console.log(id)
        this.$store.state.nowId=id;
        console.log(this.$store.state.nowId)
        this.axios.all([
          this.axios.get(this.HOST +  `/music/url?id=${id}`),
          this.axios.get(this.HOST + `/song/detail?ids=${id}`),
        ]).then(this.axios.spread((res, info) => {
          _this.$store.state.srcData=res.data.data[0];
          console.log(res.data)
          console.log('信息',info.data)//歌曲信息
          _this.$store.state.songInfo=info.data.songs[0];
          _this.$store.state.playstate='暂停';
        }));
        _this.$store.state.nowId=id;
      }
    }
  }
</script>
<style scpoed>
  .left {

  }
  .right {

  }
  .song_list {
    width:78vw;
    margin:10px 3vw;
    padding: 10px 8vw;
    background: ghostwhite;
    border-radius: 100px;
    box-shadow: 3px 3px 15px rgba(0,0,0,0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bg1 {
    width:100vw;
    position: fixed;
    top:0;
    left:0;
    z-index: -1;
    transform: scale(1.2);
    filter: blur(25px);
  }
  .header {
    margin:60px 3vw 0 3vw;
    display: flex;
    justify-content: flex-start;
    color: white;
  }

  .h_l>img {
    width:30vw;
    margin-right:20px;
  }
  .main_bg {
    background: white;
    padding-top:5px;
    margin-top:8px;
  }
</style>
