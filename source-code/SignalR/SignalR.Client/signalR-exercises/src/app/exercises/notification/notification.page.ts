import {Component, inject, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: false
})
export class NotificationPage implements OnInit {

  private _notificationService = inject(NotificationService);
  message = '';
  get messages() {
    return this._notificationService.messages;
  }

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    this._notificationService.TriggerNotification(this.message);
    this.message = '';
  }
}
