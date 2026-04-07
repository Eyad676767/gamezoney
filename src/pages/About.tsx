import { motion } from 'motion/react';
import { Info, Shield, Mail, Globe, Github, Twitter } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-orange-500 rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.3)] mb-8"
        >
          <Info className="text-black w-12 h-12" />
        </motion.div>
        <h1 className="text-6xl font-black text-white tracking-tighter">IGNITE GAMES</h1>
        <p className="text-orange-500 text-xl font-mono">EST. 2026 • THE FUTURE OF ARCADE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-zinc-900/50 border border-orange-500/20 p-8 rounded-3xl space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="text-orange-500" /> Our Mission
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Ignite Games is dedicated to bringing high-quality, accessible gaming experiences 
            to everyone. We believe in a future where the line between store and arcade 
            is blurred, providing a seamless transition from discovery to play.
          </p>
        </section>

        <section className="bg-zinc-900/50 border border-orange-500/20 p-8 rounded-3xl space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="text-orange-500" /> Global Reach
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            With servers in over 40 countries, we ensure low-latency gaming and 
            a vibrant community of millions of players worldwide. Join the 
            revolution today.
          </p>
        </section>
      </div>

      <div className="bg-orange-500 p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-black">
          <h2 className="text-3xl font-black mb-2">WANT TO DEVELOP WITH US?</h2>
          <p className="font-medium opacity-80">Join our creator program and reach millions.</p>
        </div>
        <button className="bg-black text-orange-500 px-8 py-4 rounded-xl font-black hover:scale-105 transition-transform">
          APPLY NOW
        </button>
      </div>

      <div className="flex justify-center gap-8 text-orange-500/40">
        <Twitter className="w-8 h-8 hover:text-orange-500 cursor-pointer transition-colors" />
        <Github className="w-8 h-8 hover:text-orange-500 cursor-pointer transition-colors" />
        <Mail className="w-8 h-8 hover:text-orange-500 cursor-pointer transition-colors" />
      </div>
    </div>
  );
}
