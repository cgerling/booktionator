import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'access', loadChildren: 'app/access/acess.module#AccessModule' },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
  {
    path: 'book', loadChildren: 'app/book/book.module#BookModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard], canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
