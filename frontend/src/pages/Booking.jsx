import { useEffect, useState } from "react";
import API from "../api";

function Booking() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    API.get("/doctors").then(res => setDoctors(res.data));
  }, []);

  const fetchSlots = () => {
    if (!selectedDoctor || !date) return;

    API.get(`/appointments/slots/${selectedDoctor}?date=${date}`)
      .then(res => setSlots(res.data));
  };

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const bookSlot = (slot) => {
    const name = prompt("Enter your name");

    API.post("/appointments", {
      doctor_id: selectedDoctor,
      patient_name: name,
      slot: slot
    })
    .then(res => {
      alert("Booked! ID: " + res.data.id);
      fetchSlots();
    })
    .catch(err => alert(err.response.data.detail));
  };

  return (
    <div>
      <h2>Book Appointment</h2>

      <select onChange={e => setSelectedDoctor(e.target.value)}>
        <option>Select Doctor</option>
        {doctors.map(d => (
          <option key={d.id} value={d.id}>
            {d.name} ({d.specialization})
          </option>
        ))}
      </select>

      <br /><br />

      <input type="date" onChange={e => setDate(e.target.value)} />

      <br /><br />

      <button onClick={fetchSlots}>Load Slots</button>

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
              <button onClick={() => bookSlot(s.slot)}>
                Available
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;