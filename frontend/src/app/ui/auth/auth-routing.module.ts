import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistroCompletadoGuard } from 'src/app/core/guards/registro-completado.guard';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { AuthPage } from './auth/auth.component';

const routes: CustomRoutes = [
  {
    path: '',
    component: AuthPage,
    data: {
      webtitle: 'Autenticación | San Market',
      webdescription: 'Autenticación ...',
    },
  },
  {
    path: 'registro-completado',
    data: {
      webtitle: 'Registro completado | San Market',
      webdescription: 'Registro completado ...',
    },
    canActivate: [RegistroCompletadoGuard],
    canLoad: [RegistroCompletadoGuard],
    loadComponent: () => import('./registro-completado/registro-completado.component')
      .then(c => c.RegistroCompletadoPage),
  },
  {
    path: 'verificacion',
    data: {
      webtitle: 'Verificación | San Market',
      webdescription: 'Verificación ...',
    },
    loadComponent: () => import('./verificacion/verificacion.component')
      .then(c => c.VerificacionPage),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
