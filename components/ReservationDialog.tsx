"use client";

import { useState } from "react";

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
  onClose: () => void;
  date: Date | null;
  onSave: (type: string) => void;
};

export default function ReservationDialog({
  open,
  onClose,
  date,
  onSave,
}: Props) {
  const [type, setType] = useState("disponible");
  const [duration, setDuration] = useState(30);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau créneau</DialogTitle>
        </DialogHeader>

        <div>
          <p><strong>Date sélectionnée :</strong></p>

          <p>
            {date
              ? date.toLocaleString("fr-FR")
              : "Aucun créneau sélectionné"}
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <p><strong>Type du créneau</strong></p>

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

        <DialogFooter>
          <Button onClick={onClose}>
            Fermer
          </Button>

          <Button
            onClick={() => {
              onSave(type);
            }}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}