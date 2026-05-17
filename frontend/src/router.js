import { createRouter, createWebHistory } from 'vue-router'

import Desk from './views/Desk.vue'
import Test from './views/TestView.vue'
import HomePage from './pages/HomePage.vue'
import JobsPage from './pages/JobsPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ActivityPage from './pages/ActivityPage.vue'

const routes = [
  {
    path: '/test',
    name: 'test',
    component: Test,
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
      {
        path: 'profile',
        name: 'profile',
        component: ProfilePage
      },
      {
        path: 'activity',
        name: 'activity',
        component: ActivityPage
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/jobpro'),
  routes,
})

export default router
