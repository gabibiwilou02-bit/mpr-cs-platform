'use client'

export default function FormulaireCompteVendeurAuteur() {
  return (
    <section className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">
        Formulaire de demande de création de compte vendeur
      </h1>

      <form className="space-y-8">

        {/* 1. Informations sur l’auteur */}
        <fieldset className="border rounded p-4 space-y-3">
          <legend className="font-semibold">1. Informations sur l’auteur</legend>

          <input required className="w-full border p-2 rounded" placeholder="Nom complet *" />
          <input className="w-full border p-2 rounded" placeholder="Nom d’auteur / Pseudonyme (si applicable)" />
          <input type="date" className="w-full border p-2 rounded" />
          <input required className="w-full border p-2 rounded" placeholder="Nationalité *" />
          <input required className="w-full border p-2 rounded" placeholder="Pays de résidence *" />
          <input className="w-full border p-2 rounded" placeholder="Adresse complète (facultatif)" />
        </fieldset>

        {/* 2. Informations de contact */}
        <fieldset className="border rounded p-4 space-y-3">
          <legend className="font-semibold">2. Informations de contact</legend>

          <input type="email" required className="w-full border p-2 rounded" placeholder="Adresse e-mail valide *" />
          <input required className="w-full border p-2 rounded" placeholder="Numéro de téléphone *" />
          <input className="w-full border p-2 rounded" placeholder="WhatsApp / Telegram (facultatif)" />
        </fieldset>

        {/* 3. Profil spirituel et théologique */}
        <fieldset className="border rounded p-4 space-y-3">
          <legend className="font-semibold">3. Profil spirituel et théologique</legend>

          <div className="space-y-1">
            <p>Êtes-vous chrétien(ne) ? *</p>
            <label className="mr-4"><input type="radio" name="chretien" required /> Oui</label>
            <label><input type="radio" name="chretien" /> Non</label>
          </div>

          <div className="space-y-1">
            <p>Confession chrétienne (si applicable)</p>
            <label className="block"><input type="checkbox" /> Évangélique</label>
            <label className="block"><input type="checkbox" /> Protestante</label>
            <label className="block"><input type="checkbox" /> Catholique</label>
            <label className="block"><input type="checkbox" /> Pentecôtiste</label>
            <label className="block"><input type="checkbox" /> Autre (préciser)</label>
          </div>

          <input className="w-full border p-2 rounded" placeholder="Église / Assemblée fréquentée actuellement" />
          <input className="w-full border p-2 rounded" placeholder="Pasteur ou responsable spirituel (nom, si applicable)" />
        </fieldset>

        {/* 4. Demande de création de compte BNP */}
        <fieldset className="border rounded p-4 space-y-3">
          <legend className="font-semibold">4. Demande de création de compte BNP</legend>

          <label className="block">
            <input type="checkbox" required /> Souhaitez-vous créer un compte auteur dans le Département BNP ? *
          </label>

          <p>Type de publications prévues</p>
          <label className="block"><input type="checkbox" /> Livres spirituels</label>
          <label className="block"><input type="checkbox" /> Enseignements bibliques</label>
          <label className="block"><input type="checkbox" /> Méditations / Dévotionnels</label>
          <label className="block"><input type="checkbox" /> Théologie chrétienne</label>
          <label className="block"><input type="checkbox" /> Témoignages</label>
          <label className="block"><input type="checkbox" /> Autre (préciser)</label>
        </fieldset>

        {/* 5. Déclaration doctrinale */}
        <fieldset className="border rounded p-4 space-y-2">
          <legend className="font-semibold">5. Déclaration doctrinale (OBLIGATOIRE)</legend>

          <label className="block"><input type="checkbox" required /> Je reconnais que seuls les livres chrétiens sont autorisés sur la BNP</label>
          <label className="block"><input type="checkbox" required /> Je déclare que tous mes ouvrages sont fondés sur la Bible</label>
          <label className="block"><input type="checkbox" required /> Je m’engage à ne publier aucun contenu contraire aux doctrines chrétiennes fondamentales</label>

          <p className="text-sm text-gray-600">
            Toute œuvre contenant hérésie, syncrétisme religieux, occultisme,
            ésotérisme ou doctrines anti-bibliques sera rejetée ou supprimée.
          </p>
        </fieldset>

        {/* 6. Engagement disciplinaire */}
        <fieldset className="border rounded p-4 space-y-2">
          <legend className="font-semibold">6. Engagement disciplinaire et éditorial</legend>

          <label className="block"><input type="checkbox" required /> J’accepte l’analyse et la validation de mes livres</label>
          <label className="block"><input type="checkbox" required /> J’accepte toute décision du DODV ou du Comité BNP</label>
          <label className="block"><input type="checkbox" required /> J’accepte la répartition 95% auteur / 5% ministère</label>
          <label className="block"><input type="checkbox" required /> J’accepte ces décisions sans poursuite</label>
        </fieldset>

        {/* 7. Responsabilité légale */}
        <fieldset className="border rounded p-4 space-y-2">
          <legend className="font-semibold">7. Responsabilité légale</legend>

          <label className="block"><input type="checkbox" required /> Je certifie être l’auteur légal ou détenteur des droits</label>
          <label className="block"><input type="checkbox" required /> Mes livres ne violent aucun droit d’auteur</label>
          <label className="block"><input type="checkbox" required /> J’assume l’entière responsabilité du contenu</label>
        </fieldset>

        {/* 8. Motivation */}
        <fieldset className="border rounded p-4 space-y-3">
          <legend className="font-semibold">8. Motivation de l’auteur</legend>

          <textarea required className="w-full border p-2 rounded min-h-[120px]"
            placeholder="Pourquoi souhaitez-vous publier vos livres au sein de la BNP ? *" />

          <textarea className="w-full border p-2 rounded min-h-[100px]"
            placeholder="Quel impact spirituel recherchez-vous à travers vos écrits ? (facultatif)" />
        </fieldset>

        {/* 9. Validation finale */}
        <fieldset className="border rounded p-4 space-y-2">
          <legend className="font-semibold">9. Validation finale</legend>

          <label className="block"><input type="checkbox" required /> Je certifie que toutes les informations sont exactes</label>
          <label className="block"><input type="checkbox" required /> J’accepte intégralement les conditions de la BNP et du ministère MPR & CS</label>
          <label className="block"><input type="checkbox" required /> Je comprends que l’acceptation n’est ni automatique ni garantie</label>
        </fieldset>

        {/* 10. Soumission */}
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded font-medium"
        >
          Soumettre la demande de création de compte vendeur pour auteur externe
        </button>
      </form>

      <div className="bg-green-50 border border-green-200 rounded p-4 text-sm text-green-700">
        Votre demande a été reçue avec succès.  
        Elle sera examinée par le Comité BNP et/ou le Département DODV.  
        Vous serez contacté(e) par e-mail après évaluation.
      </div>
    </section>
  )
}