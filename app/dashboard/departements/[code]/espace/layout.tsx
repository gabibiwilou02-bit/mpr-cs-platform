import NavbarDepartement from "@/app/components/NavbarDepartement";

export default function DepartementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Plus tard : calculer isAdmin via Supabase (RLS + memberships)
  const isAdmin = false;

  return (
    <>
      <NavbarDepartement isAdmin={isAdmin} />
      <main className="min-h-screen bg-gray-100 px-6 py-8">
        {children}
      </main>
    </>
  );
}