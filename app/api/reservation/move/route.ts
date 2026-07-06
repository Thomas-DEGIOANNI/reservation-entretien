import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
console.log("MOVE API appelée");
  const body = await request.json();

  const conflit = await prisma.reservation.findFirst({
    where: {
      id: {
        not: body.id,
      },
      start: {
        lt: new Date(body.end),
      },
      end: {
        gt: new Date(body.start),
      },
    },
  });

  if (conflit) {
    return Response.json(
      { error: "Chevauchement détecté" },
      { status: 400 }
    );
  }

  const reservation = await prisma.reservation.update({
    where: {
      id: body.id,
    },
    data: {
      start: new Date(body.start),
      end: new Date(body.end),
    },
  });

  return Response.json(reservation);
}