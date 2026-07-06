"use client";

import { useEffect, useState } from "react";

export default function ReservationPage() {
  const [reservations, setReservations] = useState<any[]>([]);
const [selectedReservation, setSelectedReservation] = useState<any>(null);
const [nom, setNom] = useState("");
const [prenom, setPrenom] = useState("");
const [email, setEmail] = useState("");
const [telephone, setTelephone] = useState("");
  useEffect(() => {
    async function loadReservations() {
      const response = await fetch("/api/reservation");
      const data = await response.json();

      const disponibles = data.filter(
        (reservation: any) =>
          reservation.type === "disponible" &&
          reservation.status === "disponible"
      );

      setReservations(disponibles);
    }

    loadReservations();
  }, []);

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Réserver un entretien</h1>

      <h2>Créneaux disponibles</h2>

      {reservations.length === 0 ? (
        <p>Aucun créneau disponible.</p>
      ) : (
        reservations.map((reservation) => (
         <div
  key={reservation.id}
  onClick={() => setSelectedReservation(reservation)}
  style={{
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    cursor: "pointer",
  }}
>
            <strong>
              {new Date(reservation.start).toLocaleString("fr-FR")}
            </strong>
          </div>
        ))
      )}
      {selectedReservation && (
  <div
    style={{
      marginTop: "40px",
      padding: "20px",
      border: "2px solid #2563eb",
      borderRadius: "10px",
    }}
  >
    <h2>Créneau sélectionné</h2>

    <p>
      <strong>Date :</strong>{" "}
      {new Date(selectedReservation.start).toLocaleString("fr-FR")}
    </p>

    <div style={{ marginTop: "20px" }}>

  <input
    placeholder="Nom"
    value={nom}
    onChange={(e) => setNom(e.target.value)}
    style={{ display: "block", marginBottom: "10px", width: "300px", padding: "8px" }}
  />

  <input
    placeholder="Prénom"
    value={prenom}
    onChange={(e) => setPrenom(e.target.value)}
    style={{ display: "block", marginBottom: "10px", width: "300px", padding: "8px" }}
  />

  <input
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={{ display: "block", marginBottom: "10px", width: "300px", padding: "8px" }}
  />

  <input
    placeholder="Téléphone"
    value={telephone}
    onChange={(e) => setTelephone(e.target.value)}
    style={{ display: "block", marginBottom: "20px", width: "300px", padding: "8px" }}
  />

  <button
  style={{
    padding: "10px 20px",
    cursor: "pointer",
  }}
  onClick={async () => {
    const response = await fetch("/api/reservation/book", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedReservation.id,
        nom,
        prenom,
        email,
        telephone,
      }),
    });

    if (!response.ok) {
      alert("Une erreur est survenue.");
      return;
    }

    alert("Réservation enregistrée !");

    setReservations((ancien) =>
      ancien.filter(
        (reservation) =>
          reservation.id !== selectedReservation.id
      )
    );

    setSelectedReservation(null);

    setNom("");
    setPrenom("");
    setEmail("");
    setTelephone("");
  }}
>
  Confirmer la réservation
</button>

</div>
  </div>
)}
    </main>
  );
}