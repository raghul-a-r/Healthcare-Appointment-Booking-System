import { useEffect, useState } from "react";
import API from "../api";

function Booking({ setPage }) {
  const [step, setStep] = useState("spec");

  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const [selectedSpec, setSelectedSpec] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);

  // pagination
  const [specLimit, setSpecLimit] = useState(20);
  const [docLimit, setDocLimit] = useState(20);

  useEffect(() => {
    API.get("/doctors").then(res => {
      setDoctors(res.data);

      const specs = [...new Set(res.data.map(d => d.specialization))];
      setSpecializations(specs);
    });
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(d => d.specialization === selectedSpec);
    setFilteredDoctors(filtered);
  }, [selectedSpec]);

  const fetchSlots = () => {
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

  const boxStyle = {
    border: "1px solid black",
    padding: "15px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#f9f9f9"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
    marginTop: "20px"
  };

  // ---------------- STEP 1 ----------------
  if (step === "spec") {
    return (
      <div>
        <button style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginBottom: "20px",
            cursor: "pointer"
          }} onClick={() => setPage("home")}>⬅ Previous Step</button>
        <h2>Choose Specialization</h2>

        <div style={gridStyle}>
          {specializations.slice(0, specLimit).map((s, i) => (
            <div
              key={i}
              style={boxStyle}
              onClick={() => {
                setSelectedSpec(s);
                setStep("doctor");
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {specLimit < specializations.length && (
          <button onClick={() => setSpecLimit(specLimit + 20)}>
            Load More
          </button>
        )}
      </div>
    );
  }

  // ---------------- STEP 2 ----------------
  if (step === "doctor") {
    return (
      <div>
        <button style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginBottom: "20px",
            cursor: "pointer"
          }} onClick={() => setStep("spec")}>⬅ Previous Step</button>
        <h2>Pick Your Doctor</h2>
        <p>Specialization: <b>{selectedSpec}</b></p>

        <div style={gridStyle}>
          {filteredDoctors.slice(0, docLimit).map((d) => (
            <div
              key={d.id}
              style={boxStyle}
              onClick={() => {
                setSelectedDoctor(d.id);
                setStep("slot");
              }}
            >
              {d.name}
            </div>
          ))}
        </div>

        {docLimit < filteredDoctors.length && (
          <button onClick={() => setDocLimit(docLimit + 20)}>
            Load More
          </button>
        )}
      </div>
    );
  }

  // ---------------- STEP 3 ----------------
  return (
    <div>
      <button style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginBottom: "20px",
            cursor: "pointer"
          }} onClick={() => setStep("doctor")}>⬅ Previous Step</button>

      <h2>Book Appointment</h2>
      <p><b>Specialization:</b> {selectedSpec}</p>
      <p><b>Doctor:</b> {selectedDoctor}</p>

      <input
        type="date"
        onChange={e => setDate(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />

      <br /><br />

      <button onClick={fetchSlots}>Load Slots</button>

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