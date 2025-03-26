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
import { 
  Mail, 
  KeyRound, 
  User, 
  ArrowRight, 
  Loader2,
  CheckCircle2 
} from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      toast({
        title: "Registration successful!",
        description: data.demo 
          ? "Demo account created. Redirecting to dashboard." 
          : "Your account has been created. Signing you in...",
      })

      // Sign in the user immediately after registration
      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (signInResult?.error) {
        router.push("/login")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoRegister = async () => {
    setIsLoading(true)
    
    try {
      // Skip registration and sign in as demo user
      await signIn("credentials", {
        email: "demo@example.com",
        password: "demo12345",
        redirect: false,
      })
      
      toast({
        title: "Demo account activated!",
        description: "You're now using the demo account",
      })
      
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Demo registration error:", error)
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
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Start your college application journey today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
            </div>
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
              <Label htmlFor="password">Password</Label>
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
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                />
              </div>
              <Label htmlFor="terms" className="text-sm font-medium text-muted-foreground">
                I agree to the{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
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
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
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
                Or try without registering
              </span>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={handleDemoRegister}
            disabled={isLoading}
          >
            Demo Account
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-primary" />
            <span>Your data is securely encrypted</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 