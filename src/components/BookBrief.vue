<template>
    <router-link :to='routes'>
    <div id="book-column">
        <div class="book-left">
            <p id="BookName" class="block"><slot name="BookName"></slot></p>
            <p id="BookAutor" class="block"><slot name="BookAutor"></slot></p>
        </div>
        <p id="BookInfo" class="block"><slot name="BookInfo"></slot></p>
    </div>
    </router-link>
</template>

<script>
export default {
    name: 'BookBrief', 
    data: function() {
        let routes = {
            name: 'Book',
            params: {
                bookId: this.bookId
            }
        }
        return {
            routes: routes
        }
    },
    props: ['bookId']
}
</script>

<style>
#book-column {
    width: 100%;
    height: 110px;
    margin: 10px 0;
    padding: 0;
    position: relative;
    margin-bottom: 20px;
    border-bottom: 1px dashed #b6b6bd;
}

#book-column p {
    margin: 0;
}

.block {
    display: block;
    box-sizing: border-box;
    border: 1px solid #57a0e6;
    background-color: #57a0e6;
    color: rgb(58, 111, 134);
    border-radius: 3em;
    padding: 10px;
}

#BookName {
    position: relative;
    display: block;
    top: -5px;
    margin: 0;
    font-size: 1.3rem;
    font-weight: bold;
    color: rgb(245, 240, 240);
    text-align: center
}

#BookAutor {
    position: relative;
    display: block;
    float: left;
    top: 8px;
    font-size: 0.8rem;
    font-style: italic;
    color: rgb(242, 247, 241);
    background-color: #e68457;
    border: 1px solid #e68457;
}

#BookInfo {
    position: relative;
    display: block;
    top: -12px;
    left: 15px;
    max-width: 500px;
    float: left;
    font-size: 1rem;
    font-style: italic;
    color: rgb(95, 93, 93);
    background-color: #7db88f;
    border: 1px solid #7db88f;
    border-radius: 2em;
    max-height: 120px;
}

.book-left {
    float: left;
    width: 250px;
}
</style>