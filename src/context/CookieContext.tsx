import React, { createContext, useContext, useState, useEffect } from 'react';

const COOKIE_PREFS_KEY = 'bluegate_cookie_consent_v1';

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

interface CookieContextType {
  preferences: CookiePreferences | null;
  hasConsented: boolean;
  isBannerOpen: boolean;
  isPrefsModalOpen: boolean;
  openPrefsModal: () => void;
  closePrefsModal: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (analytics: boolean, marketing: boolean) => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(() => {
    try {
      const stored = localStorage.getItem(COOKIE_PREFS_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isPrefsModalOpen, setIsPrefsModalOpen] = useState(false);

  const hasConsented = preferences !== null;
  const isBannerOpen = !hasConsented;

  const persist = (prefs: CookiePreferences) => {
    setPreferences(prefs);
    try {
      localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.error('Failed to save cookie preferences:', e);
    }
  };

  const acceptAll = () => {
    persist({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    });
  };

  const rejectNonEssential = () => {
    persist({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    });
  };

  const savePreferences = (analytics: boolean, marketing: boolean) => {
    persist({
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString()
    });
    setIsPrefsModalOpen(false);
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsented,
        isBannerOpen,
        isPrefsModalOpen,
        openPrefsModal: () => setIsPrefsModalOpen(true),
        closePrefsModal: () => setIsPrefsModalOpen(false),
        acceptAll,
        rejectNonEssential,
        savePreferences
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => {
  const ctx = useContext(CookieContext);
  if (!ctx) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return ctx;
};
