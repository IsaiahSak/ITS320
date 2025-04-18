import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { IndexComponent } from './index/index.component';



export const routes: Routes = [
  {path: 'nav', component: NavComponent},
  {path: '', component: IndexComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
