'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart3, List, Grid, Swords, LogOut } from 'lucide-react';
import { PokemonIcon } from '@/components/icons/PokemonIcon';
import { usePathname, useRouter } from 'next/navigation';

const sidebarItems = [
  { title: 'Overview', icon: BarChart3, href: '/admin/dashboard' },
  { title: 'Pokemon List', icon: List, href: '/admin/dashboard/list' },
  { title: 'Grid View', icon: Grid, href: '/admin/dashboard/grid' },
  { title: 'Battle', icon: Swords, href: '/admin/dashboard/Battle' },
];

type SidebarProps = {
  username: string | null;
};

export function Sidebar({ username }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const filteredItems =
    username === 'jugador1'
      ? sidebarItems.filter((item) => item.title === 'Battle')
      : sidebarItems;

  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <PokemonIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Pokémon Experience
          </span>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="flex flex-col gap-2 p-4">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-2',
                  pathname === item.href && 'bg-primary/10'
                )}
                onClick={() => router.push(item.href)}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Button>
            );
          })}

          <div className="mt-auto pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => router.push('/login')}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
