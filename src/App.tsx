/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Games from './pages/Games';
import Play from './pages/Play';
import Library from './pages/Library';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import About from './pages/About';
import { INITIAL_USER } from './constants';
import { Game, User } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const handleAddGame = (game: Game) => {
    if (!user.ownedGames.includes(game.id)) {
      setUser(prev => ({
        ...prev,
        ownedGames: [...prev.ownedGames, game.id]
      }));
    }
  };

  const handlePlayGame = (gameId: string) => {
    setActiveGameId(gameId);
    setActiveTab('play');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={setActiveTab} />;
      case 'games':
        return <Games ownedGames={user.ownedGames} onBuy={handleAddGame} />;
      case 'play':
        return <Play gameId={activeGameId} />;
      case 'library':
        return <Library ownedGames={user.ownedGames} onPlay={handlePlayGame} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile user={user} />;
      case 'settings':
        return <Settings />;
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black">
      <ParticleBackground />
      
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pl-20 md:pl-64 min-h-screen">
        <header className="h-20 border-b border-orange-500/10 flex items-center justify-between px-8 sticky top-0 bg-black/50 backdrop-blur-xl z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-orange-500">
              {activeTab}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white">{user.name}</div>
                <div className="text-[10px] text-orange-500 font-mono uppercase">Level 42</div>
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-black font-bold">
                P1
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="pl-20 md:pl-64 py-12 border-t border-orange-500/10 bg-black/80">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xs">IG</span>
            </div>
            <span className="font-black tracking-tighter text-xl">IGNITE GAMES</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-orange-500/40">
            <a href="#" className="hover:text-orange-500 transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-orange-500 transition-colors">TERMS</a>
            <a href="#" className="hover:text-orange-500 transition-colors">SUPPORT</a>
            <a href="#" className="hover:text-orange-500 transition-colors">API</a>
          </div>
          <div className="text-zinc-600 text-xs font-mono">
            © 2026 IGNITE GAMES ARCADE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}

