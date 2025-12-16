import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background w-full">
      <div className="text-center space-y-6 p-responsive">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <p className="text-xl text-foreground">Sidan kunde inte hittas</p>
          <p className="text-muted-foreground">
            Sidan du letar efter finns inte eller har flyttats.
          </p>
          <p className="text-sm text-muted-foreground font-mono">
            {location.pathname}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Gå tillbaka
          </Button>
          <Button asChild className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Till startsidan
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
