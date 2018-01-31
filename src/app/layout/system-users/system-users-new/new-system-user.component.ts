
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SystemUsers } from '../../../shared/models/system-users.model';
//importação da classe de serviço
import { SystemUsersService } from '../../../shared/services/system-users.service';
import { UsersDocuments } from '../../../shared/models/system-users-documents';
import { UsersPhone } from '../../../shared/models/system-users-phone';
import { UsersAddress } from '../../../shared/models/system-users-address';
import { INVALID, DISABLED, FormArray } from '@angular/forms/src/model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { error, IButton } from 'selenium-webdriver';
import { ButtonsComponent } from '../../bs-component/components/index';
import { Options } from 'selenium-webdriver/opera';
import { RequiredValidator } from '@angular/forms/src/directives/validators';
import { MaskService } from '../../../shared/services/mask-forms.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-system-user.component.html',
  styleUrls: ['./new-system-user.component.scss']
})
export class NewSystemUserComponent implements OnInit {


  public tel: UsersPhone;

  public token: string = localStorage.getItem('token');
  public classButtonEndR: string = "btn-primary";
  public classButtonEndC: string = "btn-primary";
  public classButtonPhoneRd: string = "btn-primary";
  public classButtonPhoneC: string = "btn-primary";
  public classButtonPhoneRe: string = "btn-primary";
  public formNewUser;
  private idPhoneAtual = 0;
  public phones = [];

  constructor(private router: Router, private systemUsersService: SystemUsersService, private maskService : MaskService) {
    this.formNewUser = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)], ),
      rg: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11),
      Validators.pattern(/^[0-9]{11}$/)]),
      zip_codeR: new FormControl(null),
      enderecoResidencial: new FormGroup({
        streetR: new FormControl(null),
        complementR: new FormControl(null),
        neighborhoodR: new FormControl(null),
        cityR: new FormControl(null),
        numberR: new FormControl(null),
        stateR: new FormControl(null)
      }),
      zip_codeC: new FormControl(null),
      enderecoComercial: new FormGroup({
        streetC: new FormControl(null),
        complementC: new FormControl(null),
        neighborhoodC: new FormControl(null),
        cityC: new FormControl(null),
        numberC: new FormControl(null),
        stateC: new FormControl(null)
      }),
      phones: new FormGroup({})
    });
  }
  // injeção de dependencia feita no construtor 


  ngOnInit() {

    this.validationEndROff();
    this.validationEndCOff();


  }


  getMask(typeField): string{
      return this.maskService.getMask(typeField);
  }
  /* ------------------------- Validação CPF e EMAIL ------------------------------ */

  public validaAtributos(campo: string): void {

    let objectField: object;

    if (campo != '') {
      if (campo === 'email') {
        objectField = {
          "campo": "email",
          "valor": this.formNewUser.value.email
        }
      } else if (campo === 'cpf') {
        console.log('cpf')
        objectField = {
          "campo": "CPF",
          "valor": this.formNewUser.value.cpf
        }
      }

      this.systemUsersService.validateFields(objectField, this.token)
        .subscribe((apiResponse: SystemUsers) => {
          console.log(apiResponse)

          if ((apiResponse.length > 0)) {


            alert(' Já cadastrado no sistema, informe um valor válido');

            if (campo === 'email') {
              this.formNewUser.controls.email.setValue('');
            } else if (campo === 'cpf') {
              this.formNewUser.controls.cpf.setValue('');
            }

          }


        }, (error: any) => {

          console.log(error);

        });

    }
  }

  /* ----------------------------------- Telefones ------------------------ */

  public newinputTel(): any {

    var novoInput = document.createElement("input");
    novoInput.setAttribute("class", "form-control input-underline input-sm");
    novoInput.setAttribute("id", "inputReadPhone" + this.idPhoneAtual);

    return novoInput;
  }
  removePhoneOfForm(phone) {
    console.log('testando' + phone.name)

    console.log(this.phones);
    for (var i = 0; i < this.phones.length && this.phones[i].name != phone.name; i++);
    console.log('index' + i);
    this.phones.splice(i, 1);
    console.log(this.phones);
    this.formNewUser.get("phones").removeControl(phone.name);
    console.log(this.formNewUser.value);

  }

  public addPhoneToForm(phoneType): void {

    if (phoneType != "INVALID") {
      this.phones.push({
        name: "phone" + this.idPhoneAtual,
        type: phoneType
      }
      );
      this.formNewUser.get("phones").addControl('phone' + this.idPhoneAtual, new FormControl(null));
      this.idPhoneAtual = this.idPhoneAtual + 1;
      console.log(this.formNewUser.value);
    }


  }


  /*  public phoneButtonControl(btn: string, campo: string) {
 
     const btnPhone = document.getElementById(btn);
     console.log(btn)
     console.log(campo)
 
 
     if (btnPhone.className == 'btn btn-primary') {
 
       if (btn == 'btnPhoneResidencial') {
         this.classButtonPhoneRd = "btn-danger";
       } else if (btn == 'btnPhoneCelular') {
         this.classButtonPhoneC = "btn-danger";
       } else if (btn == 'btnPhoneRecado') {
         this.classButtonPhoneRe = "btn-danger";
       }
       this.validationPhoneOn(campo);
 
     } else {
       if (btn == 'btnPhoneResidencial') {
         this.classButtonPhoneRd = "btn-primary";
       } else if (btn == 'btnPhoneCelular') {
         this.classButtonPhoneC = "btn-primary";
       } else if (btn == 'btnPhoneRecado') {
         this.classButtonPhoneRe = "btn-primary";
       }
 
       this.validationPhoneOff(campo);
     }
 
   }
   private validationPhoneOn(campo: string): void {
 
     const phone = this.formNewUser.get(campo);
     phone.enable();
     phone.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(11)]);
     phone.updateValueAndValidity();
   }
 
   private validationPhoneOff(campo: string): void {
 
     const phone = this.formNewUser.get(campo);
     phone.setValue(null);
     phone.disable();
     phone.clearValidators();
     phone.updateValueAndValidity();
   }
  */
  /*  ---------------------- Endereços -------------------------------*/
  public buscaCep(btn): void {

    console.log('btn' + btn);
    const btnCep = document.getElementById(btn);

    var cep: string = "";

    if (btnCep.className == 'btn btn-primary') {
      if (btn == 'btnBuscaCepR') {
        cep = this.formNewUser.value.zip_codeR;

      } else if (btn == 'btnBuscaCepC') {
        cep = this.formNewUser.value.zip_codeC;
      }

      cep = cep.replace(/\D/g, '');
      // tirando tudo q é letra

      if (cep != "") {
        var validaCep = /^[0-9]{8}$/;

        if (validaCep.test(cep)) { // api angular testa regex
          this.systemUsersService.findCep(cep).subscribe((dados: object) => {

            if (!("erro" in dados)) {
              if (btn == 'btnBuscaCepR') { // endereço residencial
                this.populaDadosForm(dados, 0);
                this.validationEndROn();
                this.classButtonEndR = "btn-danger";
              } else if (btn == 'btnBuscaCepC') { // endereço comercial
                this.populaDadosForm(dados, 1);
                this.validationEndCOn();
                this.classButtonEndC = "btn-danger";
              }

            } else {
              alert('Erro ao buscar o cep!');
            }
          });
        } else {
          alert('Cep Inválido!');
        }
      }

    } else {
      if (btn == 'btnBuscaCepR') {
        this.classButtonEndR = "btn-primary";
        this.validationEndROff();
      } else if (btn == 'btnBuscaCepC') {
        this.classButtonEndC = "btn-primary";
        this.validationEndCOff();

      }
    }
  }

  private populaDadosForm(dados, n): void {

    if (n == 0) {//endereço residencial
      this.formNewUser.get('enderecoResidencial').patchValue({
        streetR: dados.logradouro,
        complementR: dados.complemento,
        neighborhoodR: dados.bairro,
        cityR: dados.localidade,
        stateR: dados.uf,
      });
      this.formNewUser.patchValue({
        zip_codeR: dados.cep
      });

    } else if (n == 1) {//endereço comercial
      this.formNewUser.get('enderecoComercial').patchValue({
        streetC: dados.logradouro,
        complementC: dados.complemento,
        neighborhoodC: dados.bairro,
        cityC: dados.localidade,
        stateC: dados.uf,
      });
      this.formNewUser.patchValue({
        zip_codeC: dados.cep
      });
    }

  }
  /*  ----------------------- Endereço Residencial ------------------------------ */
  private validationEndROff(): void {
    const endR = this.formNewUser.get('enderecoResidencial');
    endR.disable();

    endR.setValue({
      streetR: null,
      complementR: null,
      neighborhoodR: null,
      numberR: null,
      cityR: null,
      stateR: null,
    });
    this.formNewUser.patchValue({
      zip_codeR: null
    });
    this.formNewUser.controls.zip_codeR.enable();
    endR.clearValidators();
    this.updateEndR();
  }

  private validationEndROn(): void {

    const endR = this.formNewUser.get('enderecoResidencial');
    endR.enable();
    endR.get('streetR').setValidators([Validators.required, Validators.minLength(5)]);
    endR.get('complementR').setValidators([Validators.required, Validators.minLength(3)]);
    endR.get('neighborhoodR').setValidators([Validators.required, Validators.minLength(5)]);
    endR.get('cityR').setValidators([Validators.required]);
    endR.get('numberR').setValidators([Validators.required, Validators.minLength(1)]);
    endR.get('stateR').setValidators([Validators.required]);

    endR.get('cityR').disable();
    endR.get('stateR').disable();

    this.formNewUser.controls.zip_codeR.disable();
    this.updateEndR();
    // lançando evento sobre os campos pois o set Validators nao lança evento
    console.log(endR.get('streetR').validator);

  }

  private updateEndR(): void {
    const endR = this.formNewUser.get('enderecoResidencial')
    endR.get('streetR').updateValueAndValidity();
    endR.get('complementR').updateValueAndValidity();
    endR.get('neighborhoodR').updateValueAndValidity();
    endR.get('cityR').updateValueAndValidity();
    endR.get('numberR').updateValueAndValidity();
    endR.get('stateR').updateValueAndValidity();

  }

  /* --------------------------- Endereço Comercial----------------------- */

  private validationEndCOff(): void {
    const endC = this.formNewUser.get('enderecoComercial');
    endC.disable();

    endC.setValue({
      streetC: null,
      complementC: null,
      neighborhoodC: null,
      numberC: null,
      cityC: null,
      stateC: null,

    });
    this.formNewUser.patchValue({
      zip_codeC: null
    });
    this.formNewUser.controls.zip_codeC.enable();
    endC.clearValidators();
    this.updateEndC();
  }

  private validationEndCOn(): void {

    const endC = this.formNewUser.get('enderecoComercial');
    endC.enable();
    endC.get('streetC').setValidators([Validators.required, Validators.minLength(5)]);
    endC.get('complementC').setValidators([Validators.required, Validators.minLength(3)]);
    endC.get('neighborhoodC').setValidators([Validators.required, Validators.minLength(5)]);
    endC.get('cityC').setValidators([Validators.required]);
    endC.get('numberC').setValidators([Validators.required, Validators.minLength(1)]);
    endC.get('stateC').setValidators([Validators.required]);


    endC.get('cityC').disable();
    endC.get('stateC').disable();
    this.formNewUser.controls.zip_codeC.disable();
    this.updateEndC();
    // lançando evento sobre os campos pois o set Validators nao lança evento
  }
  private updateEndC(): void {
    const endC = this.formNewUser.get('enderecoComercial')
    endC.get('streetC').updateValueAndValidity();
    endC.get('complementC').updateValueAndValidity();
    endC.get('neighborhoodC').updateValueAndValidity();
    endC.get('cityC').updateValueAndValidity();
    endC.get('numberC').updateValueAndValidity();
    endC.get('stateC').updateValueAndValidity();
  }

  /* -------------------------------- Submissão ------------------------------------- */

  public onSubmit(): void {


    var phones: Array<UsersPhone> = new Array();
    var address: Array<UsersAddress> = new Array();
    const endR = this.formNewUser.get('enderecoResidencial');
    const endC = this.formNewUser.get('enderecoComercial');

    if (this.formNewUser.controls.phoneResidencial.enabled) {
      phones.push(<UsersPhone>{ name: "RESIDENCIAL", number_phone: this.formNewUser.get('phoneResidencial').value });

    }

    if (this.formNewUser.controls.phoneCel.enabled) {
      phones.push(<UsersPhone>{ name: "CELULAR", number_phone: this.formNewUser.get('phoneCel').value });

    }
    if (this.formNewUser.controls.phoneRecado.enabled) {
      phones.push(<UsersPhone>{ name: "RECADO", number_phone: this.formNewUser.get('phoneRecado').value });
    }
    if (endR.enabled) {
      address.push({
        name: "RESIDENCIAL",
        street: endR.get('streetR').value,
        number: endR.get('numberR').value,
        complement: endR.get('complementR').value,
        neighborhood: endR.get('neighborhoodR').value,
        zip_code: this.formNewUser.get('zip_codeR').value,
        city: endR.get('cityR').value,
        state: endR.get('stateR').value
      });
      console.log(address)

    }
    if (endC.enabled) {
      address.push({
        name: "COMERCIAL",
        street: endC.get('streetC').value,
        number: endC.get('numberC').value,
        complement: endC.get('complementC').value,
        neighborhood: endC.get('neighborhoodC').value,
        zip_code: this.formNewUser.get('zip_codeC').value,
        city: endC.get('cityC').value,
        state: endC.get('stateC').value
      });

      console.log(address)
    }

    var newUser: SystemUsers = new SystemUsers(

      this.formNewUser.value.name,
      this.formNewUser.value.email,
      this.formNewUser.value.login,
      this.formNewUser.value.password,
      '',
      [
        { name: "CPF", value: this.formNewUser.value.cpf },
        { name: "RG", value: this.formNewUser.value.rg }
      ],
      address,
      phones

    );

    this.systemUsersService.registerUsersAdm(newUser, this.token)
      .subscribe((apiResponse: SystemUsers) => {
        console.log(apiResponse);
        alert('Usuário Cadastrado com sucesso!');
        this.router.navigateByUrl('/system-users/systemUsersHome'); //ROTEAMENTO
      }, (error: any) => {

        console.log(error);

        if (error._body === '{"errors":["Usuário já cadastrado."]}') {

        }

      });

  }


}
