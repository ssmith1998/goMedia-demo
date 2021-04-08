const routes = [{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
        path: '',
        name: 'dashboard',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/Index.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/loginPage.vue')
      },
      {
        path: '/editBook',
        name: 'editBook',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/EditBook.vue')
      },
      {
        path: '/addBook',
        name: 'addBook',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/AddBook.vue')
      },
      {
        path: '/viewBook',
        name: 'viewBook',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/ViewBook.vue')
      },
      {
        path: '/logs',
        name: 'logs',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/Logs.vue')
      },
      {
        path: '/borrowing/marketplace',
        name: 'marketplace',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/marketplace/Home.vue')
      },
      {
        path: '/marketplace/requests',
        name: 'requests',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/Requests.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
