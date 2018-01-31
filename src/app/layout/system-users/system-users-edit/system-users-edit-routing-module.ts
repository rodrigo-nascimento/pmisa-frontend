import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemUsersEditComponent } from './system-users-edit.component';



const routes: Routes = [
    {
        path: '', component: SystemUsersEditComponent,
     
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemUsersEditRoutingModule { }
