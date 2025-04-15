
import { useState, useEffect } from 'react';

interface FeatureToggles {
  showPropertyTree: boolean;
  showRentals: boolean;
  showDesignSystem: boolean;
}

const DEFAULT_FEATURES: FeatureToggles = {
  showPropertyTree: false,
  showRentals: false,
  showDesignSystem: false,
};

export function useFeatureToggles() {
  const [features, setFeatures] = useState<FeatureToggles>(() => {
    const savedFeatures = localStorage.getItem('featureToggles');
    return savedFeatures ? JSON.parse(savedFeatures) : DEFAULT_FEATURES;
  });

  useEffect(() => {
    localStorage.setItem('featureToggles', JSON.stringify(features));
  }, [features]);

  const handleFeatureToggle = (feature: keyof FeatureToggles) => {
    setFeatures(prev => {
      const newFeatures = { ...prev };
      
      // If toggling the property tree off, disable child features
      if (feature === 'showPropertyTree' && !prev.showPropertyTree) {
        newFeatures.showPropertyTree = true;
      } else if (feature === 'showPropertyTree' && prev.showPropertyTree) {
        // When disabling property tree, disable all child features
        newFeatures.showPropertyTree = false;
        newFeatures.showRentals = false;
        newFeatures.showDesignSystem = false;
      } else if (feature === 'showRentals' || feature === 'showDesignSystem') {
        // Child features can only be enabled if property tree is enabled
        if (prev.showPropertyTree) {
          newFeatures[feature] = !prev[feature];
        }
      }
      
      return newFeatures;
    });
  };

  return {
    features,
    handleFeatureToggle
  };
}
