"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { LogOut, User as UserIcon, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link"; // Import Link
import { useRouter } from "next/navigation"; // Import useRouter

export function UserNav() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter(); // Initialize router

  const handleLogout = async () => {
    await logout();
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    // Router push handled by AuthContext logout
  };

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length -1]) { // Add checks for undefined
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    if (name && name.length >=2) { // Add check for undefined
       return name.substring(0, 2).toUpperCase();
    }
    return "??"; // Fallback if name is too short or undefined
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full m-1"> {/* Added m-1 here */}
          <Avatar className="h-10 w-10">
            {/* Placeholder for user avatar image if available */}
            {/* <AvatarImage src="/avatars/01.png" alt={user.fullName} /> */}
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled> {/* Mocked, not functional */}
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <Link href="/settings" passHref legacyBehavior>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
