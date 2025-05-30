// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // รับ token จาก header
      ignoreExpiration: false,
      secretOrKey: 'jwt_secret', // ✅ ควรใช้ process.env.JWT_SECRET ใน production
    });
  }

  async validate(payload: any) {
    // return ค่านี้จะอยู่ใน req.user ของ request ที่ผ่านการยืนยัน
    return { userId: payload.sub, username: payload.username };
  }
}
