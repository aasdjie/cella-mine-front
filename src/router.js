import Vue from 'vue'
import Router from 'vue-router'

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: require(`./pages/${file}.vue`)
  }
}

Vue.use(Router)

const router = new Router({
  base: __dirname,
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    route('/login', 'Login', 'login'),
    route('/error', 'Error', 'error'),
    route('/', 'Main', null, [
      route('/', 'Home', 'home'),
      route('/admin/clients', 'clients/Clients', 'clients'),
      route('/admin/clients/:id/detail', 'clients/Detail', 'clientDetail'),
      route('/admin/sales', 'Sales', 'sales'),
      route('/admin/users', 'users/List', 'users'),
      route('/admin/users/:id/update', 'users/Edit', 'userUpdate'),
      route('/history/request', 'history/Request', 'requests')
    ])

    // Global redirect for 404
    // { path: '*', redirect: '/error', query: {code: 404, message: 'Page Not Found.'} }
  ]
})

router.beforeEach((to, from, next) => {
  global.store.dispatch('checkPageTitle', to.path)
    /* eslint-disable no-undef */
  if (typeof ga !== 'undefined') {
    ga('set', 'page', to.path)
    ga('send', 'pageview')
  }
  next()
})

export default router
