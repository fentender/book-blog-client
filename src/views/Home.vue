<template>
  <div class="home">
    <div class="hello">
      <div class="left">
        <img alt="Blog logo" src="../assets/imgs/logo.png">
      </div>
      <div class="right">
        <div class="inline">
          <h1>欢迎来到BookBlog</h1>
          <router-link to="/books" class="button">进入博客</router-link>
          <router-link to="/login" class="button white">登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>

<style>


.home {
  margin-top: 60px;
  padding: 40px 40px 30px;
  background-color: #fff;
}

.hello {
  max-width: 1260px;
  margin: 0 auto;
}

.left,.right {
  display: inline-block;
  vertical-align: top;
}

.left {
  width: 512px;
}

.right {
  height: 516px;
}

.right .inline {
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
}

.inline h1 {
  font-weight: 300;
  margin: 0;
  font-size: 3.2em;
}

.inline .button {
  width: 150px;
  margin: 1em 0;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.1em;
  min-width: 8em;
  text-align: center;
}

a.button.white {
  margin-left: 50px;
  color: rgb(108, 109, 175);
  background-color: #ffffff;
  border: 1px solid #c2bdbd;
}
</style>