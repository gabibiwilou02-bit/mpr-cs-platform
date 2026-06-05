import DonForm from '../../components/DonForm'

export default function DonPage() {
  return (
    <section className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Faire un Don au Ministère MPR & CS
      </h1>

      <p className="text-gray-700 text-sm text-center">
        Votre don soutient l’œuvre de Dieu à travers le ministère MPR & CS.
      </p>

      <DonForm />
    </section>
  )
}