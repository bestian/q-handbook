
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: '聊天機器人', component: () => import('pages/Index.vue') },
      { path: 'faq', name: '自學問答集', component: () => import('pages/FAQ.vue') },
      { path: 'ans/:id', name: '問答', component: () => import('pages/Ans.vue') }
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
