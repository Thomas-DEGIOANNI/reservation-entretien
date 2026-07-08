"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;

  reservation: any;

  nom: string;
  prenom: string;
  email: string;
  telephone: string;

  setNom: (v: string) => void;
  setPrenom: (v: string) => void;
  setEmail: (v: string) => void;
  setTelephone: (v: string) => void;

  onConfirm: () => void;
};

export default function ReservationPopup({
  open,
  onClose,
  reservation,

  nom,
  prenom,
  email,
  telephone,

  setNom,
  setPrenom,
  setEmail,
  setTelephone,

  onConfirm,
}: Props) {
    return (
   <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Réserver un entretien
        </DialogTitle>
      </DialogHeader>

{reservation && (
  <>
    <p>
      <strong>Date :</strong>
    </p>

    <p>
      {new Date(reservation.start).toLocaleString("fr-FR")}
    </p>

    <input
      placeholder="Nom"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
    />

    <input
      placeholder="Prénom"
      value={prenom}
      onChange={(e) => setPrenom(e.target.value)}
    />

    <input
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      placeholder="Téléphone"
      value={telephone}
      onChange={(e) => setTelephone(e.target.value)}
    />

    {/* 👇 C'EST ICI que tu ajoutes le bouton */}

    <button
  onClick={onConfirm}
  style={{
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Confirmer la réservation
</button>

  </>
)}
      </DialogContent>
    </Dialog>
  );
}