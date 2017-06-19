<?php

namespace Themsaid\MailPreview;

use Illuminate\Routing\Controller as BaseController;

class MailPreviewController extends BaseController
{
    public function preview()
    {
        $app = app();
        
        if ($previewPath = $app['request']->input('path')) {
            $content = file_get_contents($app['config']['mailpreview.path'].'/'.$previewPath.'.html');
        } else {
            $lastPreviewName = last(glob($app['config']['mailpreview.path'].'/*.html'));
            $content = file_get_contents($lastPreviewName);
        }

        return $content;
    }
}