import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUsersComponent } from './components/add-users/add-users.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'add', component: AddUsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
