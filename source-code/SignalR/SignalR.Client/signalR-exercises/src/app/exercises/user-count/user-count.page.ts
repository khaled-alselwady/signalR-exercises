import {Component, inject, OnInit} from '@angular/core';
import {UserCountService} from "../../services/user-count.service";

@Component({
  selector: 'app-user-count',
  standalone: false,
  templateUrl: './user-count.page.html',
  styleUrls: ['./user-count.page.scss'],
})
export class UserCountPage implements OnInit {
  private _userCountService = inject(UserCountService);
  get totalViews(){
    return this._userCountService.totalViews;
  }

  get totalUsers(){
    return this._userCountService.totalUsers;
  }

  ngOnInit() {
  }

}
