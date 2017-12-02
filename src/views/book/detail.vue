<template>
  <div class="comic-reader">
    <x-header>{{book_info.book_name}}</x-header>
    <div class="x-content">
     <div class="head_img">
          <swiper :list="head_imgs"></swiper>
     </div>
     <div class="chapter_list">
        <group>
          <group-title slot="title">全部章节({{chapters.length}})</group-title>
          <cell :title="chapter.chapter_name" :link="'/book/'+book_info.book_id+'/chapter/'+chapter.chapter_id" is-link v-for="chapter in chapters" :key="chapter.chapter_id">
             <div class="badge-value" v-if="chapter.is_new">
                <badge text="new"></badge>
              </div>
          </cell>
        </group>
     </div>
    </div>
  </div>
</template>
<script>
import { XHeader ,Swiper,Cell,Group,GroupTitle,Badge} from 'vux'


export default {
  name: 'book-detail',
  components: {
    XHeader,
    Swiper,
    Cell,
    Group,
    GroupTitle,
    Badge
  },
  methods:{
      onImgIndexChange:function( index ){
        this.book_head_img_index = index
      },
      getBookInfo(){
        this.$http.get(`/api/book/${this.$route.params.id}`).then((res) => {
            this.book_info=res.data;
            const _this = this;
            this.book_info.head_imgs.forEach(function(url) {
              _this.head_imgs.push({
                "url":"javascript:",
                "img":url,
                "title":res.data.book_name
              })
            }, this);
        })
      },
      getChapters(){
        this.$http.get(`/api/book/${this.$route.params.id}/chapters`).then((res) => {
            this.chapters=res.data.chapters;
        })
      }
  },
  data() {
      return {
          book_info:{},
          head_imgs:[],
          book_head_img_index:0,
          chapters:[]
      }
  },
  mounted(){
    this.getBookInfo();
    this.getChapters();
  }
}
</script>
