<?php

namespace Themsaid\MailPreview;

use Illuminate\Mail\MailServiceProvider;

class MailPreviewServiceProvider extends MailServiceProvider
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

    /**
     * Register the Swift Transport instance.
     *
     * @return void
     */
    function registerSwiftTransport()
    {
        if ($this->app['config']['mail.driver'] == 'preview') {
            $this->registerPreviewTransport();
        } else {
            parent::registerSwiftTransport();
        }
    }

    /**
     * Register the Preview Transport instance.
     *
     * @return void
     */
    private function registerPreviewTransport()
    {
        $this->app['swift.transport'] = $this->app->share(function ($app) {
            return new PreviewTransport(
                $app->make('Illuminate\Filesystem\Filesystem'),
                $app['config']['mailpreview.path'],
                $app['config']['mailpreview.maximum_lifetime']
            );
        });
    }
}