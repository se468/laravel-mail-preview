<?php

namespace Themsaid\MailPreview\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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

        $emails = LocalEmail::orderBy('created_at','desc')->get();
        return view("PreviewEmail::index", [
            'emails' => $emails
        ]);
    }

    public function markread (Request $request) {
        $input = $request->all();

        $email = LocalEmail::find($input["id"]);
        $email->read = true;
        $email->save();

        return response()->json([
            "status" => "email marked read",
        ]);
    }

    public function destroy($id) {

        $email = LocalEmail::find($id);
        $email->delete();

        return response()->json([
            "status" => "email deleted",
        ]);
    }
}