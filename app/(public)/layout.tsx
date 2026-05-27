import NavbarPublic from "@/app/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarPublic />
      {children}
    </>
  );
}