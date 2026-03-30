
import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

const EntranceDetailPage = lazy(() => import("./EntranceDetailPage"));
const ResidencePage = lazy(() => import("./ResidencePage"));

const PropertySubPage = () => {
  const { id } = useParams();
  
  // Entrance IDs start with "uppgang-"
  const isEntrance = id?.startsWith("uppgang-");

  return (
    <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Laddar…</div>}>
      {isEntrance ? <EntranceDetailPage /> : <ResidencePage />}
    </Suspense>
  );
};

export default PropertySubPage;
