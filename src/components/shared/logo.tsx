import Link from 'next/link';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, inHeader = false }: { className?: string; inHeader?: boolean }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <Heart className={cn('w-6 h-6', inHeader ? 'text-primary' : 'text-primary-foreground')} />
      <span
        className={cn(
          'text-2xl font-bold font-headline tracking-wide',
          inHeader ? 'text-foreground' : 'text-primary-foreground'
        )}
      >
        HeartCraft
      </span>
    </Link>
  );
}
