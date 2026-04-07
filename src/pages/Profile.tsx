import { motion } from 'motion/react';
import { User as UserIcon, Mail, Calendar, Award } from 'lucide-react';
import { User } from '../types';

export default function Profile({ user }: { user: User }) {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="relative h-64 rounded-3xl overflow-hidden group">
        <img
          src="https://picsum.photos/seed/profile-banner/1200/400"
          alt="Profile Banner"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute -bottom-12 left-12 flex items-end gap-8">
          <div className="w-32 h-32 bg-orange-500 rounded-3xl border-4 border-black flex items-center justify-center shadow-2xl">
            <UserIcon className="text-black w-16 h-16" />
          </div>
          <div className="pb-14">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">{user.name}</h1>
            <p className="text-orange-500 font-mono">Level 42 • Pro Member</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-zinc-900/50 border border-orange-500/20 p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Award className="text-orange-500" /> Recent Achievements
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'First Win', date: '2 days ago', icon: '🏆' },
                { title: 'Collector', date: '1 week ago', icon: '📦' },
                { title: 'Speedster', date: '3 weeks ago', icon: '⚡' },
                { title: 'Socialite', date: '1 month ago', icon: '🤝' },
              ].map((ach, i) => (
                <div key={i} className="bg-black/40 p-4 rounded-2xl border border-orange-500/10 flex items-center gap-4">
                  <span className="text-3xl">{ach.icon}</span>
                  <div>
                    <div className="text-white font-bold">{ach.title}</div>
                    <div className="text-orange-500/40 text-xs font-mono">{ach.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-zinc-900/50 border border-orange-500/20 p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold text-white">Activity Timeline</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 bg-orange-500/20 rounded-full relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                  </div>
                  <div className="pb-8">
                    <div className="text-white font-bold">Played Cyber Runner</div>
                    <p className="text-zinc-500 text-sm">Achieved a new high score of 4,200 points.</p>
                    <span className="text-orange-500/40 text-xs font-mono">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-zinc-900/50 border border-orange-500/20 p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-bold text-white">Account Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-5 h-5 text-orange-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span>Joined April 2026</span>
              </div>
            </div>
            <button className="w-full bg-orange-500 text-black py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
              Edit Profile
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
