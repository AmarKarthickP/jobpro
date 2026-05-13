export function animateCounter(
    target,
    refValue,
    duration = 2000
) {
    const startTime = performance.now()

    function easeOutExpo(x) {
        return x === 1
            ? 1
            : 1 - Math.pow(2, -10 * x)
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime

        const rawProgress = Math.min(
            elapsed / duration,
            1
        )

        const progress = easeOutExpo(rawProgress)

        refValue.value = Math.round(
            target * progress
        )

        if (rawProgress < 1) {
            requestAnimationFrame(update)
        }
    }

    requestAnimationFrame(update)
}