import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _hubConnection?: signalR.HubConnection;
  private _messages: string[] = [];

  get messages() {
    return this._messages;
  }

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7156/Notification', {withCredentials: true})
      .build();

    this._hubConnection?.on('loadNotification', (messages) => {
      this._messages = messages;
    });

    this._hubConnection?.start().then(() => this.fullfilled(), () => this.regected());
  }

  private fullfilled() {
    console.log('fullfilled');
    this.getMessages();
  }

  private regected() {
    console.log('regected');
  }

  private getMessages() {
    return this._hubConnection?.send('LoadMessages');
  }

  TriggerNotification(message: string) {
    this._hubConnection?.send('TriggerNotification', message);
  }
}
