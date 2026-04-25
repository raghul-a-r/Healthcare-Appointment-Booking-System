import { useState } from "react";
import API from "../api";

function Dashboard() {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const fetchSlots = () => {
    API.get(`/appointments/slots/${doctorId}?date=${date}`)
      .then(res => setSlots(res.data));
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>

      <input
        placeholder="Doctor ID"
        onChange={e => setDoctorId(e.target.value)}
      />

      <input
        type="date"
        onChange={e => setDate(e.target.value)}
      />

      <button onClick={fetchSlots}>Load</button>

      <h3>{date}</h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        marginTop: "20px"
      }}>
        {slots.map((s, i) => (
          <div
            key={i}
            style={{
              border: "1px solid black",
              padding: "10px",
              textAlign: "center",
              backgroundColor: s.is_booked ? "yellow" : "white"
            }}
          >
            <div>{formatTime(s.slot)}</div>

            {s.is_booked ? (
              <div>{s.patient_name}</div>
            ) : (
              <div>Available</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;