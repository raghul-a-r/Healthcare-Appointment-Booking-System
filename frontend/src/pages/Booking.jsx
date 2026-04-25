import { useEffect, useState } from "react";
import API from "../api";

function Booking() {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    API.get("/doctors").then(res => {
      setDoctors(res.data);

      // extract unique specializations
      const specs = [...new Set(res.data.map(d => d.specialization))];
      setSpecializations(specs);
    });
  }, []);

  // filter doctors when specialization changes
  useEffect(() => {
    const filtered = doctors.filter(d => d.specialization === selectedSpec);
    setFilteredDoctors(filtered);
    setSelectedDoctor("");
  }, [selectedSpec]);

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
    .catch(err => {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) alert(detail[0].msg);
      else alert(detail || "Error");
    });
  };

  return (
    <div>
      <h2>Book Appointment</h2>

      {/* Specialization dropdown */}
      <select
        onChange={e => setSelectedSpec(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", margin: "10px" }}
      >
        <option>Select Specialization</option>
        {specializations.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>

      <br />

      {/* Doctor dropdown */}
      <select
        onChange={e => setSelectedDoctor(e.target.value)}
        disabled={!selectedSpec}
        style={{ padding: "10px", fontSize: "16px", margin: "10px" }}
      >
        <option>Select Doctor</option>
        {filteredDoctors.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <br />

      <input
        type="date"
        onChange={e => setDate(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", margin: "10px" }}
      />

      <br />

      <button
        onClick={fetchSlots}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Load Slots
      </button>

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
              <button
                onClick={() => bookSlot(s.slot)}
                style={{ padding: "5px 10px", marginTop: "5px" }}
              >
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