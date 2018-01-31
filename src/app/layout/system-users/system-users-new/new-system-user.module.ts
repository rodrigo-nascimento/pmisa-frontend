import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSystemUserComponent } from './new-system-user.component';
import { NewSystemUserRoutingModule } from './new-system-user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SystemUsersService } from '../../../shared/services/system-users.service';
import { TabsComponent } from '../../bs-component/components/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import {NgxMaskModule} from 'ngx-mask';
import { MaskService } from '../../../shared/services/mask-forms.service';


@NgModule({
  imports: [
    CommonModule,
    NewSystemUserRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgxMaskModule.forRoot(),
    HttpModule
  ],
  declarations: [NewSystemUserComponent, TabsComponent],
  
  providers:[SystemUsersService, MaskService]
  // providers : fornecedor -> serviço fornecedor 
})
export class NewSystemUserModule { }
