'use client'
import * as React from 'react'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { dashboardNavItems } from '@/lib/data'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, LogOut, Settings, User as UserIcon, ShieldCheck, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'
import { ProfileCompletionBar } from '@/components/dashboard/profile-completion-bar'

function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { setOpen, isMobile } = useSidebar()

  const adminNavItems = [
    { title: 'Email Templates', href: '/dashboard/admin/email-templates', icon: Mail },
  ]

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
    >
      <SidebarHeader>
        <Logo inHeader />
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex flex-col gap-2 p-2">
          {dashboardNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? 'secondary' : 'ghost'}
                className="justify-start"
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            )
          })}

          {user?.is_admin && (
            <>
              <div className="px-3 py-2">
                <h2 className="mb-2 px-1 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                  Administration
                </h2>
                <div className="space-y-1">
                  {adminNavItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Button
                        key={item.href}
                        asChild
                        variant={isActive ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                      >
                        <Link href={item.href}>
                          <Icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </nav>
        <div className="mt-auto px-4 py-4">
          <ProfileCompletionBar />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 h-auto p-2">
              <Avatar className="h-9 w-9">
                {/* Placeholder or real image if available in user object */}
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="text-left overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">View Profile</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/dashboard/profile"><UserIcon className="mr-2 h-4 w-4" /><span>Profile</span></Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/dashboard/settings"><Settings className="mr-2 h-4 w-4" /><span>Dating Preferences</span></Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

import { NotificationPopover } from '@/components/dashboard/notification-popover'

function DashboardHeader() {
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex-1" />
      <NotificationPopover />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full h-8 w-8">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>Dating Preferences</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)
  const router = useRouter()
  const { isAuthenticated, isLoading, user } = useAuth()

  React.useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login')
      } else if (!user?.email_verified_at || user?.is_verified === false) {
        const email = user?.email ? `?email=${encodeURIComponent(user.email)}` : ''
        router.push(`/verify-email${email}`)
      }
    }
  }, [isLoading, isAuthenticated, user, router])

  return (
    isLoading || !isAuthenticated || (!user?.email_verified_at || user?.is_verified === false) ? (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading...
        </span>
      </div>
    ) : (
      <SidebarProvider defaultOpen={false}>
        <DashboardSidebar />
        <SidebarInset className={cn('flex flex-col', { 'sm:ml-[var(--sidebar-width)]': open, 'sm:ml-[var(--sidebar-width-icon)]': !open })}>
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    )
  )
}
