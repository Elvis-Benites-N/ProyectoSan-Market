import { ACCESS_TOKEN_KEY, getKeyAccessKey } from '@Constants';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EncryptUtil } from '@Utils';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {

  constructor(
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AuthStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (
      !req.cookies ||
      !(ACCESS_TOKEN_KEY in req.cookies) ||
      req.cookies[ACCESS_TOKEN_KEY].length === 0
    ) {
      return null;
    }

    return req.cookies[ACCESS_TOKEN_KEY];
  }

  validate(payload: any): any {
    const { ...userData } = payload;

    delete userData['iat'];
    delete userData['exp'];

    return JSON.parse(EncryptUtil.decryptBase64(
      payload.mm,
      getKeyAccessKey()
    ));
  }
}
