import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import EmployeePanel from "./pages/EmployeePanel";

// Financial markets routes
import CurrencyMarket from "./pages/markets/CurrencyMarket";
import SecuritiesMarket from "./pages/markets/SecuritiesMarket";
import InterbankMarket from "./pages/markets/InterbankMarket";

// Monetary policy routes
import KeyRate from "./pages/monetary/KeyRate";
import Inflation from "./pages/monetary/Inflation";
import MonetaryPolicy from "./pages/monetary/Policy";
import Forecasts from "./pages/monetary/Forecasts";

// About bank routes
import About from "./pages/about/About";
import Management from "./pages/about/Management";
import Structure from "./pages/about/Structure";
import Reports from "./pages/about/Reports";

// Statistics routes
import MacroeconomicsStats from "./pages/statistics/MacroeconomicsStats";
import BankingStats from "./pages/statistics/BankingStats";
import FinancialStats from "./pages/statistics/FinancialStats";

// Regulations route
import Regulations from "./pages/Regulations";
import PressCenter from "./pages/PressCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/clients" element={<EmployeePanel />} />

          {/* Financial markets routes */}
          <Route path="/markets/currency" element={<CurrencyMarket />} />
          <Route path="/markets/securities" element={<SecuritiesMarket />} />
          <Route path="/markets/interbank" element={<InterbankMarket />} />

          {/* Monetary policy routes */}
          <Route path="/key-rate" element={<KeyRate />} />
          <Route path="/inflation" element={<Inflation />} />
          <Route path="/monetary-policy" element={<MonetaryPolicy />} />
          <Route path="/forecasts" element={<Forecasts />} />

          {/* About bank routes */}
          <Route path="/about" element={<About />} />
          <Route path="/management" element={<Management />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/reports" element={<Reports />} />

          {/* Statistics routes */}
          <Route path="/statistics/macroeconomics" element={<MacroeconomicsStats />} />
          <Route path="/statistics/banking" element={<BankingStats />} />
          <Route path="/statistics/financial" element={<FinancialStats />} />

          {/* Other routes */}
          <Route path="/regulations" element={<Regulations />} />
          <Route path="/press-center" element={<PressCenter />} />

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
