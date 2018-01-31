import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemUsersListComponent } from './system-users-list.component';
import { SystemUsersListRoutingModule } from './system-users-list-routing.module';
import { PageHeaderModule, StatModule } from '../../../shared/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemUsersVisualizationComponent } from '../system-users-visualization/system-users-visualization.component';


@NgModule({
  imports: [
    CommonModule,
    SystemUsersListRoutingModule,
    PageHeaderModule,
    NgbModule.forRoot(),
    StatModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  declarations: [SystemUsersListComponent, SystemUsersVisualizationComponent]
})
export class SystemUsersListModule { }
