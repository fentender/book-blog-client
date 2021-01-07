<template>
    <div id="Signup">
        <div class="center-container">
            <h2 class="login-signup-title">用户登录</h2>
            <form action="">
                <label for="username">用户名：</label>
                <input type="text" id="username" v-model="username">
                <span class="username-tips" v-if="!isValidUsername()">用户名必须由字母与数字组成</span>
                <br/>
                <label for="pwd">密码：</label>
                <input type="password" id="pwd" autocomplete="off"  v-model="password"><br/>
                <label for="pwd-again">确认密码：</label>
                <input type="password" id="pwd-again" autocomplete="off" v-model="passwordAgain">
                <span class="passwordAgain-tips" v-if="!isValidPasswordAgain()">两次密码输入不一致</span>
                <br/>
            </form>
            <a class="button signup" v-on:click="submit()">注册</a>
        </div>
    </div>
</template>

<script>
import BookBlogApi from 'book_blog_api';
var api = new BookBlogApi.TokenApi();

export default {
    name: "signup",
    data: function() {
        return {
            username: "",
            password: "",
            passwordAgain: ""
        }
    },
    methods: {
        isValidUsername: function() {
            if(this.username == "") {
                return true;
            }
            var Reg = /^[a-zA-Z0-9]+$/;
            return Reg.test(this.username);
        },
        isValidPasswordAgain: function() {
            if(this.passwordAgain == "") {
                return true;
            } else if (this.password == this.passwordAgain) {
                return true;
            } else {
                return false;
            }
        },
        submit: function() {
            if(this.username == "" || !this.isValidUsername()) {
                alert("账号名称非法，请重新输入");
                return false;
            } else if (this.password == "" || !this.isValidPasswordAgain()) {
                alert("两次密码输入不一致");
                return false;
            }
            var userInfo = {
                Username: this.username,
                Password: this.password
            };
            api.signUp(userInfo, (err, data, response) => {
                if(err == null && response.status == 201) {
                    alert("账号创建成功！");
                    let token;
                    if(response.body) {
                        token = data;
                    } else {
                        token = JSON.parse(response.text);
                    }
                    console.log(response, token)
                    this.$store.commit("setToken", { token: token.token });
                    this.$store.commit("setUser", { username: this.username });
                    this.$router.push({ name:"User", params: { username: this.username }});
                } else {
                    alert("账号创建失败，请尝试更换账号名。");
                }
            })
        }
    }
}
</script>

<style>
#Signup {
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

.center-container .signup {
    position: relative;
    top: 20px;
    width: 200px;
    cursor: pointer;
}

.username-tips {
    position: absolute;
    top: 8px;
    right: -35px;
    font-size: 0.2em;
    color: red;
}

.passwordAgain-tips {
    position: absolute;
    top: 73px;
    right: 0px;
    font-size: 0.2em;
    color: red;
}
</style>