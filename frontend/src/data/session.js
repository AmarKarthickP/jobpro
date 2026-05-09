import { computed, reactive } from 'vue'
import { createResource } from 'frappe-ui'
import router from '@/router'

export function sessionUser() {
  let cookies = new URLSearchParams(document.cookie.split('; ').join('&'))
  let _sessionUser = cookies.get('user_id')
  if (_sessionUser === 'Guest') {
    _sessionUser = null
  }
  return _sessionUser
}

export let session = reactive({
  logout: createResource({
    url: 'logout',
    onSuccess() {
      users.reset()
      session.user = sessionUser()
      router.replace({ name: 'Login' })
    },
  }),
  user: sessionUser(),
  isLoggedIn: computed(() => !!session.user),
})
