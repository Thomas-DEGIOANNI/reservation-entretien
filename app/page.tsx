import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "50px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "600px",
          width: "90%",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          SMDEA
        </h1>

        <h2
          style={{
            color: "#2563eb",
            marginBottom: "30px",
          }}
        >
          Plateforme de réservation d'entretien
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: 1.6,
            marginBottom: "40px",
          }}
        >
          Bienvenue sur la plateforme de réservation des entretiens.
          <br />
          Cliquez ci-dessous pour choisir votre créneau.
        </p>

        <Link href="/reserver">
          <button
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "15px 35px",
              fontSize: "18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            📅 Réserver un entretien
          </button>
        </Link>

        <div style={{ marginTop: "40px" }}>
          <Link
            href="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontSize: "15px",
            }}
          >
            🔐 Administration
          </Link>
        </div>
      </div>
    </main>
  );
}