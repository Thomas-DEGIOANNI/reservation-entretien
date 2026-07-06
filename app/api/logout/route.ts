import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("admin");

  return Response.json({
    success: true,
  });
}