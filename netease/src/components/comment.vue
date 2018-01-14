<template>
  <div id="comment">
    <h2>评论页</h2>
    <h2>评论页</h2>
    <h2>评论页</h2>
    <h2>评论页</h2>
  </div>
</template>
<script>
  export default {
    name:'comment',
    data: () => ({

    }),
    mounted(){
      console.log(this.$route.query.id)
      let _this=this;
      this.axios.all([
        this.axios.get(this.HOST + `/comment/music/?id=${this.$route.query.id}&offset=20`)
      ]).then(this.axios.spread((commentData) => {
        console.log(commentData.data)
      }))
    }
  }
</script>
<style scpoed>

</style>
