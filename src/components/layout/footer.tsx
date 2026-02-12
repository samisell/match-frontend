import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { navItems } from '@/lib/data';

export function Footer() {
  const legalLinks = [
    { title: 'Terms & Conditions', href: '/terms' },
    { title: 'Privacy Policy', href: '/privacy' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Github, href: '#', name: 'Github' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];

  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo inHeader/>
            <p className="mt-4 text-muted-foreground text-sm">
              Meaningful Matches, Curated With Care.
            </p>
            <div className="flex space-x-4 mt-6">
                {socialLinks.map(social => (
                    <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-foreground">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.name}</span>
                    </Link>
                ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold font-headline text-lg">Platform</h3>
            <ul className="mt-4 space-y-2">
              {navItems.map(item => (
                <li key={item.title}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-headline text-lg">Legal</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map(item => (
                <li key={item.title}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
           <div>
            <h3 className="font-bold font-headline text-lg">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground">Support</Link></li>
              <li><a href="mailto:hello@heartcraft.com" className="hover:text-foreground">hello@heartcraft.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HeartCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
