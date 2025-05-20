import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PagamentoPix from "@/pages/PagamentoPix";
import Dashboard from "@/pages/Dashboard";
import Sucesso from "@/pages/Sucesso";
import Cancelado from "@/pages/Cancelado";

// Removemos a referência ao Checkout com cartão de crédito

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pagamentopix" component={PagamentoPix} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/sucesso" component={Sucesso} />
      <Route path="/cancelado" component={Cancelado} />
      {/* Fallback to 404 */}
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
