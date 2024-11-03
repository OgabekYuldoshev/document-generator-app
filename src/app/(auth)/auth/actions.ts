"use server"

import { db, type MetaUser } from "@/lib/db";
import { createToken, verifyToken } from "@/lib/jwt";
import type { loginSchema } from "@/schemas";
import type { JWTPayload } from "jose";
import { cookies } from "next/headers";
import type { z } from "zod";

export async function loginAction(values: z.infer<typeof loginSchema>) {
  try {
    const meta = await db.getMeta()
    const user = await meta.users.find((user) => user.login === values.login)
    if (!user) return { success: false, message: 'Incorrect password or login' }
    const { pass, ...userWithoutPass } = user

    if (pass !== values.pass) return { success: false, message: 'Incorrect password or login' }

    const token = await createToken(userWithoutPass)
    const cookieStore = await cookies()

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
    })

    return { success: true, message: 'Logged in successfully' }

  } catch (error) {
    console.error(error)
    return { success: false, message: "Internal error" }
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies()

    cookieStore.delete('token')

    return { success: true, message: "Logout successfully" }
  } catch (error) {
    console.log(error)
    return { success: false, message: "Internal Error" }
  }
}

export async function getSessionAction() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (!token) return { success: false, session: null }

    const session = await verifyToken(token.value) as JWTPayload & Omit<MetaUser, 'pass'>

    return { success: true, session }

  } catch (error) {
    console.log(error)
    await logoutAction()
    return { success: false, session: null }
  }
} 