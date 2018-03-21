# Laravel Mail Preview / Local Driver

Forked from [Laravel Mail Preview](https://github.com/themsaid/laravel-mail-preview). 

This package introduces a new `preview` and `local` mail driver for Laravel that when selected will render the content of the
sent email and save it as both `.html` and `.eml` files.

## Installation

Begin by installing the package through Composer. Run the following command in your terminal:

```bash
composer require se468/laravel-mail-preview
```

Then publish the config file:

```
php artisan vendor:publish --provider="Themsaid\MailPreview\MailPreviewServiceProvider"
```

Finally, change `MAIL_DRIVER` to `preview` or `local` in your `.env` file:

```
MAIL_DRIVER=preview

or 

MAIL_DRIVER=local
```

Run 
```
php artisan vendor:publish --tag=public --force
```

## How it works

### Mail Preview
Everytime an email is sent, an `.html` and `.eml` file will be generated in `storage/email-previews` with a name that includes the first recipient and the subject:

```
1457904864_jack_at_gmail_com_invoice_000234.html
1457904864_jack_at_gmail_com_invoice_000234.eml
```

You can open the `.html` file in a web browser, or open the `.eml` file in your default email client to have a realistic look
at the final output.

### Local Email Storage

If you are using `local` for the `MAIL_DRIVER`, you can go to `/preview-email` route to see all the emails that has been stored. It will create a local inbox where you can see and preview the emails that's sent out.

### Preview in a web browser

When you open the `.html` file in a web browser you'll be able to see how your email will look, however there might be
some differences that varies from one email client to another.

At the beginning of the generated file you'll find an HTML comment with all the message info:

```html
<!--
From:{"info@acme.com":"Acme HQ"},
to:{"jack@gmail.com":"Jack Black"},
reply-to:{"info@acme.com"},
cc:[{"finance@acme.com":"Acme Finance"}, {"management@acme.com":"Acme Management"}],
bcc:null,
subject:Invoice #000234
-->
```

## Package Configurations
From the `config/mailpreview.php` file you'll be able to change the output location of the preview files as well as the maximum lifetime for keeping previews, after this time old previews will get removed.

### Logged out after clicked on the preview link
You will always lose your current session if you click on the generated notification link. This is because Laravel stores the session in an encrypted cookie. To change this behavior, you have to adjust the `middleware` property in the `config/mailpreview.php` file to match the following snippet:

```php
    'middleware' => [
        \App\Http\Middleware\EncryptCookies::class,
    ],
```
