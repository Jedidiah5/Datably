import { UserNav } from "@/components/layout/user-nav";
import { Logo } from "@/components/layout/logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-6 flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo />
        <UserNav />
      </div>
    </header>
  );
}
