import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'',
  pathMatch:'full',
  redirectTo:'vehiculos'
},{
  path:'vehiculos',
  loadChildren:()=>
    import('./components/vehiculo/vehiculo.module').then((m)=>m.VehiculoModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
