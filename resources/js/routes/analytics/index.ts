import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AnalyticsController::track
 * @see app/Http/Controllers/AnalyticsController.php:28
 * @route '/analytics/track'
 */
export const track = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: track.url(options),
    method: 'post',
})

track.definition = {
    methods: ["post"],
    url: '/analytics/track',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AnalyticsController::track
 * @see app/Http/Controllers/AnalyticsController.php:28
 * @route '/analytics/track'
 */
track.url = (options?: RouteQueryOptions) => {
    return track.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::track
 * @see app/Http/Controllers/AnalyticsController.php:28
 * @route '/analytics/track'
 */
track.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: track.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AnalyticsController::track
 * @see app/Http/Controllers/AnalyticsController.php:28
 * @route '/analytics/track'
 */
    const trackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: track.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AnalyticsController::track
 * @see app/Http/Controllers/AnalyticsController.php:28
 * @route '/analytics/track'
 */
        trackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: track.url(options),
            method: 'post',
        })
    
    track.form = trackForm
/**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
export const heartbeat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: heartbeat.url(options),
    method: 'post',
})

heartbeat.definition = {
    methods: ["post"],
    url: '/analytics/heartbeat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
heartbeat.url = (options?: RouteQueryOptions) => {
    return heartbeat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
heartbeat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: heartbeat.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
    const heartbeatForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: heartbeat.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
        heartbeatForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: heartbeat.url(options),
            method: 'post',
        })
    
    heartbeat.form = heartbeatForm
const analytics = {
    track: Object.assign(track, track),
heartbeat: Object.assign(heartbeat, heartbeat),
}

export default analytics