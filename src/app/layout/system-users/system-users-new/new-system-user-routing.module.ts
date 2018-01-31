import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSystemUserComponent} from './new-system-user.component';



const routes: Routes = [
    {
        path: '', component: NewSystemUserComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewSystemUserRoutingModule { }
