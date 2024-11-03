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
import type { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { loginAction } from "./actions"
import { loginSchema } from "./schema"

type LoginFormValue = z.infer<typeof loginSchema>
export default function Page() {
  const router = useRouter()

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: LoginFormValue) {
    const response = await loginAction(values)
    if (response.success) {
      toast.success(response.message)
      router.refresh()
    } else {
      toast.error(response.message)
    }
  }

  return (
    <Form {...form}>
      <Card className="max-w-[500px] w-full mx-2.5">
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>
            Sign in to access your account and continue where you left off.
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
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
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  )
}
