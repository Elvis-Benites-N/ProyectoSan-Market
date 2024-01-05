import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('refresh-jwt') {
  constructor() {
    super({
      property: 'refresh',
    });
  }
}
