// Types
export * from './types';

// Data - explicit exports to avoid conflicts with types
export { 
  mockBarriers, 
  getBarriersByType, 
  getActiveBarriers, 
  getAllBarriers,
  getAvailableHousing,
  getAvailableParkingSpaces,
  getAvailableStorage,
  getAvailableCommercial,
  createBarrier 
} from './data';

// Components
export * from './components';
