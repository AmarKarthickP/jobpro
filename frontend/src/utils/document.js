const API_KEY = import.meta.env.VITE_FRAPPE_API_KEY
const API_SECRET = import.meta.env.VITE_FRAPPE_API_SECRET

export const handleSave = async ({
    endpoint,
    payload = {},
    onStart = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
}) => {

    try {

        onStart?.()

        const response = await fetch(endpoint, {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${API_KEY}:${API_SECRET}`,
            },

            body: JSON.stringify(payload),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data?.message || 'Failed to save'
            )
        }

        onSuccess?.(data)

        return data

    } catch (error) {

        console.error(error)

        onError?.(error)

    } finally {

        onFinally?.()
    }
}

export const uploadFile = async ({
    endpoint,
    file,
    doctype = null,
    docname = null,
    fieldname = null,
    user = null,
    onStart = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
}) => {
    try {
        if (onStart) {
            onStart()
        }

        const formData = new FormData()

        formData.append('file', file)

        if (doctype) {
            formData.append('doctype', doctype)
        }

        if (docname) {
            formData.append('docname', docname)
        }

        if (fieldname) {
            formData.append('fieldname', fieldname)
        }

        if (user) {
            formData.append('user', user)
        }


        const response = await fetch(endpoint, {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {
                'Authorization': `token ${API_KEY}:${API_SECRET}`,
            },
            body: formData,
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Upload failed')
        }

        if (onSuccess) {
            onSuccess(data)
        }

        return data

    } catch (error) {
        console.error('File Upload Error:', error)

        if (onError) {
            onError(error)
        }

    } finally {
        if (onFinally) {
            onFinally()
        }
    }
}

export const deleteFile = async ({
    endpoint,
    doctype = null,
    docname = null,
    fieldname = null,
    onStart = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
}) => {
    try {
        if (onStart) {
            onStart()
        }

        const formData = new FormData()

        if (doctype) {
            formData.append('doctype', doctype)
        }

        if (docname) {
            formData.append('docname', docname)
        }

        if (fieldname) {
            formData.append('fieldname', fieldname)
        }


        const response = await fetch(endpoint, {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {
                'Authorization': `token ${API_KEY}:${API_SECRET}`,
            },
            body: formData,
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Deletion failed')
        }

        if (onSuccess) {
            onSuccess(data)
        }

        return data

    } catch (error) {
        console.error('File Deletion Error:', error)

        if (onError) {
            onError(error)
        }

    } finally {
        if (onFinally) {
            onFinally()
        }
    }
}