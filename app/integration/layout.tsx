import NavbarIntegration from "@app/components/NavbarIntegration";

export default function IntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarIntegration />
      {children}
    </>
  );
}