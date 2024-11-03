import { db } from "@/lib/db";
import { router } from "../__internals/router";
import { baseProcedure } from "../procedures";
import { loginSchema } from "@/schemas";
import { HTTPException } from "hono/http-exception";
import { createToken } from "@/lib/jwt";
import { cookies } from 'next/headers'

export const authRouter = router({
  login: baseProcedure.input(loginSchema).mutation(async ({ c, input }) => {
    const meta = await db.getMeta()

    const user = await meta.users.find((user) => user.login === input.login)

    if (!user) {
      throw new HTTPException(404, {
        message: "Incorrect password or login",
      })
    }
    const { pass, ...userWithoutPass } = user

    if (pass !== input.pass) {
      throw new HTTPException(401, {
        message: "Incorrect password or login",
      })
    }

    const token = await createToken(userWithoutPass)

    const cookieStore = await cookies()

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    })

    return c.superjson({
      status: "ok",
    })
  })
})