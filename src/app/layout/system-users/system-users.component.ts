import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { Observable } from 'rxjs/Observable';

import { SystemUsers } from '../../shared/models/system-users.model';
import { SystemUsersService } from '../../shared/services/system-users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss'],
  animations: [routerTransition()],
  providers: [SystemUsersService]
})
export class SystemUsersComponent implements OnInit {


  constructor() { }

  ngOnInit() {

  }

}
