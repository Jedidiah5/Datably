import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/dashboard" className="text-2xl font-bold font-heading text-foreground hover:text-primary transition-colors">
      Datably
    </Link>
  );
}
