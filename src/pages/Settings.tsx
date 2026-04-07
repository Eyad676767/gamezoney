import { motion } from 'motion/react';
import { Bell, Shield, Monitor, Volume2, Globe, Save, Check } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useState } from 'react';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const [saved, setSaved] = useState(false);

  const sections = [
    { 
      id: 'highQuality', 
      icon: Monitor, 
      label: 'Graphics', 
      description: 'High quality rendering and effects',
      value: settings.highQuality 
    },
    { 
      id: 'particlesEnabled', 
      icon: Monitor, 
      label: 'Particles', 
      description: 'Background particle effects',
      value: settings.particlesEnabled 
    },
    { 
      id: 'audioEnabled', 
      icon: Volume2, 
      label: 'Audio', 
      description: 'Master volume and sound effects',
      value: settings.audioEnabled 
    },
    { 
      id: 'notificationsEnabled', 
      icon: Bell, 
      label: 'Notifications', 
      description: 'Alerts, updates, and messages',
      value: settings.notificationsEnabled 
    },
    { 
      id: 'privacy', 
      icon: Shield, 
      label: 'Privacy', 
      description: 'Data sharing and account security',
      value: true 
    },
  ];

  const handleToggle = (id: string, currentValue: boolean) => {
    if (id === 'privacy') return;
    updateSettings({ [id]: !currentValue });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12">
      <div>
        <h2 className="text-4xl font-black text-white">Settings</h2>
        <p className="text-orange-500/60">Configure your gaming experience</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((section, i) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleToggle(section.id, section.value)}
            className="bg-zinc-900/50 border border-orange-500/10 p-6 rounded-2xl flex items-center justify-between group hover:border-orange-500/40 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${section.value ? 'bg-orange-500 text-black' : 'bg-orange-500/10 text-orange-500'}`}>
                <section.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{section.label}</h3>
                <p className="text-zinc-500 text-sm">{section.description}</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${section.value ? 'bg-orange-500/20' : 'bg-zinc-800'}`}>
              <motion.div 
                animate={{ x: section.value ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-8 py-3 rounded-xl font-bold text-zinc-500 hover:text-white transition-colors">
          Discard Changes
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
          {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
