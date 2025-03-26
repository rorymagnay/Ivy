"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  FileText, 
  GraduationCap, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  School,
  Calendar,
  Brain
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Colleges", href: "/dashboard/colleges", icon: GraduationCap },
  { name: "Essays", href: "/dashboard/essays", icon: FileText },
  { name: "Coherence", href: "/dashboard/essays/coherence", icon: Brain },
  { name: "Deadlines", href: "/dashboard/deadlines", icon: Calendar },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r bg-background">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Link href="/dashboard" className="text-2xl font-bold">
                  IVY
                </Link>
              </div>
              <nav className="mt-5 flex-1 space-y-1 bg-background px-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 flex-shrink-0",
                          isActive
                            ? "text-primary-foreground"
                            : "text-muted-foreground group-hover:text-accent-foreground"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 