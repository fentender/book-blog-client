<template>
    <div id="nav">
      <router-link to="/" id="logo-mini">
      <img src="../assets/imgs/logo-mini.png" alt="BookBlog logo">
      <span>BookBlog</span>
      </router-link>
      <ul>
          <li>
              <router-link to="/books">书籍</router-link>
          </li>
          <li>
              <router-link :to="{ name: 'Bookshelfs', params: { username: this.$store.state.username } }">书架</router-link>
          </li>
          <li v-if="$store.state.token == ''">
              <router-link to="/login">登录</router-link>
          </li>
          <li v-if="$store.state.token != ''" v-on:click="signOut()">
              <router-link to="/signout">注销</router-link>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    methods: {
        signOut() {
            this.$store.commit("delToken");
            this.$store.commit("delUser");
            alert('注销成功');
        }
    }
}
</script>

<style>
#logo-mini {
    display: inline-block;
    font-size: 1.5em;
    line-height: 40px;
    color: #273849;
    font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    font-weight: 500;
}

#nav {
    background-color: #fff;
    height: 40px;
    padding: 10px 60px;
    position: relative;
    z-index: 20;
    box-shadow: 0 0 1px rgba(0,0,0,0.25);
    transition: background-color 0.3s ease-in-out;
    position: fixed;
    width: 100%;
    top: 0;
}

#nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: fixed;
    right: 30px;
    top: 10px;
    height: 40px;
    line-height: 40px;
}

#nav ul li {
    display: list-item;
    text-align: -webkit-match-parent;
    display: inline-block;
    position: relative;
    margin: 0 0.6em;
}

#nav img {
    vertical-align: middle;
    margin-right: 6px;
    width: 40px;
    height: 40px;
    border: none;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration-line: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>