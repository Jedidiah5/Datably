"use client";

import { useTheme } from "@/contexts/theme-context";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg border bg-card text-card-foreground">
      {theme === "light" ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-slate-400" />}
      <Label htmlFor="theme-switch" className="flex-grow text-base">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </Label>
      <Switch
        id="theme-switch"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      />
    </div>
  );
}
