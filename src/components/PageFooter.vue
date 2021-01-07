<template>
    <div id="PageFooter">
      <router-link v-if="currentPage != 1" :to="{ name: $route.name, params: $route.params, query: { currentPage: currentPage - 1} }">
      <span class="previous square-box">上一页</span>
      </router-link>
      <router-link :to="{ name: $route.name, params: $route.params, query: { currentPage: index } }" v-for="index in getNum()" :key="index">
      <span class="page square-box" v-bind:class="{ active: index == currentPage }">
        {{ index }}
      </span>
      </router-link>
      <router-link v-if="currentPage != getNum()" :to="{ name: $route.name, params: $route.params, query: { currentPage: currentPage + 1}}">
      <span class="next square-box" >下一页</span>
      </router-link>
    </div>
</template>

<script>
export default {
    name: 'PageFooter',
    props: ['pageNumber', 'pageSize', 'currentPage'],
    methods: {
      getNum: function() {
        return Math.ceil(this.pageNumber / this.pageSize);
      }
    }
}
</script>

<style>
#PageFooter {
  width: inherit;
  margin: 0 auto;
  text-align: center;
}

.square-box {
  display: inline-block;
  border: 1px solid rgb(109, 190, 34);
  color: rgb(109, 190, 34);
  padding: 3px;
  margin-right: 10px;
  text-align: center;
}

#PageFooter .page {
  width: 20px;
}

#PageFooter .active {
  background-color:  rgb(109, 190, 34);
  color: white;
}
</style>