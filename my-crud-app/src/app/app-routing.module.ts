import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListDbComponent } from './components/task-list-db/task-list-db.component';

const routes: Routes = [
  {
    path:'home',
    component:TaskListComponent,
    pathMatch: 'full'
  },
  {
    path:'task-db',
    component:TaskListDbComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
