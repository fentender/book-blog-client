<template>
    <div id="User">
        <div class="center-container">
            <table border="1" class="user-info">
                <tr>
                    <td colspan="2">账户信息</td>
                </tr>
                <tr>
                    <td>用户名：</td>
                    <td>{{ userInfo.username }}</td>
                </tr>
                <tr>
                    <td>密码：</td>
                    <td>{{ userInfo.password }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import BookBlogApi from 'book_blog_api';

var api = new BookBlogApi.UserApi();

export default {
    name: "User", 
    data: function() {
        return {
            userInfo: { username: '', password: ''}
        }
    },
    methods: {
        setData(err, data) {
            if(err) {
                this.error = err.toString();
            } else {
                this.userInfo = data;
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        let username;
        username = to.params.username;
        api.getUser(username, (err, data, response) => {
            let userInfo;
            if(response.body) {
                userInfo = data;
            } else {
                userInfo = JSON.parse(response.text);
            }
            next( vm => vm.setData(err, userInfo));
        })
    }
}
</script>

<style>
#User {
    margin-top: 60px;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
}

#User .user-info {
    width: 400px;
    margin: 0 auto;
}

</style>