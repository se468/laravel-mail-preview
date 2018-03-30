<?php

namespace Themsaid\MailPreview;

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Support\ServiceProvider;

class MailPreviewServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__.'/config/mailpreview.php' => config_path('mailpreview.php'),
        ]);
        $this->loadRoutesFrom(__DIR__."/routes/web.php");
        $this->loadViewsFrom(__DIR__."/resources/views", "PreviewEmail");
        $this->loadMigrationsFrom(__DIR__.'/database/migrations');
        
        require_once __DIR__.'/Http/Helpers/helpers.php';

        $this->publishes([
            __DIR__.'/public' => public_path('vendor/se468/laravel-preview-email'),
        ], 'public');


        if ($this->app['config']['mail.driver'] != 'preview') {
            return;
        }

        if ($this->app['config']['mailpreview.show_link_to_preview']) {
            $this->app['router']->group(['middleware' => $this->middleware()], function ($router) {
                $router->get('/themsaid/mail-preview')->uses(MailPreviewController::class.'@preview');
            });

            $this->app[Kernel::class]->pushMiddleware(
                MailPreviewMiddleware::class
            );
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__.'/config/mailpreview.php',
            'mailpreview'
        );

        $this->app->register(MailProvider::class);
    }

    /**
     * The array of middleware for the preview route.
     *
     * @return array
     */
    private function middleware()
    {
        return array_merge(
            (array) $this->app['config']['mailpreview.middleware'],
            [\Illuminate\Session\Middleware\StartSession::class]
        );
    }
}
