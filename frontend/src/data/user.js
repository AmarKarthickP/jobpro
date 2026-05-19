import { reactive } from 'vue'
import { createResource } from 'frappe-ui'
import { auth } from './auth'
import defaultProfile from '@/assets/defaults/empty-male-avatar.jpg';

export const user = reactive({
    fullName: '',
    email: '',
    image: '',
    mobile_no: '',
    bio: ''
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
            ? `${data.message.user_image}`
            : `${defaultProfile}`

        user.fullName = data.message.full_name
        user.email = data.message.email
        user.image = image
        user.mobileNo = data.message.mobile_no
        user.bio = data.message.bio
    }
})