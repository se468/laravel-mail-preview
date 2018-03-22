<?php 


$namespace = "Themsaid\MailPreview\Http\Controllers";

Route::group(['namespace' => $namespace, 'prefix' => 'email-previews'], function () {
    Route::get('/', 'LocalEmailController@index');
    Route::post('/', 'LocalEmailController@markread');
    Route::delete('/{id}', 'LocalEmailController@destroy');
});