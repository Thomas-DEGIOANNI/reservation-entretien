import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.reservation.delete({
    where: {
      id: Number(body.id),
    },
  });

  return Response.json({ success: true });
}