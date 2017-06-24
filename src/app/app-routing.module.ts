import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'access', loadChildren: 'app/access/acess.module#AccessModule' },
  { path: 'book', loadChildren: 'app/book/book.module#BookModule' },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
  { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
