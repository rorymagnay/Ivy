"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { signIn } from "next-auth/react"
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
import { Label } from "@/components/ui/label"
import { Mail, KeyRound, ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "Authentication failed",
          description: "Please check your email and password",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Login successful!",
          description: "Welcome back to IVY",
        })
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    
    try {
      const result = await signIn("credentials", {
        email: "demo@example.com",
        password: "demo12345",
        redirect: false,
      })
      
      toast({
        title: "Demo login successful!",
        description: "You're now using the demo account",
      })
      
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Demo login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
        <Image src="/logo.svg" width={32} height={32} alt="Logo" />
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">IVY</span>
      </Link>
      
      <Card className="w-full max-w-md shadow-lg border-0 shadow-blue-100 dark:shadow-none">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full gradient-bg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                <>
                  Log in <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            Demo Account
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 