import { useState } from "react";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {page !== "home" && (
        <button onClick={() => setPage("home")}>
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