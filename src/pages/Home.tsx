import { motion } from 'motion/react';
import { Gamepad2, Play, TrendingUp, Users } from 'lucide-react';

export default function Home({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <div className="space-y-12">
      <section className="relative h-[500px] rounded-3xl overflow-hidden group">
        <img
          src="https://picsum.photos/seed/gaming/1200/600"
          alt="Featured Game"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
              FEATURED
            </span>
            <h1 className="text-6xl font-black text-white mb-4">NEON OVERDRIVE</h1>
            <p className="text-orange-100/80 max-w-xl mb-8 text-lg">
              Experience the ultimate high-speed chase in a dystopian future. 
              Master the streets, upgrade your ride, and become a legend.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate('games')}
                className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
              >
                <Play className="fill-current" /> Play Now
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: TrendingUp, label: 'Trending', value: '12 Games' },
          { icon: Users, label: 'Online Players', value: '45.2k' },
          { icon: Gamepad2, label: 'Total Games', value: '1,200+' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="bg-orange-500/5 border border-orange-500/20 p-8 rounded-2xl backdrop-blur-sm"
          >
            <stat.icon className="text-orange-500 w-10 h-10 mb-4" />
            <div className="text-orange-500/60 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
