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

        if ($this->app['config']['mail.driver'] != 'preview') {
            return;
        }

        if ($this->app['config']['mailpreview.show_link_to_preview']) {
            if (! $this->app->routesAreCached()) {
                $this->app['router']->group(['middleware' => $this->middleware()], function ($router) {
                    $router->get('/themsaid/mail-preview', function () {
                        if ($previewPath = $this->app['request']->input('path')) {
                            $content = file_get_contents($this->app['config']['mailpreview.path'].'/'.$previewPath.'.html');
                        } else {
                            $lastPreviewName = last(glob($this->app['config']['mailpreview.path'].'/*.html'));
                            $content = file_get_contents($lastPreviewName);
                        }

                        return $content;
                    });
                });
            }

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
            __DIR__.'/config/mailpreview.php', 'mailpreview'
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
