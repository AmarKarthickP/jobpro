import { reactive } from 'vue'
import { createResource } from 'frappe-ui'
import { auth } from './auth'
import defaultProfile from '@/assets/defaults/empty-male-avatar.jpg';

export const user = reactive({
    fullName: '',
    email: '',
    image: ''
})

createResource({
    url: '/api/method/frappe.client.get',
    params: {
        doctype: 'User',
        name: auth.user
    },
    auto: true,
    onSuccess(data) {

        const image = data.message.user_image
            ? `${window.location.origin}${data.message.user_image}`
            : `${defaultProfile}`

        user.fullName = data.message.full_name
        user.email = data.message.email
        user.image = image
    }
})