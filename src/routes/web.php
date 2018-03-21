<?php 


$namespace = "Themsaid\MailPreview\Http\Controllers";

Route::group(['namespace' => $namespace, 'prefix' => 'preview-email'], function () {
    Route::get('/', 'LocalEmailController@index');
});