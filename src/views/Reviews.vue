<template>
    <div id="Reviews">
        <div class="mainContainer">
            <div class="Brief" v-for="(review, index) in reviews" :key="review.ID">
                <ReviewBrief :reviewId="review.ID" :bookId="$route.params.bookId"  :color="index%2 == 0?color[0]:color[1]">
                    <template v-slot:Autor>{{ review.autor }}</template>
                    <template v-slot:Info>{{ slice(review.content) }}</template>
                </ReviewBrief>
            </div>
            <PageFooter :pageNumber="num" :pageSize="10" :currentPage="currentPage" />
        </div>
    </div>
</template>

<script>
import ReviewBrief from '../components/ReviewBrief';
import PageFooter from '../components/PageFooter';
import BookBlogApi from 'book_blog_api';

var api = new BookBlogApi.ReviewApi();

const color = ["default", "others"];

export default {
    name: "Reviews",
    data: function() {
        return {
            reviews: [{ID: 0}],
            num: 0,
            currentPage: 1,
            color: color
        }
    },
    components: {
        ReviewBrief,
        PageFooter
    },
    methods: {
        setData(err, data) {
            if(err) {
                this.error = err.toString();
            } else {
                if(data.reviews == null) {
                    alert("当前书籍无评论（目前只搬运了《弃猫》与《春福》评论）")
                    this.$router.push({name: "Home"})
                }
                this.reviews = data.reviews;
                this.num = data.num;
            }
        },
        slice(str) {
            if(str == null) {
                return "";
            }
            return "\f" + str.slice(0, 178) + '...';
        }
    },
    beforeRouteEnter(to, from, next) {
        var currentPage = to.query.currentPage ? to.query.currentPage : 1
        api.getReviews(to.params.bookId, {num: currentPage}, (err, data, response) => {
            let reviews;
            if( response.body == null ) {
                reviews = JSON.parse(response.text);
            } else {
                reviews = data;
            }
            next( vm => vm.setData(err, reviews) );
        })
    },
    beforeRouteUpdate(to, from, next) {
        api.getReviews(to.params.bookId, {num: to.query.currentPage}, (err, data, response) => {
            let obj
            if(response.body == null) {
                obj = JSON.parse(response.text);
            } else {
                obj = data;
            }
            this.reviews = obj.reviews;
            this.currentPage = to.query.currentPage;
            next();
        })
    }
}
</script>

<style>

#Reviews .Brief {
    width: 100%;
    margin: 10px 0;
}

</style>