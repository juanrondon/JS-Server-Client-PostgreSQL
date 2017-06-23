import Home from '../public/home/index';
import Register from '../public/user/register';
import Login from '../public/user/login';
import Logout from '../public/user/logout';

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  }, {
    path: '/register',
    exact: true,
    component: Register
  }, {
    path: '/login',
    exact: true,
    component: Login
  }, {
    path: '/logout',
    exact: true,
    component: Logout
  }
];
