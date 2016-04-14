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

        $this->app->register(MailProvider::class);

        if ($this->app['config']['mailpreview.show_link_to_preview']) {
            if (! $this->app->routesAreCached()) {
                $this->app['router']->get('/themsaid/mail-preview', function () {
                    if ($previewPath = $this->app['request']->input('path')) {
                        $content = file_get_contents(storage_path('email-previews/'.$previewPath.'.html'));
                    } else {
                        $lastPreviewName = last(glob(storage_path('email-previews').'/*.html'));

                        $content = file_get_contents($lastPreviewName);
                    }

                    return $content;
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
    }
}