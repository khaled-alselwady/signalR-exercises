import {Component, inject, OnInit} from '@angular/core';
import {VotingService} from "../../services/voting.service";

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
  standalone: false
})
export class VotingPage implements OnInit {
  private _votingService = inject(VotingService);

  get cloakCount() {
    return this._votingService.totalCloak;
  }
  get stoneCount() {
    return this._votingService.totalStone;
  }
  get wandCount() {
    return this._votingService.totalWand;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
