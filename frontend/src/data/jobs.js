let memoryCache = {}
const CACHE_DURATION = 1000 * 60 * 10

export async function getJobs(additionalFilters = [], candidate = null, start = 0, pageLength = 12) {
    const params = new URLSearchParams({
        additional_filters: JSON.stringify(additionalFilters),
        candidate: candidate || "",
        start: start,
        page_length: pageLength,
    })

    try {

        const response = await fetch(
            `/api/method/jobpro.api.get_tasks?${params}`
        )

        const result = await response.json()

        if (!response.ok) {
            console.error("API Error:", result)
            return []
        }

        const jobs =
            result.message ||
            []

        return jobs

    } catch (error) {

        console.error("Fetch Error:", error)

        return []

    }
}

export async function getAppliedJobs(candidate) {

    const key = candidate
    const cached = memoryCache[key]

    if (
        cached &&
        Date.now() - cached.time < CACHE_DURATION
    ) {
        return cached.data
    }

    const params = new URLSearchParams({
        candidate
    })

    try {

        const response = await fetch(
            `/api/method/jobpro.api.get_applied_jobs?${params}`
        )

        const result = await response.json()

        if (!response.ok) {
            console.error("API Error:", result)
            return []
        }

        const jobs = result.message || []

        memoryCache[key] = {
            data: jobs,
            time: Date.now()
        }

        return jobs

    } catch (error) {

        console.error("Fetch Error:", error)

        return []
    }
}

export async function getFilterValues() {
    const key = "job_filter_values"

    const cached = memoryCache[key]

    if (
        cached &&
        Date.now() - cached.time < CACHE_DURATION
    ) {
        return cached.data
    }

    try {
        const response = await fetch(
            "/api/method/jobpro.api.get_filter_values"
        )

        const result = await response.json()

        if (!response.ok) {
            console.error("API Error:", result)
            return {}
        }

        const filterValues = result.message || {}

        memoryCache[key] = {
            data: filterValues,
            time: Date.now()
        }

        return filterValues

    } catch (error) {
        console.error("Fetch Error:", error)
        return {}
    }
}