import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language";
import { CountryProvider } from "@/lib/geolocation";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CountryProvider>
          <LanguageProvider>
            <Toaster />
            <Router />
          </LanguageProvider>
        </CountryProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
