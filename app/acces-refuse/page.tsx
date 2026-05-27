import Link from 'next/link'

export default function AccesRefusePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full text-center space-y-4 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-red-600">
          Accès refusé
        </h1>

        <p className="text-gray-600">
          Vous n’avez pas les autorisations nécessaires pour accéder à cette
          section.
        </p>

        <p className="text-sm text-gray-500">
          Si vous pensez qu’il s’agit d’une erreur, veuillez contacter
          l’administrateur ou vous reconnecter avec un compte autorisé.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-block text-sm text-blue-600 underline"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  )
}