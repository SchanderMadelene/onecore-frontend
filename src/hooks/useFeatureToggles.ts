
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
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return {
    features,
    handleFeatureToggle
  };
}
