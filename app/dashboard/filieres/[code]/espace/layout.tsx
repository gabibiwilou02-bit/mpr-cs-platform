import NavbarFiliere from "@/app/components/NavbarFiliere";

export default function FiliereLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Plus tard : rôle calculé via Supabase
  const isAdmin = false;

  return (
    <>
      <NavbarFiliere isAdmin={isAdmin} />
      <main className="min-h-screen bg-gray-100 px-6 py-8">
        {children}
      </main>
    </>
  );
}