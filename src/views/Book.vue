<template>
    <div id='book'>
        <div class="mainContainer">
            <div class="bookContent">
                <h1 id="book-title" class="title-box">
                    {{ book.bookName }}
                </h1>
                <p id="book-autor" class="autor-box">
                    {{ book.autor }}
                </p>
                <p id='book-info'>
                    {{ "\f" + book.info }}
                </p>
            </div>
            <div class="footNav">
                <router-link :to="{ name: 'Reviews', params: { bookId: this.$route.params.bookId }}">
                    <a class="button">查看评论</a>
                </router-link>
                <a class="button delBookshelf" v-on:click="delBookshelf()" v-if="bookshelfs">从书架中取消</a>
                <a class="button addBookshelf" v-on:click="addBookshelf()" v-if="bookshelfs">添加至书架</a>
                <form class="bookshelf-choices" v-if="bookshelfs" >
                    <select name="bookshelf" v-model="choice">
                        <option disabled value="">请选择</option>
                        <option :value="bookshelf.bookshelfName" v-for="(bookshelf, index) in bookshelfs" :key="index" >{{ bookshelf.bookshelfName }}</option>
                    </select>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import BookBlogApi from 'book_blog_api';

var api = new BookBlogApi.BookApi();
var apiBookshelf = new BookBlogApi.UserBookshelfApi();

export default {
    name: 'Book',
    data: function() {
        return {
            book: {},
            bookshelfs: null,
            choice: ''
        }
    },
    methods: {
        setData(err, book) {
            if(err) {
                this.error = err.toString();
            } else {
                this.book = book;
            }
        },
        setBookshelfs(err, bookshelfs) {
            if(err) {
                this.error = err.toString();
            } else {
                this.bookshelfs = bookshelfs;
            }
        },
        addBookshelf() {
            if(this.choice == '') {
                alert('请选择书架')
                return;
            }
            apiBookshelf.addBookInBookshelf(this.$store.state.username, this.choice, this.$route.params.bookId, (err, data, response) => {
                if(response.statusCode == 201) {
                    alert("添加成功");
                } else {
                    alert("添加失败");
                }
            })
        },
        delBookshelf() {
            if(this.choice == '') {
                alert('请选择书架')
                return;
            }
            apiBookshelf.deleteBookInBookshelf(this.$store.state.username, this.choice, this.$route.params.bookId, (err, data, response) => {
                if(response.statusCode == 204) {
                    alert("取消成功");
                } else {
                    alert("取消失败");
                }
            })
        }
    },
    beforeRouteEnter(to, from, next) {
        let username = sessionStorage.getItem("username");
        api.getBook( to.params.bookId, function(err, data, response) {
            let book;
            if( response.body == null ) {
                book = JSON.parse(response.text);
            } else {
                book = data;
            }
            if( !username ) {
                next( vm => vm.setData(err, book) );
            } else {
                let error = err;
                apiBookshelf.getBookshelfs( username, {pageNumber: -1}, (err, data, response) => {
                    let bookshelfs;
                    if(response.body) {
                        bookshelfs = data.bookshelfs;
                    } else {
                        bookshelfs = JSON.parse(response.text).bookshelfs;
                    }
                    console.log(bookshelfs, response)
                    next( vm => {
                        vm.setData(error, book);
                        vm.setBookshelfs(err, bookshelfs);
                    } );
                })
            }
        });
    }
}
</script>

<style>

.bookContent {
    display: inline-block;
    width: 80%;
    margin: 0 auto;
    padding: 20px 10%;
    border-radius: 2em;
    background-color: antiquewhite;
}

.mainContainer .fooNav {
    margin: 0 auto;
    display: block;
}

.footNav .button {
    position: relative;
    float: right;
    margin-left: 10px;
}

#book-title {
    background-color: rgb(51, 54, 51);
    color: rgb(236, 233, 49);
    border-radius: 2em;
    margin: 5px;
    padding: 10px;
    text-align:center;
}

#book-autor {
    background-color: rgb(236, 165, 71);
    border: 1px solid rgb(240, 162, 59);
    color: rgb(8, 8, 8);
    border-radius: 2em;
    padding: 5px;
    margin: 0;
    display: inline-block;
    text-align:center;
    position: relative;
    font-style: italic;
    top: 3px;
}

.footNav .addBookshelf {
    background-color: rgb(40, 216, 24);
    border-color:rgb(200, 230, 32);
    cursor: pointer;
    vertical-align: bottom;
}

.footNav .delBookshelf {
    background-color: brown;
    border-color: brown;
    cursor: pointer;
    vertical-align: bottom;
}


.bookshelf-choices {
    position: relative;
    top: 23.4px;
    transform: translateY(-50%);
    float: right;
}

.bookshelf-choices select {
    padding: 0.75em 2em;
    border-radius: 2em;
    border: 1px solid rgb(185, 177, 166);
    background-color: aliceblue;
}
</style>