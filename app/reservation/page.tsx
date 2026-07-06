export default function Reservation() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
        fontFamily: "Arial",
      }}
    >
      <h1>Réservation d'un entretien</h1>

      <p>Choisissez un créneau disponible.</p>

      <button
        style={{
          marginTop: "20px",
          padding: "15px 30px",
          backgroundColor: "#005A9C",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Voir les créneaux
      </button>
    </main>
  );
}