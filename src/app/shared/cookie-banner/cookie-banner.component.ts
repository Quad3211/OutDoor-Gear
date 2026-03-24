import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css'],
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;

  ngOnInit(): void {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      this.showBanner = true;
    }
  }

  acceptAll(): void {
    localStorage.setItem('cookie-consent', 'all');
    this.showBanner = false;
  }

  acceptEssential(): void {
    localStorage.setItem('cookie-consent', 'essential');
    this.showBanner = false;
  }
}
