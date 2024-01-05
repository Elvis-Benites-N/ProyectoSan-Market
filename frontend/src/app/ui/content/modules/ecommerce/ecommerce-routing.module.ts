import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';


const routes: CustomRoutes = [
  {
    path: '',
    data: {
      webtitle: 'Inicio | San Market',
      webdescription: 'Bievenido a San Market'
    },
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'catalogo',
    data: {
      webtitle: 'Catálogo | San Market',
      webdescription: 'Lista de bienes y servicios que ofrece la UNMSM'
    },
    loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule),
  },
  {
    path: 'grupos',
    data: {
      webtitle: 'Grupos | San Market',
      webdescription: 'Grupos de bienes y servicios que ofrece la UNMSM'
    },
    loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule),
  },
  {
    path: 'generar-ticket',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
