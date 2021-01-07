import Mock from 'mockjs';
import ruler from './ruler'
// 请求模拟数据

//Books
Mock.mock(/books$/, 'get', ruler.books);
Mock.mock(/books\/[0-9]+$/, 'get', ruler.book);
Mock.mock(/books\/[0-9]+$/, 'delete', null);

//Reviews
Mock.mock(/reviews\/[0-9]+$/, 'get', ruler.reviews);
Mock.mock(/reviews\/[0-9]+\/[0-9]+$/, 'get', ruler.review);

//Bookshelfs
Mock.mock(/users\/[a-zA-Z0-9%]+\/bookshelfs$/, 'get', ruler.bookshelfs);
Mock.mock(/users\/[a-zA-Z0-9%]+\/bookshelfs$/, 'post', null);
Mock.mock(/users\/[a-zA-Z0-9%]+\/bookshelfs\/[a-zA-Z0-9%]+$/, 'get', ruler.bookshelf);
Mock.mock(/users\/[a-zA-Z0-9%]+\/bookshelfs\/[a-zA-Z0-9%]+$/, 'delete', null);
Mock.mock(/users\/[a-zA-Z0-9%]+\/bookshelfs\/[a-zA-Z0-9%]+\/[0-9]+$/, 'post', null);
Mock.mock(/users\/[a-zA-Z0-9%]+\/bookshelfs\/[a-zA-Z0-9%]+\/[0-9]+$/, 'delete', null);

//Token
Mock.mock(/token$/, 'post', ruler.token);
Mock.mock(/token$/, 'get', ruler.token);

//User
Mock.mock(/users\/[a-zA-Z0-9%]+$/, 'get', ruler.user);