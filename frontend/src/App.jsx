import { useState } from "react";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";   // ✅ MUST be here (top)

function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      {page !== "home" && (
        <button
          onClick={() => setPage("home")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginBottom: "20px",
            cursor: "pointer"
          }}
        >
          ⬅ Home
        </button>
      )}

      {page === "home" && <Home setPage={setPage} />}
      {page === "booking" && <Booking setPage={setPage} />}
      {page === "dashboard" && <Dashboard />}
      {page === "stats" && <Stats setPage={setPage} />}  {/* ✅ proper placement */}
    </div>
  );
}

export default App;