<template>
  <div id="app">
    <mynav></mynav>
    <transition :name="animateName">
      <router-view></router-view>
    </transition>
    <playbar></playbar>
  </div>
</template>

<script>
  import mynav from '@/components/components/nav'
  import playbar from  '@/components/components/playbar'
  export default {
    name: 'app',
    data: () => ({
      animateName: 'right'
    }),
    components: {
      mynav,playbar
    },
    watch: {
      $route(to, from) {
        this.animateName = to.meta.index > from.meta.index ? 'right' : 'left';
        if (to.meta.index>from.meta.index){
          this.$store.state.goBack='arrow-left'
        } else {
          this.$store.state.goBack='wap-nav'
        }
      }
    }
  }
</script>

<style>
  .left-enter {
    transform: translateX(-100%);
    position: absolute;
    left:0;
    top:0;
  }

  .left-enter-active {
    transition: .2s all ease;
    position: absolute;
    left:0;
    top:0;
  }

  .left-leave-active {
    transition: .2s all ease;
    position: absolute;
    left:0;
    top:0;
  }

  .left-leave-to {
    transform: translateX(100%);
    position: absolute;
    left:0;
    top:0;
  }

  .right-enter {
    transform: translateX(100%);
    position: absolute;
    left:0;
    top:0;
  }

  .right-enter-active {
    transition: .2s all ease;
    position: absolute;
    left:0;
    top:0;
  }

  .right-leave-active {
    transition: .2s all ease;
    position: absolute;
    left:0;
    top:0;
  }

  .right-leave-to {
    transform: translateX(-100%);
    position: absolute;
    left:0;
    top:0;
  }
</style>
