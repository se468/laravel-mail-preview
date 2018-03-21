<?php

namespace Themsaid\MailPreview\Transport;

use Illuminate\Mail\Transport\Transport;
use Swift_Mime_SimpleMessage;
use Themsaid\MailPreview\Http\LocalEmail;

class LocalTransport extends Transport
{

    public function __construct()
    {

    }

    /**
     * {@inheritdoc}
     */
    public function send(Swift_Mime_SimpleMessage $message, &$failedRecipients = null)
    {
        $this->beforeSendPerformed($message);

        $this->createLocalEmail($message);

    }

    protected function createLocalEmail($message)
    {
        $localEmail = LocalEmail::create([
            'from'     => json_encode($message->getFrom()),
            'to'       => json_encode($message->getTo()),
            'reply_to' => json_encode($message->getReplyTo()),
            'cc'       => json_encode($message->getCc()),
            'bcc'      => json_encode($message->getBcc()),
            'subject'  => $message->getSubject(),
            'body'     => $message->getBody(),
        ]);

        $localEmail->save();
    }
}
