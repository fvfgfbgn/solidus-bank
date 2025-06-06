
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ClientProvider } from "@/contexts/ClientContext";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import AdminPanel from "./pages/AdminPanel";
import EmployeePanel from "./pages/EmployeePanel";
import ClientDashboard from "./pages/ClientDashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/about/About";
import Management from "./pages/about/Management";
import Structure from "./pages/about/Structure";
import Reports from "./pages/about/Reports";
import Policy from "./pages/monetary/Policy";
import KeyRate from "./pages/monetary/KeyRate";
import Inflation from "./pages/monetary/Inflation";
import Forecasts from "./pages/monetary/Forecasts";
import InterbankMarket from "./pages/markets/InterbankMarket";
import CurrencyMarket from "./pages/markets/CurrencyMarket";
import SecuritiesMarket from "./pages/markets/SecuritiesMarket";
import BankingStats from "./pages/statistics/BankingStats";
import FinancialStats from "./pages/statistics/FinancialStats";
import MacroeconomicsStats from "./pages/statistics/MacroeconomicsStats";
import CreditRates from "./pages/rates/CreditRates";
import DepositRates from "./pages/rates/DepositRates";
import MortgageRates from "./pages/rates/MortgageRates";
import RatesKeyRate from "./pages/rates/KeyRate";
import RatesMonetaryPolicy from "./pages/rates/MonetaryPolicy";
import RatesInflation from "./pages/rates/Inflation";
import RatesForecasts from "./pages/rates/Forecasts";
import Regulations from "./pages/Regulations";
import PressCenter from "./pages/PressCenter";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ClientProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/employee" element={<EmployeePanel />} />
                <Route path="/client" element={<ClientDashboard />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/management" element={<Management />} />
                <Route path="/about/structure" element={<Structure />} />
                <Route path="/about/reports" element={<Reports />} />
                <Route path="/monetary-policy" element={<Policy />} />
                <Route path="/monetary-policy/key-rate" element={<KeyRate />} />
                <Route path="/monetary-policy/inflation" element={<Inflation />} />
                <Route path="/monetary-policy/forecasts" element={<Forecasts />} />
                <Route path="/markets/interbank" element={<InterbankMarket />} />
                <Route path="/markets/currency" element={<CurrencyMarket />} />
                <Route path="/markets/securities" element={<SecuritiesMarket />} />
                <Route path="/statistics/banking" element={<BankingStats />} />
                <Route path="/statistics/financial" element={<FinancialStats />} />
                <Route path="/statistics/macroeconomics" element={<MacroeconomicsStats />} />
                <Route path="/rates/credit" element={<CreditRates />} />
                <Route path="/rates/deposits" element={<DepositRates />} />
                <Route path="/rates/mortgage" element={<MortgageRates />} />
                <Route path="/rates/key-rate" element={<RatesKeyRate />} />
                <Route path="/rates/monetary-policy" element={<RatesMonetaryPolicy />} />
                <Route path="/rates/inflation" element={<RatesInflation />} />
                <Route path="/rates/forecasts" element={<RatesForecasts />} />
                <Route path="/regulations" element={<Regulations />} />
                <Route path="/press-center" element={<PressCenter />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </ClientProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
