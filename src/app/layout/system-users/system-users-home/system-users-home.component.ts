import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SystemUsersService } from '../../../shared/services/system-users.service';
import { SystemUsers } from '../../../shared/models/system-users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-users-home',
  templateUrl: './system-users-home.component.html',
  styleUrls: ['./system-users-home.component.scss'],
  animations: [routerTransition()],
  providers: [SystemUsersService]
})
export class SystemUsersHomeComponent implements OnInit {

  public token: string = localStorage.getItem('token');
  constructor(public router: Router, private systemUsersService: SystemUsersService) { }

  ngOnInit() {}

  public listUsers(): void {

    var count : number = 0;

    this.systemUsersService.countUser(this.token)
    .subscribe((apiResponse: number) => {
      console.log(apiResponse)
      this.router.navigate(['/system-users/systemUsersList'], {queryParams: {contador : apiResponse}});
    
    }); 

    //this.router.navigateByUrl('/system-users/systemUsersList', {queryParams: {contador : count}});

  }
  public addNewUser(): void {
    this.router.navigateByUrl('/system-users/newSystemUser'); //ROTEAMENTO

  }

}

