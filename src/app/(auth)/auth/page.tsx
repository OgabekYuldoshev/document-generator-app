"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schemas"
import type { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { client } from "@/lib/client"
import { toast } from "sonner"
import { HTTPException } from "hono/http-exception"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

type LoginFormValue = z.infer<typeof loginSchema>

export default function Page() {
  const router = useRouter()

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(value: LoginFormValue) {
    try {
      const res = await client.auth.login.$post(value)
      const values = await res.json()
      if (values.status === "ok") {
        toast.success("Login successful")
        router.refresh()
      }
    } catch (error) {
      if (error instanceof HTTPException) {
        toast.error(error.message)
      }
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  name="login"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  name="pass"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} placeholder="Enter" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            Login
          </Button>
        </CardFooter>
      </Card>
    </Form>
  )
}
