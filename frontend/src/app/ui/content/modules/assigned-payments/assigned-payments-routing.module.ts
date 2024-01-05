import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SesionIniciadaGuard } from 'src/app/core/guards/sesion-iniciada.guard';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { AssignedPaymentsPage } from './assigned-payments.component';

const routes: CustomRoutes = [
  {
    path: '',
    canActivate: [SesionIniciadaGuard],
    component: AssignedPaymentsPage,
    data: {
      webtitle: 'Asignaciones Institucionales | San Market',
      webdescription: 'Pagos asignados...',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedPaymentsRoutingModule { }
