import { reactive } from 'vue'

function getCookie(name) {
  const cookies = document.cookie.split('; ')

  for (const cookie of cookies) {
    const [key, value] = cookie.split('=')

    if (key === name) {
      return decodeURIComponent(value)
    }
  }

  return null
}

// Development mock cookies
if (import.meta.env.DEV) {
  document.cookie =
    'user_id=amar.p%40groupteampro.com; path=/'

  document.cookie =
    'full_name=Amar%20Karthick%20P; path=/'
}

const user = getCookie('user_id')
const fullName = getCookie('full_name')

export const auth = reactive({
  user: user && user !== 'Guest' ? user : null,

  fullName:
    fullName && fullName !== 'Guest'
      ? fullName
      : null,

  isLoggedIn:
    !!user && user !== 'Guest',
})