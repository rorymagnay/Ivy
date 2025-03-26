"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isAuthenticated?: boolean
}

export function MobileNav({ isAuthenticated }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#security', label: 'Security' },
    { href: '#ai', label: 'AI Technology' },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden px-0 text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-black/95 backdrop-blur-xl border-white/10"
      >
        <div className="flex flex-col space-y-4 text-white">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                IVY
              </span>
            </Link>
            <Button
              variant="ghost"
              className="px-0 text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors py-2 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col space-y-4 pt-4 border-t border-white/10">
            {isAuthenticated ? (
              <Button
                asChild
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
              >
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 hover:border-white/40"
                >
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
                >
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-400">
              Need help?{' '}
              <Link
                href="/contact"
                className="text-white hover:text-emerald-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 