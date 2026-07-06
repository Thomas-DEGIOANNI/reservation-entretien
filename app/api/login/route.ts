import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  const admins = await prisma.admin.findMany();

console.log(admins);

const admin = admins.find(
  (a) => a.email === body.email
);
  console.log("Email reçu :", body.email);
console.log("Admin trouvé :", admin);

  if (!admin) {
    return Response.json(
      { error: "Email ou mot de passe incorrect." },
      { status: 401 }
    );
  }

  const ok = await bcrypt.compare(
    body.password,
    admin.password
  );
console.log("Mot de passe OK :", ok);
  if (!ok) {
    return Response.json(
      { error: "Email ou mot de passe incorrect." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("admin", "connecte", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return Response.json({
    success: true,
  });
}