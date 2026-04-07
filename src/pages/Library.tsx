import { motion } from 'motion/react';
import { Play, Search } from 'lucide-react';
import { MOCK_GAMES } from '../constants';

interface LibraryProps {
  ownedGames: string[];
  onPlay: (gameId: string) => void;
}

export default function Library({ ownedGames, onPlay }: LibraryProps) {
  const games = MOCK_GAMES.filter(g => ownedGames.includes(g.id));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-white">My Library</h2>
          <p className="text-orange-500/60">{games.length} Games Ready to Play</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search library..."
            className="w-full bg-zinc-900 border border-orange-500/20 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-orange-500 transition-all"
          />
        </div>
      </div>

      {games.length === 0 ? (
        <div className="bg-zinc-900/50 border-2 border-dashed border-orange-500/20 rounded-3xl p-20 text-center">
          <p className="text-zinc-500 text-lg">You don't own any games yet.</p>
          <button className="text-orange-500 font-bold mt-4 hover:underline">Visit the Store</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-orange-500/10 rounded-2xl overflow-hidden group hover:border-orange-500/40 transition-all"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <button
                    onClick={() => onPlay(game.id)}
                    className="w-full bg-orange-500 text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    <Play className="w-5 h-5 fill-current" /> Play
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white truncate">{game.title}</h3>
                <p className="text-orange-500/60 text-xs font-mono uppercase">{game.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
