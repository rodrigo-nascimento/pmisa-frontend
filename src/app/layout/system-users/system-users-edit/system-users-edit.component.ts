import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SystemUsers } from '../../../shared/models/system-users.model';
import { SystemUsersService } from '../../../shared/services/system-users.service';
import { UsersDocuments } from '../../../shared/models/system-users-documents';
import { UsersAddress } from '../../../shared/models/system-users-address';
import { UsersPhone } from '../../../shared/models/system-users-phone';
import { Router, ActivatedRoute } from '@angular/router';
import { $$ } from 'protractor';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-edit',
  templateUrl: './system-users-edit.component.html',
  styleUrls: ['./system-users-edit.component.scss']
})
export class SystemUsersEditComponent implements OnInit {

  public token: string = localStorage.getItem('token');
  public id: string;
  public user: SystemUsers;
  public inscricao: Subscription; //queryParams retorna inscrição
  public classButtonEndR: string = "btn-primary";
  public classButtonEndC: string = "btn-primary";
  public classButtonPhoneRd: string = "btn-primary";
  public classButtonPhoneC: string = "btn-primary";
  public classButtonPhoneRe: string = "btn-primary";

  public formEditUser: FormGroup = new FormGroup({
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
    phoneResidencial: new FormControl(null),
    phoneCel: new FormControl(null),
    phoneRecado: new FormControl(null),
  });


  constructor(public route: ActivatedRoute, public router: Router, private systemUsersService: SystemUsersService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.id = queryParams['id']
      }
    );
    //console.log('ID ' + this.id);

    this.systemUsersService.getUser(this.id, this.token)
      .subscribe((userEdit: SystemUsers) => {
        this.user = userEdit;
        console.log(this.user);
        this.formEditUser.controls.name.setValue(this.user.name);
        this.formEditUser.controls.email.setValue(this.user.email);
        this.populaFormDocs(this.user.documents);
        this.populaFormEndereco(this.user.address);
        this.populaFormTelefone(this.user.phone);




      });
  }

  /* -------Pegando dados do usuario e populando o formulário ----------------- */

  //Documentos
  private populaFormDocs(docsUser): void {
    var i: number;
    for (i = 0; i < docsUser.length; i++) {
      var document: UsersDocuments = docsUser[i];

      if (document.name === "CPF") {
        this.formEditUser.controls.cpf.setValue(document.value);
      }
      if (document.name === "RG") {
        this.formEditUser.controls.rg.setValue(document.value);
      }
    }
  }

  //Endereço
  private populaFormEndereco(addressUser): void {
    var i: number;
    for (i = 0; i < addressUser.length; i++) {
      var address: UsersAddress = addressUser[i];
      if (address.name === "RESIDENCIAL") {

        this.formEditUser.get('enderecoResidencial').patchValue({
          streetR: address.street,
          numberR: address.number,
          complementR: address.complement,
          neighborhoodR: address.neighborhood,
          cityR: address.city,
          stateR: address.state
        });
        this.formEditUser.controls.zip_codeR.setValue(address.zip_code);

      }
      if (address.name === "COMERCIAL") {
        this.formEditUser.get('enderecoComercial').patchValue({
          streetC: address.street,
          numberC: address.number,
          complementC: address.complement,
          neighborhoodC: address.neighborhood,
          cityC: address.city,
          stateC: address.state
        });
        this.formEditUser.controls.zip_codeC.setValue(address.zip_code);
      }

    }
  }

  //Telefone 
  private populaFormTelefone(phoneUser): void {
    var i: number;
    for (i = 0; i < phoneUser.length; i++) {
      var phone: UsersPhone = phoneUser[i];

      if (phone.name === "RESIDENCIAL") {
        this.formEditUser.controls.phoneResidencial.setValue(phone.number_phone);

      } if (phone.name === "CELULAR") {
        this.formEditUser.controls.phoneCel.setValue(phone.number_phone);

      }
      if (phone.name === "RECADO") {
        this.formEditUser.controls.phoneRecado.setValue(phone.number_phone);

      }
    }
  }
  ngOnDestroy() {
  }

  /* ------------------------- Validação CPF e EMAIL ------------------------------ */

  public validaAtributos(campo: string): void {

    let objectField: object;

    if (campo != '') {
      if (campo === 'email') {
        objectField = {
          "campo": "email",
          "valor": this.formEditUser.value.email
        }
      } else if (campo === 'cpf') {
        console.log('cpf')
        objectField = {
          "campo": "CPF",
          "valor": this.formEditUser.value.cpf
        }
      }

      this.systemUsersService.validateFields(objectField, this.token)
        .subscribe((apiResponse: SystemUsers) => {
          console.log(apiResponse)

          if ((apiResponse.length > 0)) {


            alert(' Já cadastrado no sistema, informe um valor válido');

            if (campo === 'email') {
              this.formEditUser.controls.email.setValue('');
            } else if (campo === 'cpf') {
              this.formEditUser.controls.cpf.setValue('');
            }

          }


        }, (error: any) => {

          console.log(error);

        });

    }
  }

  /* ----------------------------------- Telefones ------------------------ */

  public phoneButtonControl(icon: string, btn: string, campo: string) {

    const btnPhone = document.getElementById(btn);
    const btnIcon = document.getElementById(icon);
    console.log(btn)
    console.log(campo)

    if (btnPhone.className == "btn btn-primary") {
      btnPhone.className = "btn btn-danger";
      btnIcon.className = "fa fa-times";
      this.validationPhoneOn(campo);
    } else if (btnPhone.className == "btn btn-danger") {
      btnPhone.className = "btn btn-primary";
      btnIcon.className = "fa fa-pencil"
      this.validationPhoneOff(campo);
    }


  }
  private validationPhoneOn(campo: string): void {

    const phone = this.formEditUser.get(campo);
    phone.enable();
    phone.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(11)]);
    phone.updateValueAndValidity();
  }

  private validationPhoneOff(campo: string): void {

    const phone = this.formEditUser.get(campo);
    phone.setValue(null);
    phone.disable();
    phone.clearValidators();
    phone.updateValueAndValidity();
  }

  /*  ---------------------- Endereços -------------------------------*/

  public buscaCep(btn): void {

    console.log('btn' + btn);
    const btnCep = document.getElementById(btn);

    var cep: string = "";

    if (btnCep.className == 'btn btn-primary') {
      if (btn == 'btnBuscaCepR') {
        cep = this.formEditUser.value.zip_codeR;

      } else if (btn == 'btnBuscaCepC') {
        cep = this.formEditUser.value.zip_codeC;
      }

      cep = cep.replace(/\D/g, ''); // tirando tudo q é letra
      if (cep != "") {
        var validaCep = /^[0-9]{8}$/;

        if (validaCep.test(cep)) { // api angular testa regex
          this.systemUsersService.findCep(cep).subscribe((dados: object) => {

            if (!("erro" in dados)) {
              if (btn == 'btnBuscaCepR') { // endereço residencial
                this.populaDadosForm(dados, 0);
                this.classButtonEndR = "btn-danger";
              } else if (btn == 'btnBuscaCepC') { // endereço comercial
                this.populaDadosForm(dados, 1);
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
      } else if (btn == 'btnBuscaCepC') {
        this.classButtonEndC = "btn-primary";

      }
    }
  }

  private populaDadosForm(dados, n): void {

    if (n == 0) {//endereço residencial
      this.formEditUser.get('enderecoResidencial').patchValue({
        streetR: dados.logradouro,
        complementR: dados.complemento,
        neighborhoodR: dados.bairro,
        cityR: dados.localidade,
        stateR: dados.uf,
      });
      this.formEditUser.patchValue({
        zip_codeR: dados.cep
      });

    } else if (n == 1) {//endereço comercial
      this.formEditUser.get('enderecoComercial').patchValue({
        streetC: dados.logradouro,
        complementC: dados.complemento,
        neighborhoodC: dados.bairro,
        cityC: dados.localidade,
        stateC: dados.uf,
      });
      this.formEditUser.patchValue({
        zip_codeC: dados.cep
      });
    }

  }
  /* -------------------------------- Submissão ------------------------------------- */

  public onSubmitEditUser(): void {

    let phoneR: string = this.formEditUser.value.phoneResidencial;
    let phoneC: string = this.formEditUser.value.phoneCel;
    let phoneRe: string = this.formEditUser.value.phoneRecado;

    var phones: Array<UsersPhone> = new Array();
    var address: Array<UsersAddress> = new Array();
    const endR = this.formEditUser.get('enderecoResidencial');
    const endC = this.formEditUser.get('enderecoComercial');

    if ((phoneR = phoneR.trim()) != "") {
      phones.push(<UsersPhone>{ name: "RESIDENCIAL", number_phone: phoneR});

    }

    if ((phoneC = phoneC.trim()) != "") {
      phones.push(<UsersPhone>{ name: "CELULAR", number_phone: phoneC});

    }
    if ((phoneRe = phoneRe.trim()) != "") {
      phones.push(<UsersPhone>{ name: "RECADO", number_phone: phoneRe });
    }
   // if (endR.enabled) {
      address.push({
        name: "RESIDENCIAL",
        street: endR.get('streetR').value,
        number: endR.get('numberR').value,
        complement: endR.get('complementR').value,
        neighborhood: endR.get('neighborhoodR').value,
        zip_code: this.formEditUser.get('zip_codeR').value,
        city: endR.get('cityR').value,
        state: endR.get('stateR').value
      });
      console.log(address)


  //  }
  //  if (endC.enabled) {
      address.push({
        name: "COMERCIAL",
        street: endC.get('streetC').value,
        number: endC.get('numberC').value,
        complement: endC.get('complementC').value,
        neighborhood: endC.get('neighborhoodC').value,
        zip_code: this.formEditUser.get('zip_codeC').value,
        city: endC.get('cityC').value,
        state: endC.get('stateC').value
      });

      console.log(address)
    //}



    this.user.name = this.formEditUser.value.name,
      this.user.email = this.formEditUser.value.email;
    this.user.documents = [
      { name: "CPF", value: this.formEditUser.value.cpf },
      { name: "RG", value: this.formEditUser.value.rg }
    ];
    this.user.address = address;
    this.user.phone = phones;



    console.log(this.user)
    this.systemUsersService.editUser(this.user, this.token)
      .subscribe((apiResponse: SystemUsers) => {
        console.log(apiResponse);
        alert('Usuário editado com sucesso!');
        this.router.navigateByUrl('/system-users/systemUsersList');
      }, (error: any) => {

        console.log(error);

        if (error._body === '{"errors":["Erro ao editar o usuário."]}') {

        }

      });
  }





}
