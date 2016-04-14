<?php

namespace Themsaid\MailPreview;

use Illuminate\Foundation\Http\Kernel;
use Swift_Mailer;
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

        $this->app[Kernel::class]->pushMiddleware(
            MailPreviewMiddleware::class
        );

        if (! $this->app->routesAreCached()) {
            $this->app['router']->get('/themsaid/mail-preview', function () {
                if ($previewPath = $this->app['request']->input('path')) {
                    $content = file_get_contents($previewPath.'.html');
                } else {
                    $lastPreviewName = last(glob(storage_path('email-previews').'/*.html'));

                    $content = file_get_contents(
                        storage_path('email-previews/'.$lastPreviewName)
                    );
                }

                return $content;
            });
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        parent::register();

        $this->mergeConfigFrom(
            __DIR__.'/config/mailpreview.php', 'mailpreview'
        );
    }

    /**
     * Register the Swift Mailer instance.
     *
     * @return void
     */
    function registerSwiftMailer()
    {
        if ($this->app['config']['mail.driver'] == 'preview') {
            $this->registerPreviewSwiftMailer();
        } else {
            parent::registerSwiftMailer();
        }
    }

    /**
     * Register the Preview Swift Mailer instance.
     *
     * @return void
     */
    private function registerPreviewSwiftMailer()
    {
        $this->app['swift.mailer'] = $this->app->share(function ($app) {
            return new Swift_Mailer(
                new PreviewTransport(
                    $app->make('Illuminate\Filesystem\Filesystem'),
                    $app['config']['mailpreview.path'],
                    $app['config']['mailpreview.maximum_lifetime']
                )
            );
        });
    }
}