<template>
    <div id="BookshelfBookBrief">
        <router-link :to="{ name: 'Book', params: { bookId: bookId }}"> 
            <img src="../assets/imgs/book.png" alt="Book logo" class="bookshelfBook-img">
            <h3 class="bookshelfBook-name">{{ bookName }}</h3>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "BookshelfBookBrief",
    props: ["bookId", "bookName"]
}
</script>

<style>
#BookshelfBookBrief {
    text-align: center;
    position: relative;
}

#BookshelfBookBrief .bookshelfBook-name {
    font-weight: bold;
    width: 100%;
}
</style>