
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FeatureToggles {
  showNavigation: boolean;
  showRentals: boolean;
  showDesignSystem: boolean;
  showProperties: boolean;
  showTenants: boolean;
  showBuildings: boolean;
  showApartments: boolean;
  showRoomInformation: boolean;
  showInspections: boolean;
}

interface FeatureTogglesContextType {
  features: FeatureToggles;
  handleFeatureToggle: (feature: keyof FeatureToggles) => void;
}

const DEFAULT_FEATURES: FeatureToggles = {
  showNavigation: false,
  showRentals: false,
  showDesignSystem: false,
  showProperties: false,
  showTenants: false,
  showBuildings: false,
  showApartments: false,
  showRoomInformation: false,
  showInspections: false,
};

const FeatureTogglesContext = createContext<FeatureTogglesContextType | undefined>(undefined);

export function FeatureTogglesProvider({ children }: { children: React.ReactNode }) {
  const [features, setFeatures] = useState<FeatureToggles>(() => {
    const savedFeatures = localStorage.getItem('featureToggles');
    if (savedFeatures) {
      const parsedFeatures = JSON.parse(savedFeatures);
      return {
        ...DEFAULT_FEATURES,
        ...parsedFeatures,
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
        // If turning off navigation, turn off all sub-features
        Object.keys(newFeatures).forEach(key => {
          newFeatures[key as keyof FeatureToggles] = false;
        });
      } else if (feature === 'showProperties' && !prev.showProperties) {
        newFeatures.showProperties = true;
      } else if (feature === 'showProperties' && prev.showProperties) {
        // If turning off properties, turn off buildings and apartments
        newFeatures.showProperties = false;
        newFeatures.showBuildings = false;
        newFeatures.showApartments = false;
      } else {
        newFeatures[feature] = !prev[feature];
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
