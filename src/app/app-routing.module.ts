import { AdminPageComponent } from './admin-page/admin-page.component';
import { CarterFinleyComponent } from './carter-finley/carter-finley.component';
import { WalnutCreekComponent } from './walnut-creek/walnut-creek.component';
import { VenuesComponent } from './venues/venues.component';
import { PncComponent } from './pnc/pnc.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'pnc', component: PncComponent },
  { path: 'wc', component: WalnutCreekComponent },
  { path: 'cf', component: CarterFinleyComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'venues', component: VenuesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
