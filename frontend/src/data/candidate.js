export async function getCandidate(email) {

    const params = new URLSearchParams({
        email
    })

    const response = await fetch(
        `/api/method/jobpro.api.get_candidates?${params}`,
    )

    const result = await response.json()

    return result.message
}