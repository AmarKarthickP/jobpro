const candidateCache = new Map()
const candidateStatusCache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 mins

export async function getCandidate(email) {

    // Check cache
    const cached = candidateCache.get(email)

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('Returning cached candidate')
        return cached.data
    }

    // API call
    const params = new URLSearchParams({
        email
    })

    const response = await fetch(
        `/api/method/jobpro.api.external.external.get_candidates?${params}`
    )

    const result = await response.json()

    // Store in cache
    candidateCache.set(email, {
        data: result.message,
        timestamp: Date.now()
    })

    return result.message
}

export async function getCandidateStatuses({
  candidate,
  task,
  onStart = null,
  onSuccess = null,
  onError = null,
  onFinally = null,
}) {

  try {

    if (onStart) {
      onStart()
    }

    // Cache Key
    const cacheKey = `${candidate}-${task}`

    // Check Cache
    const cached = candidateStatusCache.get(cacheKey)

    if (
      cached &&
      Date.now() - cached.timestamp < CACHE_DURATION
    ) {

      console.log('Returning cached candidate statuses')

      if (onSuccess) {
        onSuccess(cached.data)
      }

      return cached.data
    }

    // Params
    const params = new URLSearchParams({
      candidate,
      task,
    })

    // API Call
    const response = await fetch(
      `/api/method/external.get_candidate_status?${params}`
    )

    const result = await response.json()

    const statuses = result.message || []

    // Store Cache
    candidateStatusCache.set(cacheKey, {
      data: statuses,
      timestamp: Date.now(),
    })

    if (onSuccess) {
      onSuccess(statuses)
    }

    return statuses

  } catch (error) {

    console.error(
      'Candidate Status Fetch Error:',
      error
    )

    if (onError) {
      onError(error)
    }

    return []

  } finally {

    if (onFinally) {
      onFinally()
    }
  }
}