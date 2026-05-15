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

// const candidateCache = new Map()

// export async function getCandidate(email) {
//     const CACHE_DURATION = 5 * 60 * 1000 // 5 mins

//     // Check cache
//     const cached = candidateCache.get(email)

//     if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//         console.log('Returning cached candidate')
//         return cached.data
//     }

//     // API call
//     const params = new URLSearchParams({
//         email
//     })

//     const response = await fetch(
//         `/api/method/jobpro.api.get_candidates?${params}`
//     )

//     const result = await response.json()

//     // Store in cache
//     candidateCache.set(email, {
//         data: result.message,
//         timestamp: Date.now()
//     })

//     return result.message
// }