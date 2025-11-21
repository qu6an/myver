'use client';
import { Home, User, Trophy, Settings, PlayCircle, Car } from 'lucide-react';
import { useSession } from '@/components/providers/SessionProvider';
import { useUserRole } from '../hooks/useUserRole';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserMenu } from './UserMenu';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const { user } = useSession();
  const { isAdmin } = useUserRole();
  const currentPath = usePathname();

  // Don't show navigation on auth page or during game
  if (currentPath === '/login' || currentPath === '/game/play') {
    return null;
  }

  const navItems = [
    { path: '/game', label: 'Главная', icon: Home },
    { path: '/game/leaderboard', label: 'Рейтинг', icon: Trophy },
    ...(user
      ? [
          { path: '/game/profile', label: 'Профиль', icon: User },
          ...(isAdmin
            ? [{ path: '/game/admin', label: 'Админ', icon: Settings }]
            : []),
        ]
      : []),
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <>
      {user && (
        <header className="border-border relative top-0 z-50 w-full border-b bg-transparent">
          <div className="container mx-auto flex h-max items-center justify-between px-4 md:h-16">
            {/* Navigation Links */}
            <nav className="hidden items-center space-x-1 md:flex">
              {navItems.map(item => (
                <Button
                  key={item.path}
                  asChild
                  variant={isActive(item.path) ? 'secondary' : 'ghost'}
                  className={`text-foreground ${
                    isActive(item.path)
                      ? 'bg-game-primary hover:bg-game-primary/80'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Link
                    href={item.path}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}

              <Button
                asChild
                variant="default"
                className="game-button-primary text-primary-foreground ml-4"
              >
                <Link href="/game/play" className="flex items-center space-x-2">
                  <PlayCircle className="h-4 w-4" />
                  <span>Играть</span>
                </Link>
              </Button>
            </nav>

            {/* User Menu or Auth Button */}
            {/* <div className="flex items-center space-x-2">
          {user && <UserMenu isAdmin={isAdmin} />}
        </div> */}
          </div>

          {/* Mobile Navigation */}
          <div className="border-border bg-card border-t md:hidden">
            <div className="container mx-auto w-full px-4 py-2">
              <div className="flex w-full items-center justify-between">
                {navItems.slice(0, 4).map(item => (
                  <Button
                    key={item.path}
                    asChild
                    variant="ghost"
                    size="sm"
                    className={`flex h-auto flex-col items-center space-y-1 px-2 py-2 ${
                      isActive(item.path) ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    <Link href={item.path}>
                      <item.icon className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="text-[10px] sm:text-xs">
                        {item.label}
                      </span>
                    </Link>
                  </Button>
                ))}

                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-primary flex h-auto flex-col items-center space-y-1 py-2 font-medium"
                >
                  <Link href="/game/play">
                    <PlayCircle className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="text-[10px] sm:text-xs">Играть</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};
