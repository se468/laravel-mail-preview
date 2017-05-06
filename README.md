# Laravel Mail Preview Driver

[![Latest Version on Packagist](https://img.shields.io/packagist/v/themsaid/laravel-mail-preview.svg?style=flat-square)](https://packagist.org/packages/themsaid/laravel-mail-preview)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Total Downloads](https://img.shields.io/packagist/dt/themsaid/laravel-mail-preview.svg?style=flat-square)](https://packagist.org/packages/themsaid/laravel-mail-preview)

This package introduces a new `preview` mail driver for laravel, when selected it will produce the content of the
sent mail and save it as .html & .eml documents.

## Installation

Begin by installing the package through Composer. Run the following command in your terminal:

```bash
composer require themsaid/laravel-mail-preview
```

Once composer is done, add the package service provider in the providers array in `config/app.php`:

```php
Themsaid\MailPreview\MailPreviewServiceProvider::class
```

Then publish the config file:

```
php artisan vendor:publish --provider="Themsaid\MailPreview\MailPreviewServiceProvider"
```

Finally, change `MAIL_DRIVER` to `preview` in your `.env` file:

```
MAIL_DRIVER=preview
```

## How it works

On every email sent a `.html` & a `.eml` documents will be generated in `storage/email-previews` with a name that includes the first receiver and the subject:

```
1457904864_jack_at_gmail_com_invoice_000234.html
1457904864_jack_at_gmail_com_invoice_000234.eml
```

You can open the `.html` file in a web browser, or open the `.eml` file in your default email client to have a realistic look
at the final output.

### Preview in a web browser

When you open the `.html` file in a web browser you'll be able to see how your email will look like, however there might be
some differences that varies from an email client to another.

At the beginning of the generated file you'll find a HTML comment with all the message info:

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
From the configuration file you'll be able to change the previews output location as well as the maximum life time for
keeping previews, after this time old previews will get removed.

### Logged out after clicked on the preview link
You always will lose your current session, if you click on the generated notification link. This is because Laravel stores the session in an encrypted cookie. To change this behavior, you have to adjust the `middleware` property in the `config/mailpreview.php` file to match the following snippet:

```php
    'middleware' => [
        \App\Http\Middleware\EncryptCookies::class,
    ],
```
