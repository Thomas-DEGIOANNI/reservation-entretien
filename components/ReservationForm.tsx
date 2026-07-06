"use client";

import { useState } from "react";

type Props = {
  reservation: any;
  onSuccess: () => void;
};

export default function ReservationForm({
  reservation,
  onSuccess,
}: Props) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [reservationOk, setReservationOk] = useState(false);

  async function handleReservation() {
    const response = await fetch("/api/reservation/book", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: reservation.id,
        nom,
        prenom,
        email,
        telephone,
        status: "reserve",
      }),
    });

    if (!response.ok) {
      alert("Une erreur est survenue.");
      return;
    }

    setReservationOk(true);

setNom("");
setPrenom("");
setEmail("");
setTelephone("");

onSuccess();
  }
if (reservationOk) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        background: "#f8fff8",
        border: "1px solid #28a745",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "#28a745" }}>
        ✅ Réservation confirmée
      </h2>

      <p>
        Votre entretien a bien été réservé.
      </p>

      <p>
        Vous recevrez bientôt un e-mail de confirmation.
      </p>

      <button
        onClick={() => window.location.reload()}
      >
        Retour aux créneaux
      </button>
    </div>
  );
}
  return (
    <>
      <input
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Téléphone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleReservation}>
        Confirmer la réservation
      </button>
    </>
  );
}