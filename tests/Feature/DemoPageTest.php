<?php

use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('root renders Fullbright with the existing tracking contract in either project mode', function (string $mode) {
    config()->set('analytics.mode', $mode);

    $this->get('/')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('fullbright/LP')
        ->where('initialPricingMode', 'self')
        ->where('tracking.mode', $mode)
        ->where('tracking.pageUrl', '/')
        ->where('paymentMode', 'internal'));
})->with(['ctwa', 'form']);

test('pricing query is reflected in the initial Inertia render without stale home HTML', function () {
    $this->get('/')->assertInertia(fn (Assert $page) => $page->where('initialPricingMode', 'self'));
    $this->get('/?mode=tutor')->assertInertia(fn (Assert $page) => $page
        ->component('fullbright/LP')
        ->where('initialPricingMode', 'tutor'));
    $this->get('/?mode=unknown')->assertInertia(fn (Assert $page) => $page->where('initialPricingMode', 'self'));
});

test('home Inertia navigation returns JSON and keeps each visitors tracking identity', function () {
    $first = (string) Str::uuid();
    $second = (string) Str::uuid();

    $this->withCookie('pbm_vid', $first)->get('/')->assertInertia(fn (Assert $page) => $page
        ->where('tracking.visitorId', $first));
    $version = app(\App\Http\Middleware\HandleInertiaRequests::class)->version(\Illuminate\Http\Request::create('/'));

    $this->withCookie('pbm_vid', $second)->withHeaders(['X-Inertia' => 'true', 'X-Inertia-Version' => $version])->get('/')
        ->assertOk()
        ->assertHeader('X-Inertia', 'true')
        ->assertJsonPath('component', 'fullbright/LP')
        ->assertJsonPath('props.tracking.visitorId', $second);
});
