import {Injectable, OnDestroy, OnInit} from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class UserCountService implements OnInit, OnDestroy {

  private _hubConnection?: signalR.HubConnection;
  private _totalViews = 0;
  private _totalUsers = 0;

  get totalViews() {
    return this._totalViews;
  }

  get totalUsers() {
    return this._totalUsers;
  }

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7156/UserCount', {withCredentials: true})
      .build();

    this._hubConnection?.on('updateTotalViews', (value) => {
      this._totalViews = value;
    });

    this._hubConnection?.on('updateTotalUsers', (value) => {
      this._totalUsers = value;
    });

    this._hubConnection?.start().then(() => this.fullfilled(), () => this.regected());
  }

  ngOnDestroy(): void {
    //this.onDisconnected();
  }

  ngOnInit(): void {

  }

  newWindowLoadedOnClient(): void {
    this._hubConnection?.send('NewWindowLoaded');
  }

  onConnected() {
    this._hubConnection?.send('OnDisconnectedAsync');
  }

  onDisconnected() {
    this._hubConnection?.send('OnDisconnectedAsync');
  }

  fullfilled() {
    console.log('fullfilled');
    this.newWindowLoadedOnClient();
    //this.onConnected();
  }

  regected() {
    console.log('regected');
  }

}
