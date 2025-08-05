import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var bootstrap: any;

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',  
}) 
export class AppComponent {
  title = 'Coimbatore Sparks Rotaract';
  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'assets/videos/TeamIntro.mp4'
    );
  }

  openVideoModal() {
    const modalElement = document.getElementById('videoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
