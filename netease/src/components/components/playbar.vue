<template>
  <div id="playbar">
    <div class="bar">
      <!--<p>{{_id}}</p>-->
      <div class="musicImg">
        <!--<router-link tag="img" :src="songImg" alt="" width="100%" :to="{path:'/comment?id='+thisId,query:{musicId:_id}}"></router-link>-->
        <img :src="songImg" alt="" width="100%" v-on:click="toComment()">

      </div>
      <div class="other">
        <audio :src="_src" autoplay id="_audio" loop></audio>
        <div>
          <div style="font-size: 14px">{{songname}}</div>
          <div style="font-size: 12px;color: grey;">{{artname}}</div>
        </div>
        <div>
          <van-icon name="arrow-left" v-on:click="_prev()"/>
          <van-icon :name="play?'pause':'play'" v-on:click="isplay()"/>
          <van-icon name="arrow" v-on:click="_next()"/>
      </div>
    </div>
  </div>

  </div>
</template>
<script>
  export default {
    name:'playbar',
    data: () => ({
      srcData:{},
        play:true,
      isshow:false,
    }),
//    props:{
//      playstate:{type:string,default:'播放'}
//    },
    mounted(){
//      this.srcData=this.$store.state.srcData
    },
    computed:{
      _src(){
        if(this.$store.state.srcData.url){
          return this.$store.state.srcData.url
        }else{
          this.$toast('资源么得了');
        }
//        return this.$store.state.srcData.url?this.$store.state.srcData.url:''
      },
      _id(){
        return this.$store.state
      },
      songImg(){
        return this.$store.state.songInfo.al.picUrl
      },
      artname(){
        return this.$store.state.songInfo.ar[0].name?this.$store.state.songInfo.ar[0].name:' ';
      },
      songname(){
        return this.$store.state.songInfo.name?this.$store.state.songInfo.name:'请选择歌曲';
      }
    },
    methods:{
      isplay(){
        let _audio=document.getElementById('_audio');
        if(this.play){
          this.play=false;
          _audio.pause();
        }else{
          this.play=true;
          _audio.play();
        }
      },
      _prev(){
        let now = this.$store.state.nowId;
        let index;
        let _this=this;
        for(let i=0,len=this.$store.state.trackIds.length;i<len;i++){
          if(this.$store.state.trackIds[i]==now){
            index=i
          }
        }
        let previndex=this.$store.state.trackIds[index-1];
        this.axios.all([
          this.axios.get(this.HOST + `/music/url?id=${previndex}`),
          this.axios.get(this.HOST + `/song/detail?ids=${previndex}`)
        ]).then(this.axios.spread((resurl,info)=>{
          _this.$store.state.songInfo=info.data.songs[0];
          _this.$store.state.srcData.url=resurl.data.data[0].url;
          _this.$store.state.nowId=previndex;
          _this.play=true;
        }))
      },
      _next(){
        let now = this.$store.state.nowId;
        console.log(now)
        let index;
        let _this=this;
        for(let i=0,len=this.$store.state.trackIds.length;i<len;i++){
          if(this.$store.state.trackIds[i]==now){
            index=i
          }
        }
        let previndex=this.$store.state.trackIds[index+1];
        this.axios.all([
          this.axios.get(this.HOST + `/music/url?id=${previndex}`),
          this.axios.get(this.HOST + `/song/detail?ids=${previndex}`)
        ]).then(this.axios.spread((resurl,info)=>{
          _this.$store.state.songInfo=info.data.songs[0];
          _this.$store.state.srcData.url=resurl.data.data[0].url;
          _this.$store.state.nowId=previndex;
          _this.play=true;
        }))
      },
      toComment(){//弹出层
        let path = `/comment?id=${this.$store.state.nowId}`;
        this.$router.push({path:path});
      }
    }
  }
</script>
<style scpoed>
  .bar {
    width:100%;
    background: white;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2) inset;
    padding: 5px;
    position: fixed;
    bottom:0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .musicImg {
    width: 50px;
    height: 50px;
    outline:1px solid gainsboro;
    border-radius: 3px;
    overflow: hidden;
  }
.musicImg>img {
  width: 50px;
}
  .other {
    margin-left:10px;
    width: 75%;
    display: flex;
    justify-content: space-between;
  }
</style>
