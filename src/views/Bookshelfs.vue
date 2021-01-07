<template>
    <div id="Bookshelfs">
        <div class="full-container">
            <div class="box" v-for="(bookshelf, index) in bookshelfs" :key="index">
                <BookshelfBrief :username="$route.params.username" :bookshelfName="bookshelf.bookshelfName"/>
            </div>
        </div>
        <PageFooter :pageNumber="num" :pageSize="8" :currentPage="currentPage" />
        <div class="operation">
            <a class="button" v-on:click="addBookshelf()">添加书架</a>
        </div>
    </div>
</template>

<script>
import BookshelfBrief from '../components/BookshelfBrief'
import PageFooter from '../components/PageFooter';
import BookBlogApi from 'book_blog_api';

var api = new BookBlogApi.UserBookshelfApi();

export default {
    name: "Bookshelfs",
    data: function() {
        return {
            bookshelfs: [{bookshelfName: "nonsense"}],
            currentPage: 1,
            num: 0
        }
    },
    components: {
        BookshelfBrief,
        PageFooter
    },
    methods: {
        setData(err, data) {
            if(err) {
                this.error = err.toString();
            } else {
                this.bookshelfs = data.bookshelfs;
                this.num = data.num;
            }
        }, 
        addBookshelf() {
            var bookshelfName = prompt("请输入书架的名字");
            if(bookshelfName != null && bookshelfName != "") {
                api.createBookshelf( this.$route.params.username, {name: bookshelfName}, (err, data, response) => {
                    if(response.statusCode == 201 ) {
                        alert("书架创建成功")
                        location.reload()
                    } else {
                        alert("书架创建失败,状态码:" + response.statusCode )
                    }
                })
            } else {
                alert("书架名不能为空")
            }
        }
    },
    beforeRouteEnter(to, from ,next) {
        var currentPage = to.query.currentPage ? to.query.currentPage : 1
        api.getBookshelfs( to.params.username, {pageNumber: currentPage}, (err, data, response) => {
            let bookshelfs;
            if(response.body) {
                bookshelfs = data;
            } else {
                bookshelfs = JSON.parse(response.text);
            }
            next( vm => vm.setData(err, bookshelfs) );
        })
    },
    beforeRouteUpdate(to, from, next) {
        api.getBookshelfs( to.params.username, {pageNumber: to.query.currentPage}, (err, data, response) => {
            let obj
            if(response.body == null) {
                obj = JSON.parse(response.text);
            } else {
                obj = data;
            }
            this.bookshelfs = obj.bookshelfs;
            this.currentPage = to.query.currentPage;
            next();
        })
    }
}
</script>

<style>
#Bookshelfs {
    margin-top: 60px;
    position: relative;
}

.full-container {
    width: 100%;
}

.full-container .box {
    display: inline-block;
    box-sizing: border-box;
    width: 25%;
    padding: 0 22px;
    margin: 10px 0;
}

.operation {
    position: absolute;
    right: 30px;
    bottom: -50px;
}

.operation .button {
    background-color: greenyellow;
    color: black;
    font-weight: bold;
    border: 1px, solid, green;
    cursor: pointer;
}
</style>