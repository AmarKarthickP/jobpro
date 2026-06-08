const CACHE_DURATION = 2 * 60 * 60 * 1000 // 2 hours

async function fetchWithCache(cacheKey, url) {

    const cachedData = localStorage.getItem(cacheKey)
    const cachedTime = localStorage.getItem(`${cacheKey}_time`)

    // Check cache validity
    if (cachedData && cachedTime) {

        const isValid =
            Date.now() - Number(cachedTime) < CACHE_DURATION

        if (isValid) {

            try {
                return JSON.parse(cachedData)
            } catch (error) {

                console.error('Invalid cache data:', error)

                localStorage.removeItem(cacheKey)
                localStorage.removeItem(`${cacheKey}_time`)
            }
        }
    }

    // Fetch fresh data
    const response = await fetch(url)
    const result = await response.json()

    // Store in cache
    localStorage.setItem(
        cacheKey,
        JSON.stringify(result.message)
    )

    localStorage.setItem(
        `${cacheKey}_time`,
        Date.now()
    )

    return result.message
}

export async function getNationality() {
    return fetchWithCache(
        'nationality_cache',
        '/api/method/jobpro.api.external.get_nationality'
    )
}

export async function getDistricts() {
    return fetchWithCache(
        'districts_cache',
        '/api/method/jobpro.api.external.get_districts'
    )
}

export async function getState() {
    return fetchWithCache(
        'state_cache',
        '/api/method/jobpro.api.external.get_state'
    )
}

export async function getCountry() {
    return fetchWithCache(
        'country_cache',
        '/api/method/jobpro.api.external.get_country'
    )
}

export async function getCurrency() {
    return fetchWithCache(
        'currency_cache',
        '/api/method/jobpro.api.external.get_currency'
    )
}

export async function getHighestDegree() {
    return fetchWithCache(
        'highest_degree_cache',
        '/api/method/jobpro.api.external.get_highest_degree'
    )
}

export async function getSpecialization() {
    return fetchWithCache(
        'specialization_cache',
        '/api/method/jobpro.api.external.get_specialization'
    )
}