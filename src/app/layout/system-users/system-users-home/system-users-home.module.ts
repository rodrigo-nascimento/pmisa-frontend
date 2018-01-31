import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemUsersHomeComponent } from './system-users-home.component';
import { SystemUsersHomeRoutingModule } from './system-users-home-routing.module';
import { PageHeaderModule, StatModule } from '../../../shared/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SystemUsersHomeRoutingModule,
    PageHeaderModule,
    StatModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SystemUsersHomeComponent]
})
export class SystemUsersHomeModule { }
