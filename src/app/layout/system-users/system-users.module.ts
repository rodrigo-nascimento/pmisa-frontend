import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemUsersRoutingModule } from './system-users-routing.module';
import { SystemUsersComponent } from './system-users.component';
import { PageHeaderModule } from './../../shared';
import { StatModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
      CommonModule,
      SystemUsersRoutingModule,
      PageHeaderModule,
      StatModule,
      FormsModule,
      ReactiveFormsModule
 
    ],
  declarations: [SystemUsersComponent]
})
export class SystemUsersModule { }
