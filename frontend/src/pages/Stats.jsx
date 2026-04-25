import { useState } from "react";
import API from "../api";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from "chart.js";

// ✅ Register ALL required components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

function Stats({ setPage }) {
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);

  const fetchStats = () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    API.get(`/appointments/stats?date=${date}`)
      .then(res => {
        console.log("API DATA:", res.data); // 🔍 debug
        setData(res.data);
      })
      .catch(() => alert("Failed to load stats"));
  };

  // ✅ Safe chart data
  const peakChart = data
    ? {
        labels: Object.keys(data.peak_hours),
        datasets: [
          {
            label: "Appointments per Slot",
            data: Object.values(data.peak_hours)
          }
        ]
      }
    : null;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setPage("home")}>⬅ Back</button>

      <h2>Statistics Dashboard</h2>

      <input
        type="date"
        onChange={e => setDate(e.target.value)}
        style={{ padding: "8px", fontSize: "16px", marginRight: "10px" }}
      />

      <button
        onClick={fetchStats}
        style={{ padding: "8px 16px", fontSize: "16px" }}
      >
        Load Stats
      </button>

      {/* ✅ No data case */}
      {data && Object.keys(data.peak_hours).length === 0 && (
        <p>No appointments for this date</p>
      )}

      {/* ✅ Render only when valid */}
      {data && peakChart && (
        <>
          <h3>Peak Hours</h3>
          <div style={{ width: "600px", margin: "auto" }}>
            <Bar data={peakChart} />
          </div>

          <h3>Top Doctors</h3>
          <ul>
            {data.top_doctors.map((d, i) => (
              <li key={i}>
                {d.name} — {d.count}
              </li>
            ))}
          </ul>

          <h3>Top Specializations</h3>
          <ul>
            {data.top_specializations.map((s, i) => (
              <li key={i}>
                {s.specialization} — {s.count}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Stats;