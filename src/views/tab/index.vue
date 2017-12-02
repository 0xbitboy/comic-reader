<template>
  <div>
     <x-header :left-options="{showBack:false}" style="background-color:#d66a39;">首页</x-header>
    <div class="x-content">
      <div style="margin: 10px;overflow: hidden;" v-for="book in books" :key="book.index">
        <masker style="border-radius: 2px;" :opacity="0.2" >
          <div class="m-img" :style="{backgroundImage: 'url(' + book.img + ')'}"></div>
          <div slot="content" class="m-title" @click="showDetail(book.book_id)">
            {{book.book_name}}
            <br/>
            <span class="m-time">{{book.update_time|formatDate}}</span>
          </div>
        </masker>
      </div>  
    </div>
  </div>
 
</template>

<script>

import { Masker ,XHeader,dateFormat} from 'vux'
export default {
  name: 'tab-index',
  components: {
    Masker,
    XHeader
  },
  methods:{
    listBooks(){
        this.$http.get("/api/books").then((res) => {
            this.books=res.data;
        })
    },
    showDetail(book_id){
       this.$router.push(`/book/${book_id}`);
    }
  },
  filters:{
    formatDate(time){
      return dateFormat(new Date(time),'YYYY-MM-DD HH:mm:ss')
    }
  },
  data () {
    return {
        books: []
      }
  },
  mounted(){
    this.listBooks();
  }


  }

</script>

<style lang="less">
.main-bg {
  width: 100%;
  vertical-align: bottom;
}

.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
</style>
