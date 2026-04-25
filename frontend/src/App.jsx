import { useState } from "react";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      {/* Back button ONLY for non-home pages */}
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
          ⬅ Back
        </button>
      )}

      {page === "home" && <Home setPage={setPage} />}
      {page === "booking" && <Booking />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;