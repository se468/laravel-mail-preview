<?php

namespace Themsaid\MailPreview\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Artisan;
use Themsaid\MailPreview\Http\LocalEmail;

class LocalEmailController extends Controller{

    public function index () {
        /* Only for Development
        Artisan::call('vendor:publish', [
            '--tag' => 'public', 
            '--force' => 1
        ]);
        */

        $emails = LocalEmail::all();
        return view("PreviewEmail::index", [
            'emails' => $emails
        ]);
    }
}