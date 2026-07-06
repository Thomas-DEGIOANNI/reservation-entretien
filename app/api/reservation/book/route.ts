import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  const body = await request.json();

  const reservation = await prisma.reservation.update({
    where: {
      id: body.id,
    },
    data: {
      nom: body.nom,
      prenom: body.prenom,
      email: body.email,
      telephone: body.telephone,
      status: "reserve",
    },
  });

  return Response.json(reservation);
}