function Home({ setPage }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Healthcare System</h1>

      <button
        onClick={() => setPage("booking")}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          margin: "10px",
          cursor: "pointer"
        }}
      >
        Book Appointment
      </button>

      <button
        onClick={() => setPage("dashboard")}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          margin: "10px",
          cursor: "pointer"
        }}
      >
        Doctor Dashboard
      </button>
    </div>
  );
}

export default Home;