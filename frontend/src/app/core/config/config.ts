import { InjectionToken } from '@angular/core';

export type Config = {
  readonly services: {
    readonly apigateway: {
      readonly url: string;
    };
  };
  readonly banner: {
    readonly mostrar: string;
    readonly nombre: string;
  }
};

export const APP_CONFIG: InjectionToken<Config> = new InjectionToken<Config>(
  'Application Config'
);
