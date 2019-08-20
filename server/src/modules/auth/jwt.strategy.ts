/**
 * Auth jwt.strategy.
 * @file 鉴权器
 * @module module/auth/jwt.strategy
 * @author Surmon <https://github.com/surmon-china>
 */

import * as APP_CONFIG from '@server/app.config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpUnauthorizedError } from '@server/errors/unauthorized.error';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: APP_CONFIG.AUTH.jwtTokenSecret,
    });
  }

  validate(payload: any) {
    const data = this.authService.validateAuthData(payload);
    if (data) {
      return data;
    } else {
      throw new HttpUnauthorizedError();
    }
  }
}