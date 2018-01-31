import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemUsersComponent } from './system-users.component';


const routes: Routes = [
    {
        path: '', component: SystemUsersComponent,
        children: [
            { path: '', redirectTo: 'systemUsersHome' },
            { path: 'systemUsersHome', loadChildren: './system-users-home/system-users-home.module#SystemUsersHomeModule' },
            { path: 'newSystemUser', loadChildren: './system-users-new/new-system-user.module#NewSystemUserModule' },
            { path: 'systemUsersEdit', loadChildren: './system-users-edit/system-users-edit.module#SystemUsersEditModule' },
            { path: 'systemUsersList', loadChildren: './system-users-list/system-users-list.module#SystemUsersListModule' },
            { path: 'systemUsersVisualization', loadChildren: './system-users-visualization/system-users-visualization.module#SystemUsersVisualizationModule' }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemUsersRoutingModule { }
