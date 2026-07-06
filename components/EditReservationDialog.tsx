"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  event: any;
  onClose: () => void;
  onUpdate: () => void;
};

export default function EditReservationDialog({
  open,
  event,
  onClose,
  onUpdate,
}: Props) {
    
    const [type, setType] = useState("disponible");

useEffect(() => {
  if (event) {
    setType(
      event.title === "Disponible"
        ? "disponible"
        : "indisponible"
    );
  }
  console.log(event);
}, [event]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le créneau</DialogTitle>
        </DialogHeader>

        {event && (
          <div>
            <p>
              <strong>Date :</strong>
            </p>

            <p>
              {new Date(event.start).toLocaleString("fr-FR")}
            </p>
<p style={{ marginTop: "20px" }}>
  <strong>Statut :</strong>{" "}
  {event.status === "reserve"
    ? "Réservé"
    : "Disponible"}
</p>
{event.status === "reserve" && (
  <div
    style={{
      marginTop: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      background: "#f8fafc",
    }}
  >
    <h3>Informations du candidat</h3>

    <p>
      <strong>Nom :</strong> {event.nom}
    </p>

    <p>
      <strong>Prénom :</strong> {event.prenom}
    </p>

    <p>
      <strong>Email :</strong> {event.email}
    </p>

    <p>
      <strong>Téléphone :</strong> {event.telephone}
    </p>
  </div>
)}
            <p style={{ marginTop: "20px" }}>
              <strong>Type :</strong>
            </p>

            <div style={{ marginTop: "10px" }}>
              {event?.status === "reserve" && (
  <div
    style={{
      marginTop: "25px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      background: "#f8fafc",
    }}
  >
    <h3>Candidat</h3>

    <p>
      <strong>Nom :</strong> {event.nom}
    </p>

    <p>
      <strong>Prénom :</strong> {event.prenom}
    </p>

    <p>
      <strong>Email :</strong> {event.email}
    </p>

    <p>
      <strong>Téléphone :</strong> {event.telephone}
    </p>
  </div>
)}
  <label>
    <input
      type="radio"
      value="disponible"
      checked={type === "disponible"}
      onChange={() => setType("disponible")}
    />
    Disponible
  </label>

  <br />

  <label>
    <input
      type="radio"
      value="indisponible"
      checked={type === "indisponible"}
      onChange={() => setType("indisponible")}
    />
    Indisponible
  </label>
</div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>

          <Button
  onClick={async () => {
    await fetch("/api/reservation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(event.id),
        type: type,
      }),
    });

    onUpdate();
    onClose();
  }}
>
  Modifier
</Button>
{event?.status === "reserve" && (
  <Button
    variant="secondary"
    onClick={async () => {
      await fetch("/api/reservation/cancel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: event.id,
        }),
      });

      onUpdate();
      onClose();
    }}
  >
    Annuler la réservation
  </Button>
)}
          <Button
  variant="destructive"
  onClick={async () => {
    const ok = confirm(
      "Voulez-vous vraiment supprimer ce créneau ?"
    );

    if (!ok) return;

    await fetch("/api/reservation/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: event.id,
      }),
    });

    onUpdate();
    onClose();
  }}
>
  Supprimer
</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}