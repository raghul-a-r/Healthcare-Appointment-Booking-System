import { useState } from "react";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";   // ✅ MUST be here (top)

function App() {
  const [page, setPage] = useState("home");

  return (
  <div className="page-container">
    
    {page !== "home" && (
      <button onClick={() => setPage("home")}>
        ⬅ Home
      </button>
    )}

    {page === "home" && <Home setPage={setPage} />}
    {page === "booking" && <Booking setPage={setPage} />}
    {page === "dashboard" && <Dashboard />}
    {page === "stats" && <Stats setPage={setPage} />}
    
  </div>
);
}

export default App;