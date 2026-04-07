import { motion } from 'motion/react';
import { ShoppingCart, Star } from 'lucide-react';
import { MOCK_GAMES } from '../constants';
import { Game } from '../types';
import confetti from 'canvas-confetti';

interface GamesProps {
  ownedGames: string[];
  onBuy: (game: Game) => void;
}

export default function Games({ ownedGames, onBuy }: GamesProps) {
  const handlePurchase = (game: Game) => {
    onBuy(game);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#000000', '#ffffff']
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white">Game Store</h2>
          <p className="text-orange-500/60">Discover your next favorite adventure</p>
        </div>
        <div className="flex gap-4">
          {['All', 'Action', 'RPG', 'Strategy', 'Racing'].map((cat) => (
            <button key={cat} className="px-4 py-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-black transition-all text-sm font-bold">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_GAMES.map((game, i) => {
          const isOwned = ownedGames.includes(game.id);
          
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-orange-500/20 rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-orange-500 text-sm font-bold">
                  <Star className="w-4 h-4 fill-current" /> {game.rating}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{game.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{game.description}</p>
                
                <button
                  disabled={isOwned}
                  onClick={() => handlePurchase(game)}
                  className={`
                    w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                    ${isOwned 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600 text-black active:scale-95'}
                  `}
                >
                  {isOwned ? (
                    'In Library'
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" /> Add to Library
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
