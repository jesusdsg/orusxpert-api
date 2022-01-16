import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  {path: '', redirectTo: 'crud', pathMatch: 'full'},
  { path: 'crud', component: CrudComponent, },
  { path: 'map', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
