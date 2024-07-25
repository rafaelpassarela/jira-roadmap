<?php

namespace App\Http\Controllers;

use App\Mail\ValidationCodeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendMailController extends Controller
{
    public function validationCode($mailData)
    {
        Mail::to($mailData['email'])->send(new ValidationCodeMail($mailData));

        return true;
    }
}
