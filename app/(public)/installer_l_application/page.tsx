'use client'

export default function InstallerApplicationPage() {
  return (
    <section className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Installer l’application MPR & CS
      </h1>

      <p className="text-gray-700">
        La plateforme MPR & CS est une application web progressive (PWA).
        Elle peut être installée sur votre appareil comme une application
        mobile ou ordinateur, sans passer par un store.
      </p>

      {/* ANDROID */}
      <div className="border rounded p-4 space-y-2">
        <h2 className="font-semibold text-lg">📱 Android</h2>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
          <li>Ouvrez le site MPR & CS dans Google Chrome</li>
          <li>Appuyez sur le menu ⋮ (en haut à droite)</li>
          <li>Sélectionnez <strong>« Ajouter à l’écran d’accueil »</strong></li>
          <li>Confirmez l’installation</li>
        </ol>
      </div>

      {/* IOS */}
      <div className="border rounded p-4 space-y-2">
        <h2 className="font-semibold text-lg">📱 iPhone / iPad</h2>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
          <li>Ouvrez le site dans Safari</li>
          <li>Appuyez sur l’icône <strong>Partager</strong></li>
          <li>Sélectionnez <strong>« Sur l’écran d’accueil »</strong></li>
          <li>Validez</li>
        </ol>
      </div>

      {/* PC */}
      <div className="border rounded p-4 space-y-2">
        <h2 className="font-semibold text-lg">💻 Ordinateur (PC / Mac)</h2>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
          <li>Ouvrez le site dans Chrome ou Edge</li>
          <li>Cliquez sur l’icône d’installation dans la barre d’adresse</li>
          <li>Confirmez l’installation</li>
        </ol>
      </div>

      <div className="bg-green-50 border border-green-200 rounded p-4 text-sm text-green-700">
        Une fois installée, l’application fonctionne plus rapidement
        et permet la lecture hors ligne des livres téléchargés.
      </div>
    </section>
  )
}