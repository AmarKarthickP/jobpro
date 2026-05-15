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

                Authorization:
                    `token ${API_KEY}:${API_SECRET}`,
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