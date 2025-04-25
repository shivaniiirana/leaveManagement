import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "abcxyz",
    });
  }

  async validate(payload: any) {
    console.log("Payload in JWT Strategy: ", payload);
    return { userId: payload.sub, userName: payload.userName  };
    
    
  }
}