import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { APP_CONFIG } from './app/core/config/config';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

fetch('./config/config.json?v='+new Date().getTime())
  .then((resp) => resp.json())
  .then((config) => {
    config.banner.mostrar = config.banner.mostrar === 'true';  
    platformBrowserDynamic([{ provide: APP_CONFIG, useValue: config }])
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  });
