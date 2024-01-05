import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { CatalogoItemsModule } from './catalogo/catalogo-items/catalogo-items.module';
import { AuthModule } from './auth/auth.module';
import { CatalogoGruposModule } from './catalogo/catalogo-grupos/catalogo-grupos.module';
import { CarritoModule } from './carrito/carrito.module';
import { PersonasModule } from './personas/personas.module';
import { CatalogoMaestrosModule } from './catalogo/maestros/catalogo-maestros.module';
import { PagosModule } from './pagos/pagos.module';
import { MaestrosModule } from './maestros/maestros.module';
import { DeudasModule } from './deudas/deudas.module';
import { PerfilesModule } from './perfiles/perfiles.module';

@Module({
  imports: [
    HealthModule,
    CatalogoItemsModule,
    CatalogoGruposModule,
    CarritoModule,
    AuthModule,
    PersonasModule,
    CatalogoMaestrosModule,
    PagosModule,
    MaestrosModule,
    DeudasModule,
    PerfilesModule,
  ],
})
export class CoreModule {}
