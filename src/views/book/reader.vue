<template>
  <div class="comic-reader">
    <x-header  @on-click-back="goBack">{{chapter_info.chapter_name}}</x-header>
    <div id="reader-container" class="x-content">
         <div v-for="src in chapter_info.pictures" :key="src.index" style="background-color:#fffff;text-align:center;">
            <span style="font-size:20px;">Loading</span>
            <x-img :src="`http://pf.yueri.net/${src}`" :webp-src="`http://pf.yueri.net/${src}`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#reader-container"></x-img>
         </div>
         <x-button plain type="primary" style="border-radius:99px;">下一章节</x-button>
    </div>
  </div>
</template>
<script>
import { XHeader ,XImg,XButton} from 'vux'


export default {
  name: 'book-reader',
  components: {
    XHeader,
    XImg,
    XButton
  },
  methods:{
    getChapterInfo(){
        this.$http.get(`/api/book/${this.$route.params.id}/chapter/${this.$route.params.chapter_id}`).then((res) => {
           this.chapter_info = res.data;
        })
      }, 
    success (src, ele) {
      console.log('success load', src)
      const span = ele.parentNode.querySelector('span')
      ele.parentNode.removeChild(span)
    },
    error (src, ele, msg) {
      console.log('error load', msg, src)
      const span = ele.parentNode.querySelector('span')
      span.innerText = 'load error'
    },
    goBack(){
       this.$router.replace(`/book/${this.$route.params.id}`);
    }
  },
  data() {
      return {
          chapter_info:{}
      }
  },
  mounted(){
    this.getChapterInfo();
  }
}
</script>

<style>
.ximg-demo {
  width: 100%;
  height: auto;
}
.ximg-error {
  background-color: yellow;
}
.ximg-error:after {
  content: '加载失败';
  color: red;
}
</style>