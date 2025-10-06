import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--gradient-navy-start))] to-[hsl(var(--gradient-navy-end))] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-gold">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={() => setLocation("/seniors")}
            size="lg"
            className="gap-2"
            data-testid="button-seniors"
          >
            <Home className="w-5 h-5" />
            Seniors Page
          </Button>
          <Button
            onClick={() => setLocation("/veterans")}
            size="lg"
            variant="outline"
            className="gap-2"
            data-testid="button-veterans"
          >
            <Home className="w-5 h-5" />
            Veterans Page
          </Button>
        </div>
      </div>
    </div>
  );
}
