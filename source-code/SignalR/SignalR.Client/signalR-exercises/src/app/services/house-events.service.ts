import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

declare let toastr: any;

@Injectable({
  providedIn: 'root'
})
export class HouseEventsService {

  private _hubConnection?: signalR.HubConnection;
  private _groupsName: string = '';

  get groupsName() {
    return this._groupsName;
  }

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7156/HouseGroup', {withCredentials: true})
      .build();

    this._hubConnection?.on('subscriptionStatus', (strGroupsJoined,groupName, hasSubscribed) => {
      this._groupsName = strGroupsJoined;

      if (hasSubscribed) {
        toastr.success(`You have subscribed successfully. ${groupName}`);
      } else {
        toastr.success(`You have unsubscribed successfully. ${groupName}`);
      }

    });

    this._hubConnection?.on('subscriptionStatusForOthers', (groupName, hasSubscribed) => {
      if (hasSubscribed) {
        toastr.success(`Member has subscribed to ${groupName}.`);
      } else {
        toastr.warning(`Member has unsubscribed from ${groupName}.`);
      }

    });

    this._hubConnection?.on('triggerNotification', (groupName) => {
        toastr.success(`A new notification for ${groupName} has been launched.`);
    });

    this._hubConnection?.start().then(() => this.fullfilled(), () => this.regected());
  }

  private fullfilled() {
    console.log('fullfilled');
  }

  private regected() {
    console.log('regected');
  }

  joinGroup(groupName: string) {
    this._hubConnection?.send("JoinGroup", groupName);
  }

  leaveGroup(groupName: string) {
    this._hubConnection?.send("LeaveGroup", groupName);
  }

  triggerNotification(groupName: string) {
    this._hubConnection?.send("TriggerNotification", groupName);
  }
}
