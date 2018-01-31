import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemUsersEditComponent } from './system-users-edit.component';
import { SystemUsersEditRoutingModule } from './system-users-edit-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    SystemUsersEditRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  declarations: [SystemUsersEditComponent]
})
export class SystemUsersEditModule { }
