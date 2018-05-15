export default [{
  path: '/',
  name: 'Login',
  component: () => import('./index')
}, {
  path: '/login',
  name: 'login',
  component: () => import('./index')
}]
