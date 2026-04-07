import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  particlesEnabled: boolean;
  audioEnabled: boolean;
  notificationsEnabled: boolean;
  highQuality: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('ignite-settings');
    return saved ? JSON.parse(saved) : {
      particlesEnabled: true,
      audioEnabled: true,
      notificationsEnabled: true,
      highQuality: true,
    };
  });

  useEffect(() => {
    localStorage.setItem('ignite-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
