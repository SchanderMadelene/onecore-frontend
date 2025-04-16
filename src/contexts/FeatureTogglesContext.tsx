
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FeatureToggles {
  showNavigation: boolean;
  showRentals: boolean;
  showDesignSystem: boolean;
}

interface FeatureTogglesContextType {
  features: FeatureToggles;
  handleFeatureToggle: (feature: keyof FeatureToggles) => void;
}

const DEFAULT_FEATURES: FeatureToggles = {
  showNavigation: false,
  showRentals: false,
  showDesignSystem: false,
};

const FeatureTogglesContext = createContext<FeatureTogglesContextType | undefined>(undefined);

export function FeatureTogglesProvider({ children }: { children: React.ReactNode }) {
  const [features, setFeatures] = useState<FeatureToggles>(() => {
    const savedFeatures = localStorage.getItem('featureToggles');
    if (savedFeatures) {
      const parsedFeatures = JSON.parse(savedFeatures);
      return {
        showNavigation: parsedFeatures.showNavigation || false,
        showRentals: parsedFeatures.showRentals || false,
        showDesignSystem: parsedFeatures.showDesignSystem || false
      };
    }
    return DEFAULT_FEATURES;
  });

  useEffect(() => {
    localStorage.setItem('featureToggles', JSON.stringify(features));
  }, [features]);

  const handleFeatureToggle = (feature: keyof FeatureToggles) => {
    setFeatures(prev => {
      const newFeatures = { ...prev };
      
      if (feature === 'showNavigation' && !prev.showNavigation) {
        newFeatures.showNavigation = true;
      } else if (feature === 'showNavigation' && prev.showNavigation) {
        newFeatures.showNavigation = false;
        newFeatures.showRentals = false;
        newFeatures.showDesignSystem = false;
      } else if (feature === 'showRentals' || feature === 'showDesignSystem') {
        if (prev.showNavigation) {
          newFeatures[feature] = !prev[feature];
        }
      }
      
      return newFeatures;
    });
  };

  return (
    <FeatureTogglesContext.Provider value={{ features, handleFeatureToggle }}>
      {children}
    </FeatureTogglesContext.Provider>
  );
}

export function useFeatureToggles() {
  const context = useContext(FeatureTogglesContext);
  if (context === undefined) {
    throw new Error('useFeatureToggles must be used within a FeatureTogglesProvider');
  }
  return context;
}
