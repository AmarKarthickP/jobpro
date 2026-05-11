const CACHE_DURATION = 1000 * 60 * 1 // 1 min

export async function getJobs(additionalFilters = []) {

    const cacheKey =
        "jobs_cache_" + JSON.stringify(additionalFilters)

    const cacheTimeKey =
        "jobs_cache_time_" + JSON.stringify(additionalFilters)

    const cachedJobs = localStorage.getItem(cacheKey)
    const cacheTime = localStorage.getItem(cacheTimeKey)

    const isValid =
        cachedJobs &&
        cacheTime &&
        Date.now() - Number(cacheTime) < CACHE_DURATION

    if (isValid) {
        return JSON.parse(cachedJobs)
    }

    const params = new URLSearchParams({
        additional_filters: JSON.stringify(additionalFilters)
    })

    try {

        const response = await fetch(
            `/api/method/jobpro.api.get_tasks?${params}`
        )

        const result = await response.json()

        console.log(result)

        if (!response.ok) {
            console.error("API Error:", result)
            return []
        }

        const jobs =
            result.message?.data ||
            result.data ||
            []

        localStorage.setItem(
            cacheKey,
            JSON.stringify(jobs)
        )

        localStorage.setItem(
            cacheTimeKey,
            Date.now().toString()
        )

        return jobs

    } catch (error) {

        console.error("Fetch Error:", error)

        return []

    }

}
export async function getOptions(doctype, fields) {
    const params = new URLSearchParams({
        doctype,
        fields: JSON.stringify(fields)
    })

    const response = await fetch(
        `/api/method/jobpro.api.get_options?${params}`,
    )

    const result = await response.json()
    return result.message.data
}