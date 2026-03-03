import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 
  | 'general'
  | 'kundcenter'
  | 'kvartersvard'
  | 'distriktschef'
  | 'besiktningen'
  | 'forvaltningsadmin'
  | 'uthyrning'
  | 'bosocial';

export const roleLabels: Record<UserRole, string> = {
  general: 'Generell (Alla kort)',
  kundcenter: 'Kundcenter',
  kvartersvard: 'Kvartersvärdar',
  distriktschef: 'Distriktschefer',
  besiktningen: 'Besiktningen',
  forvaltningsadmin: 'Förvaltningsadmin',
  uthyrning: 'Uthyrning',
  bosocial: 'Bosocial',
};

export const roleCardConfig: Record<UserRole, string[]> = {
  general: [], // Empty array means all cards
  kundcenter: ['tenants', 'rentals', 'odoo', 'tenfast'],
  kvartersvard: ['properties', 'inspections', 'turnover', 'odoo', 'tenants'],
  distriktschef: [], // All cards
  besiktningen: ['inspections', 'properties', 'tenants', 'turnover'],
  forvaltningsadmin: ['properties', 'xledger', 'tenfast', 'greenview'],
  uthyrning: ['rentals', 'tenants', 'properties', 'barriers'],
  bosocial: ['tenants', 'barriers', 'odoo'],
};

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  devModeEnabled: boolean;
  setDevModeEnabled: (enabled: boolean) => void;
  isCardVisibleForRole: (cardId: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const getStoredRole = (): UserRole => {
    try {
      const saved = window.localStorage.getItem('onecore-dev-role');
      if (saved && Object.prototype.hasOwnProperty.call(roleCardConfig, saved)) {
        return saved as UserRole;
      }
    } catch {
      // Ignore storage access issues in embedded/locked-down contexts
    }
    return 'general';
  };

  const getStoredDevMode = (): boolean => {
    try {
      return window.localStorage.getItem('onecore-dev-mode') === 'true';
    } catch {
      return false;
    }
  };

  const [currentRole, setCurrentRole] = useState<UserRole>(getStoredRole);
  const [devModeEnabled, setDevModeEnabled] = useState<boolean>(getStoredDevMode);

  useEffect(() => {
    try {
      window.localStorage.setItem('onecore-dev-role', currentRole);
    } catch {
      // Ignore storage access issues in embedded/locked-down contexts
    }
  }, [currentRole]);

  useEffect(() => {
    try {
      window.localStorage.setItem('onecore-dev-mode', String(devModeEnabled));
    } catch {
      // Ignore storage access issues in embedded/locked-down contexts
    }
  }, [devModeEnabled]);

  const isCardVisibleForRole = (cardId: string): boolean => {
    const allowedCards = roleCardConfig[currentRole] ?? roleCardConfig.general;
    // If allowedCards is empty (general or distriktschef), show all cards
    if (allowedCards.length === 0) return true;
    return allowedCards.includes(cardId);
  };

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        devModeEnabled,
        setDevModeEnabled,
        isCardVisibleForRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
