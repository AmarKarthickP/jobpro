import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../src/data/auth'

import Desk from './views/Desk.vue'
import Refer from './views/Refer.vue'
import Test from './views/TestView.vue'
import HomePage from './pages/HomePage.vue'
import JobsPage from './pages/JobsPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ActivityPage from './pages/ActivityPage.vue'
import DashboardPage from './pages/DashboardPage.vue'
import NotificationsPage from './pages/NotificationsPage.vue'
import TaskAIPage from './pages/TaskAIPage.vue'
import Dashboard from './pages/Referpro/DashboardPage.vue'
import ReferCandidate from './pages/Referpro/ReferCandidatePage.vue'
import OpenVacancy from './pages/Referpro/OpenVacancyPage.vue'
import ClaimStatus from './pages/Referpro/ClaimStatusPage.vue'
import BankDetails from './pages/Referpro/BankDetailsPage.vue'
import Terms from './pages/Referpro/TermsPage.vue'

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

      {
        path: 'task_ai',
        name: 'task_ai',
        component: TaskAIPage,
      },

      {
        path: 'refer',
        name: 'refer',
        component: Refer,
        // meta: { requiresAuth: true }
        children: [
          {
            path: '',
            redirect: {name: 'refer-dashboard'}
          },
          {
            path: 'refer-dashboard',
            name: 'refer-dashboard',
            component: Dashboard
          },
          {
            path: 'refer-candidate',
            name: 'refer-candidate',
            component: ReferCandidate
          },
          {
            path: 'open-vacancy',
            name: 'open-vacancy',
            component: OpenVacancy
          },
          {
            path: 'claim-status',
            name: 'claim-status',
            component: ClaimStatus
          },
          {
            path: 'bank-details',
            name: 'bank-details',
            component: BankDetails
          },
          {
            path: 'terms',
            name: 'terms',
            component: Terms
          }
        ]
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
