import Mock from 'mockjs';

var Random = Mock.Random;

var exports = function() {
    this.book = {
        'bookId|+1' : 0,
        'bookName' : /[A-Z][a-z]{4,8}/,
        'autor' : /[a-z]{4,6} [a-z]{4,6}/,
        'info' : Random.paragraph(8, 15)
    }
    this.books = {
        'num|25-50' : 1,
        'books|10' : [this.book]
    };

    this.review = {
        'ID|+1' : 0,
        'Content' : Random.paragraph(8, 15),
        'autor' : /[a-z]{4,6} [a-z]{4,6}/
    };
    this.reviews = {
        'num|25-50' : 1,
        'reviews|10' : [this.review]
    };

    this.user = {
        'Username' : Random.word(),
        'Password' : Random.word(8, 10)
    };

    this.bookshelf = {
        'num|25-50' : 1,
        'bookshelf|8' : [{
            'bookName' : /[a-z]{4,6} [a-z]{4,6}/,
            'bookId|+1' : 0
        }]
    }
    this.bookshelfs = {
        'num|25-50' : 1,
        'bookshelfs|8' : [{'bookshelfName' : /[a-z]{4,6} [a-z]{4,6}/}]
    }
    this.token = {
        'Token' : Random.word(8)
    }
}

export default new exports();