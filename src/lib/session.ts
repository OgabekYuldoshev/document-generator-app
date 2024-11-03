import 'server-only'

import { cookies } from 'next/headers';
import { verifyToken } from './jwt';
import { JWTPayload } from 'jose';
import { MetaUser } from './db';

export async function userSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) return { success: false, session: null }

    const session = await verifyToken(token.value) as JWTPayload & Omit<MetaUser, 'pass'>

    return { success: true, session }

  } catch (error) {
    console.log(error)
    return { success: false, session: null }
  }
}