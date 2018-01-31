import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { SystemUsers } from './../shared/models/system-users.model';
import { SystemUsersService } from '../shared/services/system-users.service';
import { SystemLogin } from '../shared/models/system-login.model';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
    providers: [SystemUsersService]
})
export class LoginComponent implements OnInit {

    public systemUsers: Observable<any>;
    public apiUser: SystemLogin;
    public token: string;
    public errorAuth: boolean;

    constructor(public router: Router, private systemUsersService: SystemUsersService) {}

   public loginForm: FormGroup = new FormGroup ({
    'email': new FormControl(null, [ Validators.required, Validators.pattern(/\S+@\S+\.\S+/) ] ),
    'password': new FormControl(null, [ Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,16})/) ] )
    });

    ngOnInit() {}

   public userAuth (): void {

        const systemLogin: SystemLogin = new SystemLogin(
                '',
                '',
                this.loginForm.value.email,
                this.loginForm.value.password,
                '',
                '',
                false
        );

        this.systemUsersService.authUsers(systemLogin)
        .subscribe( (apiResponse: SystemLogin) => {

            console.log(apiResponse);

            this.apiUser = apiResponse;
            localStorage.setItem('email', this.apiUser.email);
            localStorage.setItem('name', this.apiUser.name);
            localStorage.setItem('token', this.apiUser.token);
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigateByUrl('/dashboard');

        }, (error: any) => {

            console.log(error);

            if (error._body === '{"errors":["Usuário/Senha inválidos"]}') {
                this.errorAuth = true;
            } else {
                this.errorAuth = false;
            }

         });

    }

    public registerUser(): void {
        this.router.navigateByUrl('/signup');
    }

}

