"use client";
import ReservationPopup from "@/components/ReservationPopup";
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

      const disponibles = data
  .filter(
    (reservation: any) =>
      reservation.type === "disponible" &&
      reservation.status === "disponible"
  )
  .sort(
    (a: any, b: any) =>
      new Date(a.start).getTime() -
      new Date(b.start).getTime()
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
<ReservationPopup
  open={selectedReservation !== null}
  onClose={() => setSelectedReservation(null)}
  reservation={selectedReservation}
  nom={nom}
  prenom={prenom}
  email={email}
  telephone={telephone}
  setNom={setNom}
  setPrenom={setPrenom}
  setEmail={setEmail}
  setTelephone={setTelephone}
  onConfirm={async () => {
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
/>
<div>TEST POPUP</div>
    </main>
  );
}