import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetComponent } from './planet/planet.component';
import { SolarSystemComponent } from './solar-system/solar-system.component';

const routes: Routes = [
  { path: '', redirectTo: '/system', pathMatch: 'full' },
  { path: 'system', component: SolarSystemComponent },
  { path: 'planet/:id', component: PlanetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
