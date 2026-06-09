import { Suspense } from "react";
import DemandeIntegrationClient from "./DemandeIntegrationClient";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-6">Chargement du formulaire…</p>}>
      <DemandeIntegrationClient />
    </Suspense>
  );
}