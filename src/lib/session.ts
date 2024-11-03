"use server"

import { cookies } from 'next/headers';
import { verifyToken } from './jwt';
import type { JWTPayload } from 'jose';
import type { MetaUser } from './db';

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

export async function deleteSession() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('token')
    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false }
  }
}