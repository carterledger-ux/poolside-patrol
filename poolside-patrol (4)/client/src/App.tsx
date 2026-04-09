import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations";
import Staff from "./pages/Staff";
import Certificates from "./pages/Certificates";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/reservations"} component={Reservations} />
      <Route path={"/staff"} component={Staff} />
      <Route path={"/certificates"} component={Certificates} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
