import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
const HeartbeatController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: HeartbeatController.url(options),
    method: 'post',
})

HeartbeatController.definition = {
    methods: ["post"],
    url: '/analytics/heartbeat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
HeartbeatController.url = (options?: RouteQueryOptions) => {
    return HeartbeatController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
HeartbeatController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: HeartbeatController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
    const HeartbeatControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: HeartbeatController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeartbeatController::__invoke
 * @see app/Http/Controllers/HeartbeatController.php:11
 * @route '/analytics/heartbeat'
 */
        HeartbeatControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: HeartbeatController.url(options),
            method: 'post',
        })
    
    HeartbeatController.form = HeartbeatControllerForm
export default HeartbeatController