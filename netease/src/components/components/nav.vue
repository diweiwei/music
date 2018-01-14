<template>
  <div id="mynav">
    <nav class="nav" v-bind:class="{'op2':isA,'op1':isB}">
      <van-icon :name="wap" style="margin-left:15px"/>
      <div class="nav-center">
        <van-icon name="like-o"/>
        <van-icon name="wap-home"/>
        <van-icon name="contact"/>
      </div>
      <van-icon name="search"  style="margin-right:15px"/>
    </nav>
  </div>
</template>
<script>
  export default {
    name:'mynav',
    data: () => ({
      isA:true,
      isB:false,
      wap:'wap-nav'
    }),
    methods:{
      handleScroll () {
        let top=window.pageYOffset;
        if(top>150){
          this.isB=true;
          this.isA=false;
        } else if (top<35){
          this.isB=false;
          this.isA=true;
        }
      },
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);

    },
    watch:{
      $route(){
        this.wap=this.$store.state.goBack
      }
    }
  }
</script>
<style scpoed>
  .nav {
    position: fixed;
    top: 0;
    color:white;
    display: block;
    /*width: 100%;*/
    width: 100vw;
    height: 20px;
    padding: 14px 0;
    display: flex;
    justify-content: space-between;
    transition: .3s all ease;
    z-index: 2;
  }
  .op2 {
    background-color: rgba(0,0,0,0.2);
  }
  .op1 {
    background-color: rgba(234,6,6,1);
  }
  .nav-center{
    width: 45%;
    display: flex;
    justify-content: space-around;

  }
</style>
