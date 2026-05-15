export const handleSave = async ({
    endpoint,
    payload = {},
    onStart = null,
    onSuccess = null,
    onError = null,
    onFinally = null,
}) => {
    try {

        if (onStart) {
            onStart()
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Failed to save')
        }

        if (onSuccess) {
            onSuccess(data)
        }

        return data

    } catch (error) {
        console.error(error)

        if (onError) {
            onError(error)
        }

    } finally {

        if (onFinally) {
            onFinally()
        }
    }
}