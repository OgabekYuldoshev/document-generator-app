import 'server-only'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY || '');

export async function createToken(payload: JWTPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + 24 * 60 * 60 * 1000))
    .sign(secret);
  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Invalid token', error);
    throw new Error('Token verification failed');
  }
}
