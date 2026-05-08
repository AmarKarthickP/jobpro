import { createRouter, createWebHistory } from 'vue-router'

import Desk from '@/views/Desk.vue'
import TestView from '@/views/TestView.vue'
import HomePage from '@/pages/HomePage.vue'
import JobsPage from '@/pages/JobsPage.vue'

const routes = [
  {
    path: '/test',
    name: 'test',
    component: TestView,
  },
  {
    path: '/',
    component: Desk,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        component: HomePage
      },
      {
        path: 'jobs',
        name: 'jobs',
        component: JobsPage
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/j'),
  routes,
})

export default router
