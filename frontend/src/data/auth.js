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

const devUser = import.meta.env.DEV
  ? 'amar.p@groupteampro.com'
  : null

const devFullName = import.meta.env.DEV
  ? 'Amar Karthick P'
  : null 

const user = getCookie('user_id') || devUser
const fullName = getCookie('full_name') || devFullName

export const auth = reactive({
  user: user && user !== 'Guest' ? user : null,

  fullName:
    fullName && fullName !== 'Guest'
      ? fullName
      : null,

  isLoggedIn:
    !!user && user !== 'Guest',
})