<template>
    <div id="Review">
        <div class="mainContainer">
            <div class="reviewContent">
                <p class="review-autor box">{{ review.autor }}</p>
                <p class="review-content">{{ "\f" + review.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import BookBlogApi from 'book_blog_api';
var api = new BookBlogApi.ReviewApi();

export default {
    name: "Review",
    data: function() {
        return {
            review: {}
        }
    },
    methods: {
        setData(err, data) {
            if(err) {
                this.error = err.toString();
            } else {
                this.review = data
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        api.getReview(to.params.bookId, to.params.reviewId, (err, data, response) => {
            let review;
            if(response.body) {
                review = data;
            } else {
                review = JSON.parse(response.text);
            }
            next( vm => vm.setData(err, review));
        })
    }
}
</script>

<style>

#Review .reviewContent {
    display: inline-block;
    width: 80%;
    margin: 0 auto;
    padding: 20px 10%;
    border-radius: 2em;
    background-color: antiquewhite;
    position: relative;
}

#Review .review-autor {
    font-weight: bold;
    font-size: 2em;
    float: right;
}

#Review .box {
    background-color: rgb(16, 17, 16);
    color: gold;
    border-radius: 2em;
    margin: 5px;
    padding: 10px;
    box-sizing: border-box;
}
</style>