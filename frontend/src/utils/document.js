const API_KEY = import.meta.env.VITE_FRAPPE_API_KEY
const API_SECRET = import.meta.env.VITE_FRAPPE_API_SECRET
const EXTERNAL_ENDPOINT = import.meta.env.VITE_FRAPPE_EXTERNAL_SITE
const EXTERNAL_API_KEY = import.meta.env.VITE_FRAPPE_EXTERNAL_API_KEY
const EXTERNAL_API_SECRET = import.meta.env.VITE_FRAPPE_EXTERNAL_API_SECRET

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
    file,
    doctype = null,
    docname = null,
    fieldname = null,
    onStart = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
}) => {
    try {

        if (!file) {
            throw new Error('No file selected')
        }

        onStart?.()

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

        formData.append('is_private', 0)

        const response = await fetch(
            `${EXTERNAL_ENDPOINT}/api/method/teampro.jobpro_api.upload_file`,
            {
                method: 'POST',

                headers: {
                    Authorization:
                        `token ${EXTERNAL_API_KEY}:${EXTERNAL_API_SECRET}`,
                },

                body: formData,
            }
        )

        const text = await response.text()

        let data

        try {
            data = JSON.parse(text)
        } catch (e) {

            console.error('Invalid JSON Response:', text)

            throw new Error(
                `Invalid server response (${response.status})`
            )
        }

        // Frappe error handling
        if (
            !response.ok ||
            data.exc ||
            data.exception
        ) {

            let errorMessage = 'Upload failed'

            if (data._server_messages) {
                try {
                    const messages = JSON.parse(data._server_messages)

                    errorMessage = JSON.parse(messages[0]).message
                } catch {
                    errorMessage = data._server_messages
                }
            } else if (data.message) {
                errorMessage = data.message
            }

            throw new Error(errorMessage)
        }

        // Core frappe upload response
        const fileUrl = data.message?.file_url

        const result = {
            status: 'success',
            file_url: fileUrl,
            data,
        }

        onSuccess?.(result)

        return result

    } catch (error) {

        console.error('File Upload Error:', error)

        onError?.(error)

        return {
            status: 'error',
            message: error.message || 'Upload failed',
        }

    } finally {

        onFinally?.()
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