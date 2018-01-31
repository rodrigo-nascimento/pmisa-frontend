import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemUsersVisualizationComponent } from './system-users-visualization.component';




const routes: Routes = [
    {
        path: '', component: SystemUsersVisualizationComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemUsersVisualizationRoutingModule { }
