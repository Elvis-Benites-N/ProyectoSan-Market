import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from './core/interfaces/custom-route.interface';

const routes: CustomRoutes = [
  {
    path: '',
    loadChildren: () =>
      import('./ui/content/content.module').then((m) => m.ContentModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./ui/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    data: {
      webtitle: 'Página no encontrada',
      webdescription: 'Página no encontrada',
    },
    loadComponent: () =>
      import('./ui/not-found/not-found.component').then(
        (mod) => mod.NotFoundPage
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
