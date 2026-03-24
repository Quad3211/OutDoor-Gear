import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  formSubmitted = false;
  formError = false;

  @ViewChild('errorSummary') errorSummary?: ElementRef<HTMLDivElement>;

  model = {
    name: '',
    email: '',
    subject: '',
    message: '',
    consentGiven: false,
  };

  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Contact Us — Island Adventure Gear');
    this.meta.updateTag({
      name: 'description',
      content:
        "Get in touch with Island Adventure Gear. We're here to help with gear advice, orders, and event bookings. Kingston, Jamaica.",
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.model.consentGiven) {
      this.formError = true;
      // Announce error to screen readers
      setTimeout(() => {
        if (this.errorSummary) {
          this.errorSummary.nativeElement.focus();
        }
      }, 0);
      return;
    }
    this.formError = false;
    this.formSubmitted = true;
    form.resetForm();
    this.model = {
      name: '',
      email: '',
      subject: '',
      message: '',
      consentGiven: false,
    };
  }
}
