<template>
    <div id="Bookshelf">
        <div class="full-container">
            <div class="box" v-for="(book, index) in bookshelf" :key="index">
                <BookshelfBookBrief :bookId="book.bookId" :bookName="book.bookName" />
            </div>
        </div>
        <PageFooter :pageNumber="num" :pageSize="8" :currentPage="currentPage" />
    </div>
</template>

<script>
import BookshelfBookBrief from '../components/BookshelfBookBrief'
import PageFooter from '../components/PageFooter';
import BookBlogApi from 'book_blog_api';

var api = new BookBlogApi.UserBookshelfApi();

export default {
    name: "Bookshelf", 
    data: function() {
        return {
            bookshelf: [{bookName: "nonsense", bookId: -1}],
            currentPage: 1,
            num: 0
        }
    },
    components: {
        PageFooter,
        BookshelfBookBrief
    },
    methods: {
        setData(err, data) {
            if(err) {
                this.error = err.toString();
            } else {
                this.bookshelf = data.bookshelf;
                this.num = data.num;
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        var currentPage = to.query.currentPage ? to.query.currentPage : 1
        api.getBookshelf(to.params.username, to.params.bookshelfName, {pageNumber : currentPage}, (err, data, response) => {
            let bookshelf;
            if(response.body) {
                bookshelf = data;
            } else {
                bookshelf = JSON.parse(response.text);
            }
            next( vm => vm.setData(err, bookshelf));
        })
    },
    beforeRouteUpdate(to, from, next) {
        api.getBookshelf( to.params.username, to.params.bookshelfName, {pageNumber: to.query.currentPage}, (err, data, response) => {
            let obj
            if(response.body == null) {
                obj = JSON.parse(response.text);
            } else {
                obj = data;
            }
            this.bookshelf = obj.bookshelf;
            this.currentPage = to.query.currentPage;
            next();
        })
    }
}
</script>

<style>
#Bookshelf {
    margin-top: 60px;
}
</style>