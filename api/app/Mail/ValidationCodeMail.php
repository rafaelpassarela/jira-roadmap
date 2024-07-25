<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ValidationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public array $mailData;

    /**
     * Create a new message instance.
     */
    public function __construct(array $content)
    {
        // var_dump('1 - construct');
        $this->mailData = $content;
    }

    public function build(): ValidationCodeMail // Content
    {
        // var_dump('2 - build');
        // return $this->subject($this->mailData['subject'])
        //     ->view('emails.validationcode');
        return $this->view('emails.validationcode');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        // var_dump('3 - envelope');
        return new Envelope(
            subject: 'Código de Autenticação',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // var_dump('4 - content');
        return new Content(
            view: 'emails.validationcode',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // var_dump('5 - attachments');
        return [];
    }
}
