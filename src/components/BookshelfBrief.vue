<template>
    <div id="BookshelfBrief">
        <router-link :to="{ name: 'Bookshelf', params: { username: username, bookshelfName : bookshelfName }}"> 
            <img src="../assets/imgs/bookshelf.png" alt="Bookshelf logo" class="bookshelf-img">
            <h3 class="bookshelf-name">{{ bookshelfName }}</h3>
        </router-link>
        <span class="delete" v-on:click="confirm">X</span>
    </div>
</template>

<script>
import BookBlogApi from 'book_blog_api';

var api = new BookBlogApi.UserBookshelfApi();

export default {
    name: "BookshelfBrief",
    props: ["username", "bookshelfName"],
    methods: {
        confirm: function () {
            var doIt = confirm("确定删除这个书架吗？")
            if(doIt) {
                api.deleteBookshelf(this.username, this.bookshelfName, (err, data, response) => {
                    if(response.statusCode == 204) {
                        alert("删除成功!");
                        location.reload()
                    } else {
                        alert("删除失败!");
                    }
                })
            }
        }
    }
}
</script>

<style>
#BookshelfBrief {
    background-color: rgb(252, 245, 215);
    border: 1px solid rgb(22, 24, 23);
    border-radius: 2em;
    text-align: center;
    position: relative;
    text-align: center;
}

#BookshelfBrief .bookshelf-name {
    font-weight: bold;
    width: 100%;
    bottom: 10px;
    position: absolute;
}

.delete {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5em;
}

.delete:hover {
    color: red;
    cursor: pointer;
}
</style>