<template>
    <router-link :to='{ name: "Review", params: { reviewId: reviewId, bookId: bookId } }'>
        <div id="ReviewBrief" v-bind:class="[color]">
            <h2 class="Autor"><slot name="Autor"></slot></h2>
            <p class="Info"><slot name="Info"></slot></p>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "ReviewBrief",
    props: ['reviewId', 'bookId', 'color']
}
</script>

<style>
#ReviewBrief {
    width: 100%;
    margin: 0;
    padding: 10px;
    border-radius: 2em;
    position: relative;
}

.default {
    background-color: antiquewhite;
}

.others {
    color: white;
    background-color: rgb(127, 181, 243);
}
</style>