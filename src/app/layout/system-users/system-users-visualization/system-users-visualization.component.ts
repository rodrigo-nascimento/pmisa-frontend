import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { SystemUsersService } from '../../../shared/services/system-users.service';
import { SystemUsers } from '../../../shared/models/system-users.model';
import { UsersDocuments } from '../../../shared/models/system-users-documents';
import { UsersAddress } from '../../../shared/models/system-users-address';
import { UsersPhone } from '../../../shared/models/system-users-phone';

@Component({
  selector: 'app-system-users-visualization',
  templateUrl: './system-users-visualization.component.html',
  styleUrls: ['./system-users-visualization.component.scss']
})
export class SystemUsersVisualizationComponent implements OnInit {
  public token: string = localStorage.getItem('token');
  @Input() id: string;
  @Output() close: EventEmitter<any> = new EventEmitter();
  public formVisualization: FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    rg: new FormControl(null),
    cpf: new FormControl(null),
    enderecoResidencial: new FormGroup({
      zip_codeR: new FormControl(null),
      streetR: new FormControl(null),
      complementR: new FormControl(null),
      neighborhoodR: new FormControl(null),
      cityR: new FormControl(null),
      numberR: new FormControl(null),
      stateR: new FormControl(null)
    }),
    enderecoComercial: new FormGroup({
      zip_codeC: new FormControl(null),
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
  });;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private systemUsersService: SystemUsersService
  ) {


  }
  ngOnInit() {

    console.log('id ' + this.id)
    this.systemUsersService.getUser(this.id, this.token)
      .subscribe((user: SystemUsers) => {
        console.log(user.name);
        this.formVisualization.controls.name.setValue(user.name);
        this.formVisualization.controls.email.setValue(user.email);
        this.populaFormDocs(user.documents);
        this.populaFormEndereco(user.address);
        this.populaFormTelefone(user.phone);

      });

    console.log(this.formVisualization.value.name)
  }
  private populaFormDocs(docsUser): void {
    var i: number;
    for (i = 0; i < docsUser.length; i++) {
      var document: UsersDocuments = docsUser[i];

      if (document.name === "CPF") {
        this.formVisualization.controls.cpf.setValue(document.value);
      }
      if (document.name === "RG") {
        this.formVisualization.controls.rg.setValue(document.value);
      }
    }
  }

  //Endereço
  private populaFormEndereco(addressUser): void {
    var i: number;
    for (i = 0; i < addressUser.length; i++) {
      var address: UsersAddress = addressUser[i];
      if (address.name === "RESIDENCIAL") {

        this.formVisualization.get('enderecoResidencial').patchValue({
          zip_codeR: address.zip_code,
          streetR: address.street,
          numberR: address.number,
          complementR: address.complement,
          neighborhoodR: address.neighborhood,
          cityR: address.city,
          stateR: address.state
        });
      }
      if (address.name === "COMERCIAL") {
        this.formVisualization.get('enderecoComercial').patchValue({
          zip_codeC: address.zip_code,
          streetC: address.street,
          numberC: address.number,
          complementC: address.complement,
          neighborhoodC: address.neighborhood,
          cityC: address.city,
          stateC: address.state
        });
      }

    }
  }

  //Telefone 
  private populaFormTelefone(phoneUser): void {
    var i: number;
    for (i = 0; i < phoneUser.length; i++) {
      var phone: UsersPhone = phoneUser[i];

      if (phone.name === "RESIDENCIAL") {
        this.formVisualization.controls.phoneResidencial.setValue(phone.number_phone);

      } if (phone.name === "CELULAR") {
        this.formVisualization.controls.phoneCel.setValue(phone.number_phone);

      }
      if (phone.name === "RECADO") {
        this.formVisualization.controls.phoneRecado.setValue(phone.number_phone);

      }
    }
  }

  closeVisualization(): void {
    this.close.emit(null);
  }


}
