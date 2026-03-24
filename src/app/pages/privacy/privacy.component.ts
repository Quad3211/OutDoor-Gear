import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})
export class PrivacyComponent implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Privacy Policy — Island Adventure Gear');
    this.meta.updateTag({
      name: 'description',
      content:
        'Read our privacy policy, cookie policy, and data use practices. Island Adventure Gear is committed to your privacy.',
    });
  }
}
