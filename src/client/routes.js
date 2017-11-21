import Homepage from 'client/containers/Homepage';
import NotFound from 'client/containers/NotFound';
import Login from 'client/containers/Login';
import Register from 'client/containers/Register';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    exact: true,
    component: Homepage,
  },
  {
    path: '/login',
    name: 'Login',
    exact: true,
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    exact: true,
    component: Register,
  },
  {
    component: NotFound,
  },
];

export default routes;
