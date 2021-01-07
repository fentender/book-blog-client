<template>
    <div id="Login">
        <div class="center-container">
            <h2 class="login-signup-title">用户登录</h2>
            <form action="">
                <label for="username">用户名：</label>
                <input type="text" id="username" autocomplete="off" name="username" v-model="username"><br/>
                <label for="pwd">密码：</label>
                <input type="password" id="pwd" autocomplete="off" name="password" v-model="password"><br/>
            </form>
            <router-link :to="{ name: 'Signup' }">
            <a class="button login-signup">注册</a>
            </router-link>
            <a class="button login-submit" v-on:click="submit()">登录</a>
        </div>
    </div>
</template>

<script>
import BookBlogApi from 'book_blog_api';
var api = new BookBlogApi.TokenApi();

export default {
    name: "Login",
    data: function() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        submit: function() {
            if(this.username == "") {
                alert("账号为空，请重新输入");
                return false;
            } else if (this.password == "") {
                alert("密码为空请重新输入");
                return false;
            }
            var userInfo = {
                Username: this.username,
                Password: this.password
            };
            
            api.signIn(userInfo.Username, userInfo.Password, (err, data, response) => {
                if(err == null && response.status == 200) {
                    alert("登录成功！");
                    let token;
                    if(response.body) {
                        token = data;
                    } else {
                        token = JSON.parse(response.text);
                    }
                    this.$store.commit("setToken", { token: token.token });
                    this.$store.commit("setUser", { username: this.username });
                    this.$router.push({ name:"User", params: { username: this.username }});
                } else {
                    alert("账号登录失败，请重新输入");
                }
            })
        }
    }
}
</script>

<style>
#Login {
    margin-top: 60px;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
}

.center-container {
    position: relative;
    top: 35%;
    transform: translateY(-50%);
    width: 500px;
    margin: 0 auto;
    text-align: center;
    background-color: antiquewhite;
    padding: 50px;
    padding-bottom: 80px;
}

.center-container .login-signup-title {
    font-weight: bold;
}

.center-container form {
    margin: 10px auto;
    position: relative;
}

.center-container form label {
    display: inline-block;
    position: absolute;
    right: 300px;
    margin-top: 5px;
    font-size: 1.1em;
}

.center-container form input {
    position: relative;
    left: 40px;
    display: inline-block;
    margin: 5px auto;
    border-radius: 15px;
    padding-left: 5px;
}

.center-container form input:focus {
    outline: none;
    background-color: aliceblue;
    border-color: antiquewhite;
}

.login-signup {
    position: relative;
    right:80px;
    top: 30px;
}

.login-submit {
    position: relative;
    left: 80px;
    top: 30px;
    cursor: pointer;
}
</style>