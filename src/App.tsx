
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FeatureTogglesProvider } from "@/contexts/FeatureTogglesContext";
import { HousingOffersProvider } from "@/contexts/HousingOffersContext";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { RoleProvider } from "@/contexts/RoleContext";

const lazyWithRetry = <T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
  retries = 2,
  delayMs = 300
): React.LazyExoticComponent<T> =>
  lazy(async () => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        return await importer();
      } catch (error) {
        lastError = error;
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delayMs * (attempt + 1)));
        }
      }
    }

    throw lastError;
  });

const Index = lazyWithRetry(() => import("./pages/Index"));
const PropertyDetailPage = lazyWithRetry(() => import("./pages/properties/PropertyDetailPage"));
const BuildingDetailPage = lazyWithRetry(() => import("./pages/properties/BuildingDetailPage"));
const ResidencePage = lazyWithRetry(() => import("./pages/properties/ResidencePage"));
const EntranceDetailPage = lazyWithRetry(() => import("./pages/properties/EntranceDetailPage"));
const TenantDetailPage = lazyWithRetry(() => import("./pages/tenants/TenantDetailPage"));
const AllTenantsPage = lazyWithRetry(() => import("./pages/tenants/AllTenantsPage"));
const DesignSystemPage = lazyWithRetry(() => import("./pages/design-system/DesignSystemPage"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const AllPropertiesPage = lazyWithRetry(() => import("./pages/properties/AllPropertiesPage"));
const RentalsPage = lazyWithRetry(() => import("./pages/rentals/RentalsPage"));
const CreateHousingAdPage = lazyWithRetry(() => import("./pages/rentals/CreateHousingAdPage"));
const ParkingSpaceDetailPage = lazyWithRetry(() => import("./pages/rentals/ParkingSpaceDetailPage"));
const HousingDetailPage = lazyWithRetry(() => import("./pages/rentals/HousingDetailPage"));
const ResidenceProfilePage = lazyWithRetry(() => import("./pages/rentals/ResidenceProfilePage"));
const TurnoverPage = lazyWithRetry(() => import("./pages/turnover/TurnoverPage"));
const BarriersPage = lazyWithRetry(() => import("./pages/barriers/BarriersPage"));
const AllInspectionsPage = lazyWithRetry(() => import("./pages/inspections/AllInspectionsPage"));
const SettingsPage = lazyWithRetry(() => import("./pages/settings/SettingsPage"));
const FavoritesPage = lazyWithRetry(() => import("./pages/favorites/FavoritesPage"));
const LeaseContractsPage = lazyWithRetry(() => import("./pages/lease-contracts/LeaseContractsPage"));
const StrofakturaUnderlagPage = lazyWithRetry(() => import("./pages/strofaktura/StrofakturaUnderlagPage"));
const PropertyAreasPage = lazyWithRetry(() => import("./pages/property-areas/PropertyAreasPage"));
const StewardAdminPage = lazyWithRetry(() => import("./pages/property-areas/StewardAdminPage"));

type AppErrorBoundaryProps = { children: React.ReactNode };
type AppErrorBoundaryState = { hasError: boolean };

class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Route loading failed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <p className="mb-3 text-sm text-muted-foreground">Ett tillfälligt laddningsfel uppstod.</p>
          <button
            type="button"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            onClick={() => window.location.reload()}
          >
            Ladda om sidan
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const ProtectedRoute = ({ children, isEnabled }: { children: React.ReactNode, isEnabled: boolean }) => {
  if (!isEnabled) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  const { features } = useFeatureToggles();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/properties" element={<AllPropertiesPage />} />
      <Route path="/properties/:property" element={<PropertyDetailPage />} />
      <Route path="/properties/:property/:building" element={<BuildingDetailPage />} />
      <Route path="/properties/:property/:building/:id" element={<PropertySubPage />} />
      
      <Route 
        path="/tenants/all" 
        element={
          <ProtectedRoute isEnabled={features.showTenants}>
            <AllTenantsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tenants/detail/:id" 
        element={
          <ProtectedRoute isEnabled={features.showTenants}>
            <TenantDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rentals" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <RentalsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rentals/create-housing-ad" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <CreateHousingAdPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rentals/parking/:parkingSpaceId" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <ParkingSpaceDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rentals/housing/:housingId" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <HousingDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rentals/residence-profile" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <ResidenceProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/barriers" 
        element={
          <ProtectedRoute isEnabled={features.showBarriers}>
            <BarriersPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/turnover" 
        element={
          <ProtectedRoute isEnabled={features.showTurnover}>
            <TurnoverPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/design-system" 
        element={
          <ProtectedRoute isEnabled={features.showDesignSystem}>
            <DesignSystemPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/inspections" 
        element={
          <ProtectedRoute isEnabled={features.showAllInspections}>
            <AllInspectionsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/favorites" 
        element={
          <ProtectedRoute isEnabled={features.showFavorites}>
            <FavoritesPage />
          </ProtectedRoute>
        } 
      />
          <Route 
            path="/lease-contracts" 
            element={
              <ProtectedRoute isEnabled={features.showLeaseContracts}>
                <LeaseContractsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/strofaktura" 
            element={
              <ProtectedRoute isEnabled={features.showStrofakturaUnderlag}>
                <StrofakturaUnderlagPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/property-areas" 
            element={
              <ProtectedRoute isEnabled={features.showPropertyAreas}>
                <PropertyAreasPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/property-areas/admin" 
            element={
              <ProtectedRoute isEnabled={features.showPropertyAreas}>
                <StewardAdminPage />
              </ProtectedRoute>
            }
          />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FeatureTogglesProvider>
          <RoleProvider>
            <HousingOffersProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppErrorBoundary>
                  <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Laddar…</div>}>
                    <AppRoutes />
                  </Suspense>
                </AppErrorBoundary>
              </BrowserRouter>
            </HousingOffersProvider>
          </RoleProvider>
        </FeatureTogglesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
