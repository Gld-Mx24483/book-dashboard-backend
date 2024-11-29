//src/auth/jwt.strategy.ts
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
      })
    });
  }

  async validate(payload: any) {
    this.logger.log('JWT Payload:', JSON.stringify(payload, null, 2));

    try {
      // Extract user details from the payload
      const { 
        sub: auth0Id, 
        email, 
        name, 
        picture 
      } = payload;

      // If no email is present, generate a fallback
      const userEmail = email || `${auth0Id}@auth0.temp`;

      // Find or create user in the database
      const user = await this.userService.findOrCreateUser(
        auth0Id, 
        userEmail, 
        name, 
        picture
      );

      return { 
        userId: user.id,
        auth0Id: user.auth0Id,
        email: user.email,
        roles: user.roles || []
      };
    } catch (error) {
      this.logger.error('User validation error', error);
      throw error;
    }
  }
}