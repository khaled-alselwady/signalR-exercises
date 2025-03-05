import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private _hubConnection?: signalR.HubConnection;
  private _totalCloak = 0;
  private _totalStone = 0;
  private _totalWand = 0;

  get totalCloak() {
    return this._totalCloak;
  }
  get totalStone() {
    return this._totalStone;
  }
  get totalWand() {
    return this._totalWand;
  }

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7156/Voting', {withCredentials: true})
      .build();

    this._hubConnection?.on('updateVotingCount', (cloak, stone, wand) => {
      this._totalCloak = cloak;
      this._totalStone = stone;
      this._totalWand = wand;
    });

    this._hubConnection?.start().then(() => this.fullfilled(), () => this.regected());
  }

  fullfilled() {
    console.log('fullfilled');
    this._OnLoaded();
  }

  regected() {
    console.log('regected');
  }

  private _OnLoaded() {
    this._hubConnection?.invoke('GetVotingStatus').then((value) => {
      if (!value)
        return;

      this._totalCloak = value.cloak;
      this._totalStone = value.stone;
      this._totalWand = value.wand;
    });
  }
}
