<?php

namespace Themsaid\MailPreview;

use Illuminate\Foundation\Http\Kernel;
use Illuminate\Mail\MailServiceProvider;
use Illuminate\Support\ServiceProvider;
use Swift_Mailer;

use Themsaid\MailPreview\Transport\LocalTransport;
use Themsaid\MailPreview\Transport\PreviewTransport;

class MailProvider extends MailServiceProvider
{
    /**
     * Register the Swift Mailer instance.
     *
     * @return void
     */
    function registerSwiftMailer()
    {
        if ($this->app['config']['mail.driver'] == 'preview' || $this->app['config']['mail.preview'] == true) {
            $this->registerPreviewSwiftMailer();
        } else if ($this->app['config']['mail.driver'] == 'local' || $this->app['config']['mail.local'] == true) {
            $this->registerLocalSwiftMailer();
        } else {
            parent::registerSwiftMailer();
        }
    }

    /**
     * Register the Preview Swift Mailer instance.
     *
     * @return void
     */
    protected function registerPreviewSwiftMailer()
    {
        $this->app->singleton('swift.mailer', function($app) {
            return new Swift_Mailer(
                new PreviewTransport(
                    $app->make('Illuminate\Filesystem\Filesystem'),
                    $app['config']['mailpreview.path'],
                    $app['config']['mailpreview.maximum_lifetime']
                )
            );
        });
    }

    protected function registerLocalSwiftMailer () {
        $this->app->singleton('swift.mailer', function($app) {
            return new Swift_Mailer(
                new LocalTransport()
            );
        });
    }
}
