"use client";
import EditReservationDialog from "./EditReservationDialog";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ReservationDialog from "./ReservationDialog";
export default function CalendarAdmin() {
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [events, setEvents] = useState<any[]>([]);
const [stats, setStats] = useState({
  disponibles: 0,
  reserves: 0,
  indisponibles: 0,
  total: 0,
});
const [selectedEvent, setSelectedEvent] = useState<any>(null);
const [openEditDialog, setOpenEditDialog] = useState(false);
function handleSelect(info: any) {
  setSelectedDate(info.start);
  setOpenDialog(true);
}
async function handleEventClick(info: any) {
  setSelectedEvent(info.event);
  setOpenEditDialog(true);
}
async function handleEventDrop(info: any) {
    console.log("EVENT DROP !");
    
  const response = await fetch("/api/reservation/move", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: Number(info.event.id),
      start: info.event.start,
      end: info.event.end,
    }),
  });

  if (!response.ok) {
    alert("Ce créneau chevauche un autre.");
    info.revert();
    return;
  }

  loadReservations();
}
async function loadReservations() {
  const response = await fetch("/api/reservation");
  const data = await response.json();
  setStats({
  disponibles: data.filter(
    (r: any) =>
      r.type === "disponible" &&
      r.status === "disponible"
  ).length,

  reserves: data.filter(
    (r: any) => r.status === "reserve"
  ).length,

  indisponibles: data.filter(
    (r: any) => r.type === "indisponible"
  ).length,

  total: data.length,
});

  setEvents(
  data.map((reservation: any) => ({
    id: reservation.id,

  title:
  reservation.status === "reserve"
    ? `${reservation.prenom} ${reservation.nom}`
    : reservation.type === "disponible"
    ? "Disponible"
    : "Indisponible",

start: reservation.start,
end: reservation.end,

    color:
      reservation.status === "reserve"
        ? "blue"
        : reservation.type === "disponible"
        ? "green"
        : "red",

    status: reservation.status,

    nom: reservation.nom,
    prenom: reservation.prenom,
    email: reservation.email,
    telephone: reservation.telephone,
  }))
);
}

async function handleSave(type: string) {
  if (!selectedDate) return;

  const endDate = new Date(selectedDate);
endDate.setHours(endDate.getHours() + 1);

  const response = await fetch("/api/reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start: selectedDate,
      end: endDate,
      type,
    }),
  });

  const reservation = await response.json();

  setEvents([
    ...events,
   {
  id: reservation.id,
  title: reservation.type === "disponible"
    ? "Disponible"
    : "Indisponible",
  start: reservation.start,
  end: reservation.end,
  color: reservation.type === "disponible"
    ? "green"
    : "red",
}
  ]);

  setOpenDialog(false);
}
useEffect(() => {
  loadReservations();
}, []);
  return (
    <>
      {message && (
        <div
          style={{
            background: "#dbeafe",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          {message}
        </div>
      )}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      background: "#22c55e",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>Disponibles</h3>
    <h1>{stats.disponibles}</h1>
  </div>

  <div
    style={{
      background: "#3b82f6",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>Réservés</h3>
    <h1>{stats.reserves}</h1>
  </div>

  <div
    style={{
      background: "#ef4444",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>Indisponibles</h3>
    <h1>{stats.indisponibles}</h1>
  </div>

  <div
    style={{
      background: "#6366f1",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>Total</h3>
    <h1>{stats.total}</h1>
  </div>
</div>
      <FullCalendar
  plugins={[
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
  ]}
  initialView="timeGridWeek"
  weekends={false}
  selectable={true}
  editable={true}
  eventDurationEditable={false}
  select={handleSelect}
  eventClick={handleEventClick}
  eventDrop={handleEventDrop}
  events={events}
  slotMinTime="08:00:00"
  slotMaxTime="18:00:00"
  height="auto"
/>
    <ReservationDialog
  open={openDialog}
  date={selectedDate}
  onClose={() => setOpenDialog(false)}
  onSave={handleSave}
/>
<EditReservationDialog
  open={openEditDialog}
  event={selectedEvent}
  onClose={() => setOpenEditDialog(false)}
   onUpdate={loadReservations}
/>
    </>
  );
}