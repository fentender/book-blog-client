let express = require('express');   //引入express
let Mock = require('mockjs');       //引入mock
let router = require('../router/Router.js');
let rulerMock = require('./ruler.js');

let app = express();        //实例化express

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

//Books
app.post(router.BooksUrl, function(req, res){
    res.status(201).end();
});
app.get(router.BooksUrl, function(req, res) {
    res.status(200).json(Mock.mock(rulerMock.books));
});

//Book
app.delete(router.BookUrl ,function(req, res){
    res.status(204).end();
});
app.get(router.BookUrl, function(req, res) {
    res.status(200).json(Mock.mock(rulerMock.book));
});
app.put(router.BookUrl, function(req, res) {
    res.status(200).end();
});

//Reviews
app.post(router.ReviewsUrl, function(req, res) {
    res.status(201).end();
});
app.get(router.ReviewsUrl, function(req, res) {
    res.status(200).json(Mock.mock(rulerMock.reviews));
});

//Review
app.delete(router.ReviewUrl, function(req, res) {
    res.status(204).end();
});
app.get(router.ReviewUrl, function(req, res) {
    res.status(200).json(Mock.mock(rulerMock.review));
});

//User
app.get(router.UserUrl, function(req, res) {
    res.status(200).json(Mock.mock(rulerMock.user));
})
app.post(router.UsersUrl, function(req, res) {
    res.status(201).end();
})
app.delete(router.UserUrl, function(req, res) {
    res.status(204).end();
})

//Bookshelfs
app.get(router.BookshelfsUrl, function(req, res) {
    res.status(200).json(Mock.mock(rulerMock.bookshelfs));
})
app.post(router.BookshelfsUrl, function(req, res) {
    res.status(201).end();
})

//Bookshelf
app.get(router.BookshelfUrl, function(req, res) {
    res.status(200).json(Mock.mock(rulerMock.bookshelf));
})
app.delete(router.BookshelfUrl, function(req, res) {
    res.status(204).end();
});

//BookshelfBook
app.post(router.BookshelfBookUrl, function(req, res) {
    res.status(201).end();
})
app.delete(router.BookshelfBookUrl, function(req, res) {
    res.status(204).end();
});

app.listen('80', () => {
    console.log('监听端口 80')
});