import { Component, OnInit } from '@angular/core';
import {User} from "../model/User";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = new User();

  constructor() { }

  ngOnInit() {
  }

}
