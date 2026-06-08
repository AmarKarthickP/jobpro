export async function getOptions(doctype, fields) {
    try {
        const params = new URLSearchParams({
            doctype,
            fields: JSON.stringify(fields)
        })

        const response = await fetch(
            `/api/method/jobpro.api.external.get_options?${params}`
        )

        const result = await response.json()

        console.log('Options API:', result)

        return result.message
    } catch (error) {
        console.error('Error fetching options:', error)
        return {}
    }
}