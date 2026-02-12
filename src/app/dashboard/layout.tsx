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
} from '@/components/ui/sidebar'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { dashboardNavItems, loggedInUser } from '@/lib/data'
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
import { Bell, LogOut, Settings, User } from 'lucide-react'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { cn } from '@/lib/utils'

function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
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
        </nav>
      </SidebarContent>
      <SidebarFooter>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2 h-auto p-2">
                 <Avatar className="h-9 w-9">
                    <AvatarImage src={PlaceHolderImages.find(p => p.id === loggedInUser.imageId)?.imageUrl} alt={loggedInUser.name} />
                    <AvatarFallback>{loggedInUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <p className="text-sm font-medium">{loggedInUser.name}</p>
                    <p className="text-xs text-muted-foreground">View Profile</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
                 <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{loggedInUser.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{loggedInUser.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard/profile"><User className="mr-2 h-4 w-4" /><span>Profile</span></Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/dashboard/settings"><Settings className="mr-2 h-4 w-4" /><span>Settings</span></Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/"><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function DashboardHeader() {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex-1" />
      <Button variant="outline" size="icon" className="h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full h-8 w-8">
            <Avatar className="h-8 w-8">
              <AvatarImage src={PlaceHolderImages.find(p => p.id === loggedInUser.imageId)?.imageUrl} alt={loggedInUser.name} />
              <AvatarFallback>{loggedInUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/')}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
        <DashboardSidebar />
        <SidebarInset className={cn('flex flex-col', { 'sm:ml-64': open, 'sm:ml-16': !open })}>
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
        </SidebarInset>
    </SidebarProvider>
  )
}
