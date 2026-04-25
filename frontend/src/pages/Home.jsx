function Home({ setPage }) {
  return (
    <div>
      <h1>Healthcare System</h1>

      <button onClick={() => setPage("booking")}>
        Book Appointment
      </button>

      <button onClick={() => setPage("dashboard")}>
        Doctor Dashboard
      </button>
    </div>
  );
}

export default Home;