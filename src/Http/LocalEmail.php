<?php

namespace Themsaid\MailPreview\Http;

use Illuminate\Database\Eloquent\Model;

class LocalEmail extends Model
{
    protected $table = 'local_emails';
    public $fillable = [
        'from','to','reply_to','cc','bcc','subject','body'
    ];



}
