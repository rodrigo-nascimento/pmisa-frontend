import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
export class MaskService {

    private maskCpf ="000.000.000-00";
    private maskPhoneResidencial="(00)0000-0000";
    private maskPhoneCelular="(00)00000-0000";
    private maskCep="00000-000";

    constructor() { }


    public getMask(typeField): string{

        if(typeField =="CPF"){
            return this.maskCpf;
        }else if(typeField =="CEP"){
            return this.maskCep;
        }else if(typeField =="RESIDENCIAL"){
            return this.maskPhoneResidencial;
        }else if(typeField =="CELULAR"){
            return this.maskPhoneCelular;
        }
    }


}
