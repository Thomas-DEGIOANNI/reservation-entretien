import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-xl font-bold">
          Gestion des entretiens
        </h1>

        <div className="flex gap-6">

          <Link href="/">
            Accueil
          </Link>

          <Link href="/reservation">
            Réserver
          </Link>

          <Link href="/admin">
            Administration
          </Link>

        </div>

      </div>
    </nav>
  );
}