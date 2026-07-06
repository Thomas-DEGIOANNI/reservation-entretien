import { prisma } from "@/lib/prisma";

export async function GET() {
  const reservations = await prisma.reservation.findMany();
  return Response.json(reservations);
}

export async function POST(request: Request) {
  const body = await request.json();

  const conflit = await prisma.reservation.findFirst({
    where: {
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
      { error: "Ce créneau chevauche un autre." },
      { status: 400 }
    );
  }

  const reservation = await prisma.reservation.create({
    data: {
      start: new Date(body.start),
      end: new Date(body.end),
      type: body.type,
    },
  });

  return Response.json(reservation);
}
export async function PUT(request: Request) {
  const body = await request.json();

if (body.start && body.end) {
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
      { error: "Ce créneau chevauche un autre." },
      { status: 400 }
    );
  }
}
  const reservation = await prisma.reservation.update({
    where: {
      id: body.id,
    },
   data: {
  start: body.start ? new Date(body.start) : undefined,
  end: body.end ? new Date(body.end) : undefined,

  type: body.type ?? undefined,

  nom: body.nom ?? undefined,
  prenom: body.prenom ?? undefined,
  email: body.email ?? undefined,
  telephone: body.telephone ?? undefined,

  status: body.status ?? undefined,
},
  });

  return Response.json(reservation);
}
