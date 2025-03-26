"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import {
  GraduationCap,
  FileText,
  Brain,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Wand2,
  Shield,
  Lock,
  Zap,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="IVY Logo" width={32} height={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              IVY
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#security" className="text-sm text-gray-400 hover:text-white transition-colors">
              Security
            </Link>
            <Link href="#ai" className="text-sm text-gray-400 hover:text-white transition-colors">
              AI Technology
            </Link>
            <Button variant="outline" className="border-white/20 hover:border-white/40">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700">
              Get Started
            </Button>
          </div>
          <MobileNav />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm animate-fade-in">
                <span className="text-emerald-400">New</span>
                <span className="mx-2 text-white/60">|</span>
                <span className="text-white/80">AI-Powered Essay Analysis</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold animate-fade-up [animation-delay:200ms]">
                Turn <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent animate-gradient">Ideas</span> Into
                <br />
                Applications
              </h1>
              <div className="relative animate-fade-up [animation-delay:400ms]">
                <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/70 to-emerald-500/0"></div>
                <p className="relative text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Craft compelling college applications with AI-powered insights, 
                  real-time feedback, and intelligent organization.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up [animation-delay:600ms]">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 h-12 px-8 group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:border-white/40 h-12 px-8">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-gray-400 animate-fade-up [animation-delay:800ms]">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <span>Enterprise-grade security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-emerald-400" />
                  <span>SOC 2 Type II Certified</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative animate-fade-in [animation-delay:1000ms]">
              <div className="relative aspect-square w-full max-w-[600px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <Image
                  src="/ai-education.webp"
                  alt="AI Education Visualization"
                  fill
                  className="object-cover rounded-3xl animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold animate-fade-up">
              Powered by Advanced{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                AI Technology
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
              Our platform leverages cutting-edge AI to transform your college application process
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-white/10 p-8 hover:border-emerald-500/50 transition-all duration-300 hover:translate-y-[-4px] animate-fade-up [animation-delay:400ms]">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Essay Analysis</h3>
              <p className="text-gray-400">
                Real-time feedback powered by GPT-4, ensuring your essays stand out with clarity,
                coherence, and impact.
              </p>
            </Card>
            <Card className="bg-gray-900/50 border-white/10 p-8 hover:border-emerald-500/50 transition-all duration-300 hover:translate-y-[-4px] animate-fade-up [animation-delay:600ms]">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6">
                <Wand2 className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-gray-400">
                Personalized college suggestions using machine learning to match your profile
                with the perfect institutions.
              </p>
            </Card>
            <Card className="bg-gray-900/50 border-white/10 p-8 hover:border-emerald-500/50 transition-all duration-300 hover:translate-y-[-4px] animate-fade-up [animation-delay:800ms]">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
              <p className="text-gray-400">
                Enterprise-grade encryption and compliance measures to protect your sensitive
                application data.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section id="ai" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold animate-fade-up">
                Next-Generation{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                  Essay Analysis
                </span>
              </h2>
              <p className="text-xl text-gray-400 animate-fade-up [animation-delay:200ms]">
                Our AI technology analyzes your essays in real-time, providing instant feedback
                on structure, clarity, and impact.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 animate-fade-up [animation-delay:400ms]">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Real-time Analysis</h3>
                    <p className="text-gray-400">
                      Get instant feedback as you write, with suggestions for improvement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-up [animation-delay:600ms]">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Style Enhancement</h3>
                    <p className="text-gray-400">
                      AI-powered suggestions for better word choice and sentence structure.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-up [animation-delay:800ms]">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Admission Insights</h3>
                    <p className="text-gray-400">
                      Learn what makes your essays stand out to admission officers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in [animation-delay:1000ms]">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <Image
                src="/ai-analysis.webp"
                alt="AI Analysis Interface"
                width={600}
                height={400}
                className="relative rounded-3xl border border-white/10 animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="container relative mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 animate-fade-up [animation-delay:200ms]">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                99.9%
              </div>
              <p className="text-gray-400">
                Essay analysis accuracy
              </p>
            </div>
            <div className="space-y-2 animate-fade-up [animation-delay:400ms]">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                3.2x
              </div>
              <p className="text-gray-400">
                Higher acceptance rate
              </p>
            </div>
            <div className="space-y-2 animate-fade-up [animation-delay:600ms]">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                100k+
              </div>
              <p className="text-gray-400">
                Essays analyzed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold animate-fade-up">
              Ready to transform your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                application journey
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-400 animate-fade-up [animation-delay:200ms]">
              Join thousands of students who have already improved their college applications with IVY.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 h-12 px-8 group animate-fade-up [animation-delay:400ms]">
              Get Started Now
              <Sparkles className="ml-2 h-5 w-5 animate-pulse" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-up [animation-delay:200ms]">
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="text-gray-400 hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div className="animate-fade-up [animation-delay:400ms]">
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div className="animate-fade-up [animation-delay:600ms]">
              <h3 className="font-semibold mb-4 text-white">Security</h3>
              <ul className="space-y-2">
                <li><Link href="/security" className="text-gray-400 hover:text-white transition-colors">SOC 2</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/compliance" className="text-gray-400 hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div className="animate-fade-up [animation-delay:800ms]">
              <h3 className="font-semibold mb-4 text-white">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="/twitter" className="text-gray-400 hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="/linkedin" className="text-gray-400 hover:text-white transition-colors">LinkedIn</Link></li>
                <li><Link href="/discord" className="text-gray-400 hover:text-white transition-colors">Discord</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 animate-fade-up [animation-delay:1000ms]">
            <p>&copy; {new Date().getFullYear()} IVY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 