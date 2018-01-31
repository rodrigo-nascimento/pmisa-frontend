import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemUsersListComponent } from './system-users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
    {
        path: '', component: SystemUsersListComponent,
     
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemUsersListRoutingModule { }
