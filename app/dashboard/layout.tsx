import NavbarDashboard from "../components/NavbarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarDashboard />
      <main>{children}</main>
    </>
  );
}