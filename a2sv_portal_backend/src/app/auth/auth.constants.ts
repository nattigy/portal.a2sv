export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'portal-secret',
  expiresIn: '30d',
}
