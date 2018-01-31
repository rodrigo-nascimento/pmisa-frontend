import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemUsersVisualizationComponent } from './system-users-visualization.component';
import { SystemUsersVisualizationRoutingModule } from './system-users-visualization-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SystemUsersVisualizationRoutingModule,
    NgbModule.forRoot()
    
  ],
  declarations: [SystemUsersVisualizationComponent]
})
export class SystemUsersVisualizationModule { }
