async function getJobs() {
    const response = await fetch(
        '/api/method/jobpro.api.get_tasks'
    )

    const result = await response.json()

    return result.message.data
}

export default getJobs