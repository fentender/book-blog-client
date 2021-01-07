import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Books from '../views/Books.vue'
import Book from '../views/Book.vue'
import Reviews from '../views/Reviews.vue'
import Review from '../views/Review.vue'
import Bookshelfs from '../views/Bookshelfs.vue'
import Bookshelf from '../views/Bookshelf.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/books/:bookId',
    name: 'Book',
    component: Book
  },
  {
    path: '/reviews/:bookId',
    name: 'Reviews',
    component: Reviews
  },
  {
    path: '/reviews/:bookId/:reviewId',
    name: 'Review',
    component: Review
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signout',
    name: 'Signout',
    component: Home
  },
  {
    path: '/users/:username',
    name: 'User',
    component: User,
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:username/bookshelfs',
    name: 'Bookshelfs',
    component: Bookshelfs,
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:username/bookshelfs/:bookshelfName',
    name: 'Bookshelf',
    component: Bookshelf,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if ( !to.meta.requiresAuth ) {
    next();
  } else {
    let token = sessionStorage.getItem("token");
    if( token === '' || token === null) {
      alert("请先登录账号");
      next({ name: "Login"} )
    } else {
      next();
    }
  }
})

export default router
