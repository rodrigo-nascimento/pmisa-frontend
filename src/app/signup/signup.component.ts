import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { SystemUsers } from './../shared/models/system-users.model';
import { SystemUsersService } from '../shared/services/system-users.service';
import { SystemLogin } from '../shared/models/system-login.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()],
    providers: [SystemUsersService]
})
export class SignupComponent implements OnInit {
    constructor(public router: Router, private systemUsersService: SystemUsersService) { }

    public apiUser: SystemLogin;
    public token: string;
    public errorRegister: boolean;

    public registerForm: FormGroup = new FormGroup({
        'name': new FormControl(null, [Validators.required, Validators.pattern(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/)]),
        'cpf': new FormControl(null, [Validators.required, Validators.pattern(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)]),
        'email': new FormControl(null, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]),
        'password': new FormControl(null, [Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,16})/)]),
        'confirmPassword': new FormControl(null, [Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,16})/)])
    });

    ngOnInit() { }

    public loginUser(): void {
        this.router.navigateByUrl('/login');
    }

    public validaAtributos(campo: string): void {
        console.log(campo)
        let objectField: object;

        if (campo != '') {
            if (campo === 'email') {
                objectField = {
                    "campo": "email",
                    "valor": this.registerForm.value.email
                }
            } else if (campo === 'cpf') {
                console.log('cpf')
                objectField = {
                    "campo": "CPF",
                    "valor": this.registerForm.value.cpf
                }
            }

            this.systemUsersService.validateFields(objectField, this.token)
                .subscribe((apiResponse: SystemUsers) => {
                    console.log(apiResponse)

                    if ((apiResponse.length > 0)) {


                        alert(' Já cadastrado no sistema, informe um valor válido');

                        if (campo === 'email') {
                            this.registerForm.controls.email.setValue('');
                        } else if (campo === 'cpf') {
                            this.registerForm.controls.cpf.setValue('');
                        }

                    }


                }, (error: any) => {

                    console.log(error);

                });

        }
    }
    public registerUsers(): void {

        const systemLogin: SystemLogin = new SystemLogin(
            this.registerForm.value.name,
            this.registerForm.value.cpf,
            this.registerForm.value.email,
            this.registerForm.value.password,
            this.registerForm.value.confirmPassword,
            '',
            true
        );

        this.systemUsersService.registerUsers(systemLogin)
            .subscribe((apiResponse: SystemLogin) => {

                this.apiUser = apiResponse;
                localStorage.setItem('email', this.apiUser.email);
                localStorage.setItem('name', this.apiUser.name);
                localStorage.setItem('token', this.apiUser.token);
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigateByUrl('/dashboard');

            }, (error: any) => {

                console.log(error);

                if (error._body === '{"errors":["Usuário já cadastrado."]}') {
                    this.errorRegister = true;
                }

            });

    }

}
