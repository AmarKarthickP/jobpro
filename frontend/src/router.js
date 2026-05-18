import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../src/data/auth'

import Desk from './views/Desk.vue'
import Test from './views/TestView.vue'
import HomePage from './pages/HomePage.vue'
import JobsPage from './pages/JobsPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ActivityPage from './pages/ActivityPage.vue'
import DashboardPage from './pages/DashboardPage.vue'
import NotificationsPage from './pages/NotificationsPage.vue'

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
        component: ProfilePage,
        meta: { requiresAuth: true }
      },
      {
        path: 'activity',
        name: 'activity',
        component: ActivityPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardPage
      },

      {
        path: 'notifications',
        name: 'notifications',
        component: NotificationsPage,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/jobpro'),
  routes,
})

router.beforeEach((to, from, next) => {
  // If not logged in, for a specific pages, system will route to the login page
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    const redirectUrl = encodeURIComponent(`/jobpro${to.fullPath}`) // saves the base path
    window.location.href = `/login?redirect-to=${redirectUrl}`
  } else {
    next()
  }
})

export default router
