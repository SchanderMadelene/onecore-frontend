// Re-export from features layer (single source of truth).
// Only runtime values — types live in @/entities/barrier/types.
export {
  mockBarriers,
  getBarriersByType,
  getActiveBarriers,
  getAllBarriers,
  getAvailableHousing,
  getAvailableParkingSpaces,
  getAvailableStorage,
  getAvailableCommercial,
  createBarrier,
} from "@/features/barriers/data/barriers";
