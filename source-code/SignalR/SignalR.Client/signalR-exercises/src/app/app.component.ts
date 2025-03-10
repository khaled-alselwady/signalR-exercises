import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'User Count', url: '/user-count', icon: 'mail' },
    { title: 'Voting', url: '/voting', icon: 'paper-plane' },
    { title: 'House Events', url: '/house-events', icon: 'heart' },
    { title: 'Notification', url: '/notification', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  constructor() {}
}
