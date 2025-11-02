import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import SeniorsLanding from "@/pages/SeniorsLanding";
import VeteransLanding from "@/pages/VeteransLanding";
import FirstRespondersLanding from "@/pages/FirstRespondersLanding";
import ThankYou from "@/pages/ThankYou";
import NotQualified from "@/pages/NotQualified";
import NotFound from "@/pages/not-found";

// Use Vite's dev mode check for client-side routing base path
// In dev: use "/" so routes match in Replit preview
// In prod: use the cPanel subdirectory path from Vite config
const basePath = import.meta.env.DEV 
  ? "" 
  : import.meta.env.BASE_URL.replace(/\/$/, '');

function Routes() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/seniors" component={SeniorsLanding} />
      <Route path="/veterans" component={VeteransLanding} />
      <Route path="/firstresponders" component={FirstRespondersLanding} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/not-qualified" component={NotQualified} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router base={basePath}>
          <Routes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
