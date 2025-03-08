import {Component, inject, OnInit} from '@angular/core';
import {HouseEventsService} from "../../services/house-events.service";

interface HouseGroupsSubscribers {
  Gryffindor: boolean;
  Slytherin: boolean;
  Hufflepuff: boolean;
  Ravenclaw: boolean;
}

@Component({
  selector: 'app-house-events',
  templateUrl: './house-events.page.html',
  styleUrls: ['./house-events.page.scss'],
  standalone: false
})
export class HouseEventsPage implements OnInit {
  subscriberButtons: HouseGroupsSubscribers = {
    Gryffindor: true,
    Slytherin: true,
    Hufflepuff: true,
    Ravenclaw: true
  };

  get groupsName() {
    return this.houseEventService.groupsName;
  }

  houseEventService = inject(HouseEventsService);

  constructor() {
  }

  ngOnInit() {
  }

  onSubscribe(groupName: keyof HouseGroupsSubscribers) {
    this.subscriberButtons[groupName] = !this.subscriberButtons[groupName];
    this.houseEventService.joinGroup(groupName);
  }

  onUnSubscribe(groupName: keyof HouseGroupsSubscribers) {
    this.subscriberButtons[groupName] = !this.subscriberButtons[groupName];
    this.houseEventService.leaveGroup(groupName);
  }

  onTriggerNotification(groupName: keyof HouseGroupsSubscribers) {
    this.houseEventService.triggerNotification(groupName);
  }
}
