import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  const body = await request.json();

  const reservation = await prisma.reservation.update({
    where: {
      id: Number(body.id),
    },
    data: {
      status: "disponible",
      type: "disponible",

      nom: null,
      prenom: null,
      email: null,
      telephone: null,
    },
  });

  return Response.json(reservation);
}