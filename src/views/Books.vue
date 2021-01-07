<template>
  <div id="Books">
    <BookBrief  v-for="book in books" :key="book.bookId" :bookId="book.bookId">
      <template v-slot:BookName>{{book.bookName}}</template>
      <template v-slot:BookAutor>{{book.autor}}</template>
      <template v-slot:BookInfo>{{ slice(book.info) }}</template>
    </BookBrief>
    <PageFooter :pageNumber="num" :pageSize="10" :currentPage="currentPage" />
  </div>
</template>

<script>
import BookBrief from '../components/BookBrief';
import PageFooter from '../components/PageFooter';
import BookBlogApi from 'book_blog_api';

var api = new BookBlogApi.BookApi();
var Books = null;

export default {
  name: 'Books',
  data: function() {
    return {
      books: Books.books,
      num: Books.num,
      currentPage: this.$route.query.currentPage ? this.$route.query.currentPage : 1
    }
  },
  components: {
    BookBrief,
    PageFooter
  },
  methods: {
    setData(err, data) {
      if(err) {
        this.error = err.toString();
      } else {
        this.books = data.books;
        this.num = data.num;
      }
    },
    slice(info) {
      return "\f" + info.slice(0, 130) + '...';
    }
  },
  beforeRouteEnter(to, from, next) {
    if(!Books) {
      var currentPage = to.query.currentPage ? to.query.currentPage : 1
      api.getBooks( {pageNumber:  currentPage }, (err, data, response) => {
        let obj
        if(response.body == null) {
          obj = JSON.parse(response.text);
        } else {
          obj = data;
        }
        Books = obj;
        next(vm => vm.setData(err, obj));
      })
    } else {
      next(vm => vm.setData(null, Books));
    }
  },
  beforeRouteUpdate(to, from, next) {
    api.getBooks( {pageNumber: to.query.currentPage}, (err, data, response) => {
      let obj
      if(response.body == null) {
        obj = JSON.parse(response.text);
      } else {
        obj = data;
      }
      Books = obj;
      this.books = obj.books;
      this.currentPage = to.query.currentPage;
      next();
    })
  },
  beforeRouteLeave (from, to, next) {
    Books = null
    next();
  }
}
</script>

<style>
#Books {
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;
  top: 60px;
  position: relative;
}
</style>
