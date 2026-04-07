import { motion } from 'motion/react';
import { Trophy, Medal, Flame } from 'lucide-react';

export default function Leaderboard() {
  const players = [
    { rank: 1, name: 'CyberGhost', score: 98450, games: 124, avatar: 'https://picsum.photos/seed/p1/100/100' },
    { rank: 2, name: 'NeonViper', score: 87200, games: 98, avatar: 'https://picsum.photos/seed/p2/100/100' },
    { rank: 3, name: 'VoidWalker', score: 76500, games: 156, avatar: 'https://picsum.photos/seed/p3/100/100' },
    { rank: 4, name: 'PixelKing', score: 65400, games: 87, avatar: 'https://picsum.photos/seed/p4/100/100' },
    { rank: 5, name: 'ShadowNinja', score: 54300, games: 210, avatar: 'https://picsum.photos/seed/p5/100/100' },
    { rank: 6, name: 'InfernoRider', score: 43200, games: 45, avatar: 'https://picsum.photos/seed/p6/100/100' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">Hall of Fame</h2>
        <p className="text-orange-500 font-mono">THE TOP PLAYERS OF THIS SEASON</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {players.slice(0, 3).map((player, i) => (
          <motion.div
            key={player.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`
              relative p-8 rounded-3xl border-2 flex flex-col items-center text-center
              ${i === 0 ? 'bg-orange-500 border-orange-400 scale-110 z-10' : 'bg-zinc-900/50 border-orange-500/20'}
            `}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              {i === 0 ? (
                <Trophy className="w-12 h-12 text-black fill-current" />
              ) : (
                <Medal className={`w-10 h-10 ${i === 1 ? 'text-zinc-300' : 'text-amber-700'}`} />
              )}
            </div>
            <img
              src={player.avatar}
              alt={player.name}
              className={`w-24 h-24 rounded-2xl mb-4 border-4 ${i === 0 ? 'border-black' : 'border-orange-500/20'}`}
              referrerPolicy="no-referrer"
            />
            <h3 className={`text-2xl font-black ${i === 0 ? 'text-black' : 'text-white'}`}>{player.name}</h3>
            <div className={`text-sm font-mono mt-2 ${i === 0 ? 'text-black/60' : 'text-orange-500/60'}`}>
              {player.score.toLocaleString()} PTS
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-zinc-900/50 border border-orange-500/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-orange-500/10 bg-orange-500/5">
              <th className="p-6 text-orange-500 font-bold uppercase text-sm">Rank</th>
              <th className="p-6 text-orange-500 font-bold uppercase text-sm">Player</th>
              <th className="p-6 text-orange-500 font-bold uppercase text-sm">Score</th>
              <th className="p-6 text-orange-500 font-bold uppercase text-sm">Games Played</th>
              <th className="p-6 text-orange-500 font-bold uppercase text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, i) => (
              <tr key={player.name} className="border-b border-orange-500/5 hover:bg-white/5 transition-colors">
                <td className="p-6 font-mono text-orange-500">#{player.rank}</td>
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img src={player.avatar} className="w-10 h-10 rounded-lg" referrerPolicy="no-referrer" />
                    <span className="text-white font-bold">{player.name}</span>
                  </div>
                </td>
                <td className="p-6 text-white font-mono">{player.score.toLocaleString()}</td>
                <td className="p-6 text-zinc-400">{player.games}</td>
                <td className="p-6">
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold">HOT</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
