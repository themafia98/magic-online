export enum jwtConfig {
  SECRET = 'magicJwtKey',
}

export const signOptions = { expiresIn: '60s' };
