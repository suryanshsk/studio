'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

const THEMES = [
  { name: 'dark-neon', icon: Moon, label: 'Dark Neon' },
  { name: 'light-minimal', icon: Sun, label: 'Light Minimal' },
  { name: 'hacker-green', icon: Monitor, label: 'Hacker Green' },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark-neon');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') || 'dark-neon';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  const CurrentThemeIcon = THEMES.find((t) => t.name === theme)?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <CurrentThemeIcon className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map(({ name, icon: Icon, label }) => (
          <DropdownMenuItem key={name} onClick={() => handleThemeChange(name)}>
            <Icon className="mr-2 h-4 w-4" />
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
