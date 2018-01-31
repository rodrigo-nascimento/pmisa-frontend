import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemUsersHomeComponent } from './system-users-home.component';


const routes: Routes = [
    {
        path: '', component: SystemUsersHomeComponent,
     
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemUsersHomeRoutingModule { }
