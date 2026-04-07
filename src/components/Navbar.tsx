import { Home, Gamepad2, ShoppingBag, Info, Library, User, Settings, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'games', label: 'Games', icon: ShoppingBag },
    { id: 'play', label: 'Play', icon: Gamepad2 },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 md:w-64 bg-black/80 backdrop-blur-md border-r border-orange-500/30 flex flex-col items-center py-8 z-50">
      <div className="mb-12">
        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)]">
          <Gamepad2 className="text-black w-8 h-8" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 w-full px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-4 p-3 rounded-lg transition-all duration-300 group
                ${isActive ? 'bg-orange-500 text-black' : 'text-orange-500/70 hover:bg-orange-500/10 hover:text-orange-500'}
              `}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <span className="hidden md:block font-medium">{tab.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-orange-500 rounded-lg -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
