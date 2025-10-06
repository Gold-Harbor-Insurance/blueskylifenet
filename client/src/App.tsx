import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SeniorsLanding from "@/pages/SeniorsLanding";
import VeteransLanding from "@/pages/VeteransLanding";
import OriginalLanding from "@/pages/OriginalLanding";
import ThankYou from "@/pages/ThankYou";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/seniors" component={SeniorsLanding} />
      <Route path="/veterans" component={VeteransLanding} />
      <Route path="/original" component={OriginalLanding} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/" component={SeniorsLanding} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
