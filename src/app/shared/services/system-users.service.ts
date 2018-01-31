import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SystemUsers } from '../models/system-users.model';
import { URL_AuthAPI, URL_OpenAPI } from '../../app.api';
import { SystemLogin } from '../models/system-login.model';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { headersToString } from 'selenium-webdriver/http';

/*
 * classe de serviços, possui métodos que realizam algum lógica -> conexão com o servidor
 * Injeção de dependencia : a linguagem ou framework, fornece uma instancia de uma classe
 * para que voce nao precise fazer a instanciação manualmente 
 */

@Injectable()
// a classe pode ser injetada em outra classe para que o uso dela possa ser feito
// serviços são injetáveis 
export class SystemUsersService {

    public systemLogin: SystemLogin;
    public systemUsers: SystemUsers;

    constructor(private http: Http) { }

    public authUsers(systemLogin: SystemLogin): Observable<SystemLogin> {

        let headers: Headers = new Headers();

        headers.append('Content-type', 'application/json');

        console.log(JSON.stringify(systemLogin));

        return this.http.post(
            `${URL_OpenAPI}/login`,
            JSON.stringify(systemLogin),
            new RequestOptions({ headers: headers }))
            .map((resposta: Response) => resposta.json());

    }

    public getUser(id: String, token: string): Observable<SystemUsers> {


        let headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', token);

        return this.http.get(
            `${URL_AuthAPI}/systemUsers/` + id,
            new RequestOptions({ headers: headers }))
            .map((resposta: Response) => resposta.json());

    }

    public registerUsers(systemLogin: SystemLogin): Observable<SystemLogin> {

        let headers: Headers = new Headers();

        headers.append('Content-type', 'application/json');

        return this.http.post(
            `${URL_OpenAPI}/signup`,
            JSON.stringify(systemLogin),
            new RequestOptions({ headers: headers }))
            .map((resposta: Response) => resposta.json());

    }

    public registerUsersAdm(systemUsers: SystemUsers, token: string): Observable<SystemUsers> {

        let headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', token);

        return this.http.post(
            `${URL_AuthAPI}/systemUsers`,
            JSON.stringify(systemUsers),
            new RequestOptions({ headers: headers }))
            .map((resposta: Response) => resposta.json());

    }

    public editUser(systemUsers: SystemUsers, token: string): Observable<SystemUsers> {


        let headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', token);

        return this.http.put(
            `${URL_AuthAPI}/systemUsers/` + systemUsers._id,
            JSON.stringify(systemUsers),
            new RequestOptions({ headers: headers }))
            .map((resposta: Response) => resposta.json());

    }


    public deleteUser(id: String, token: string): Observable<SystemUsers> {

        let headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', token);

        return this.http.delete(

            `${URL_AuthAPI}/systemUsers/` + id,

            new RequestOptions({ headers: headers }))
            .map((resposta: Response) => resposta.json());

    }


    public validateFields(objectBusca: object, token: string): Observable<SystemUsers> {
        //metodo utilizado para validação dos campos no cadastro 
        let headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', token);


        return this.http.post(
            `${URL_OpenAPI}/validateFields`,
            JSON.stringify(objectBusca),
            new RequestOptions({ headers: headers }))
            .map((resposta: Response) => resposta.json());

    }


    /* ------------------- BRASILIANO ------------------------------ */
    /**
      * O objetivo desta funcao e buscar no servidor quantos usuarios exitem
      * cadastrados e trazer esse valor para ser utilizado pela paginacao.
      *
      * @param token uma String para a validacao do usuario
      * @return quantidade de usuarios que existe no banco
      */
    public countUser(token: string): Observable<number> {

        let headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', token);

        let link = `${URL_AuthAPI}/systemUsers/count`;
        let option = new RequestOptions({ headers: headers });

        return this.http.get(link, option)
            .map((resposta: Response) => resposta.json());
    }


    /** */
    public listUsers(token: string, obj: any): Observable<SystemUsers[]> {

        let headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', token);

        let link = `${URL_AuthAPI}/systemUsers/list`;
        let body = JSON.stringify({ obj });
        let option = new RequestOptions({ headers: headers });

        return this.http.post(link, body, option)
            .map((resposta: Response) => resposta.json());
    }


    /* ****************************************************************/

    public findCep(cep: string): Observable<Object> {

         return this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .map(dados => dados.json());

            
    }

}
