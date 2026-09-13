import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import analytics72d765 from './analytics'
import labs7ab630 from './labs'
import ordersB47e5f from './orders'
/**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:17
 * @route '/admin'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:17
 * @route '/admin'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:17
 * @route '/admin'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:17
 * @route '/admin'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:17
 * @route '/admin'
 */
    const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:17
 * @route '/admin'
 */
        analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:17
 * @route '/admin'
 */
        analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    analytics.form = analyticsForm
/**
* @see \App\Http\Controllers\LabsController::labs
 * @see app/Http/Controllers/LabsController.php:15
 * @route '/admin/labs'
 */
export const labs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labs.url(options),
    method: 'get',
})

labs.definition = {
    methods: ["get","head"],
    url: '/admin/labs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LabsController::labs
 * @see app/Http/Controllers/LabsController.php:15
 * @route '/admin/labs'
 */
labs.url = (options?: RouteQueryOptions) => {
    return labs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LabsController::labs
 * @see app/Http/Controllers/LabsController.php:15
 * @route '/admin/labs'
 */
labs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: labs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LabsController::labs
 * @see app/Http/Controllers/LabsController.php:15
 * @route '/admin/labs'
 */
labs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: labs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LabsController::labs
 * @see app/Http/Controllers/LabsController.php:15
 * @route '/admin/labs'
 */
    const labsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: labs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LabsController::labs
 * @see app/Http/Controllers/LabsController.php:15
 * @route '/admin/labs'
 */
        labsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: labs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LabsController::labs
 * @see app/Http/Controllers/LabsController.php:15
 * @route '/admin/labs'
 */
        labsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: labs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    labs.form = labsForm
/**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:17
 * @route '/admin/orders'
 */
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/admin/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:17
 * @route '/admin/orders'
 */
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:17
 * @route '/admin/orders'
 */
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:17
 * @route '/admin/orders'
 */
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:17
 * @route '/admin/orders'
 */
    const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: orders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:17
 * @route '/admin/orders'
 */
        ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\OrderController::orders
 * @see app/Http/Controllers/Admin/OrderController.php:17
 * @route '/admin/orders'
 */
        ordersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    orders.form = ordersForm
const admin = {
    analytics: Object.assign(analytics, analytics72d765),
labs: Object.assign(labs, labs7ab630),
orders: Object.assign(orders, ordersB47e5f),
}

export default admin