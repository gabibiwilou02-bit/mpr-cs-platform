export default function DemandeIntegrationPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Demande d’intégration à un département
        </h1>

        <p className="text-center text-gray-700 mb-10">
          Cette demande est destinée aux membres inscrits sur la plateforme
          <strong> MPR & CS</strong>.  
          Toute affiliation est volontaire et soumise à validation par
          l’administration du ministère.
        </p>

        <form className="space-y-10">

          {/* 1. Informations personnelles */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              1. Informations personnelles
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input required placeholder="Nom *" className="input" />
              <input required placeholder="Prénom *" className="input" />

              <div>
                <label className="block text-sm font-medium mb-1">Sexe</label>
                <div className="flex gap-4">
                  <label><input type="radio" name="sexe" /> Masculin</label>
                  <label><input type="radio" name="sexe" /> Féminin</label>
                </div>
              </div>

              <input type="date" className="input" />
              <input required placeholder="Nationalité *" className="input" />
              <input required placeholder="Pays de résidence *" className="input" />
              <input placeholder="Ville / Commune" className="input" />
              <input placeholder="Adresse complète (facultatif)" className="input md:col-span-2" />
            </div>
          </section>

          {/* 2. Informations de contact */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              2. Informations de contact
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input required type="email" placeholder="Adresse e-mail *" className="input" />
              <input required placeholder="Téléphone principal *" className="input" />
              <input placeholder="Numéro WhatsApp (si différent)" className="input md:col-span-2" />
            </div>
          </section>

          {/* 3. Statut spirituel */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              3. Statut spirituel et ministériel
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <span>Êtes-vous déjà baptisé ?</span>
                <label><input type="radio" name="baptise" /> Oui</label>
                <label><input type="radio" name="baptise" /> Non</label>
              </div>

              <input placeholder="Date de baptême (jj/mm/aa)" className="input" />
              <input placeholder="Église / Assemblée locale fréquentée" className="input" />
              <input placeholder="Nom du Pasteur titulaire" className="input" />

              <div>
                <p className="font-medium mb-2">Fonction actuelle :</p>
                <div className="grid md:grid-cols-3 gap-2">
                  <label><input type="radio" name="fonction" /> Membre</label>
                  <label><input type="radio" name="fonction" /> Serviteur</label>
                  <label><input type="radio" name="fonction" /> Responsable</label>
                  <label><input type="radio" name="fonction" /> Pasteur / Leader</label>
                  <label><input type="radio" name="fonction" /> Autre</label>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Département */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              4. Département sollicité
            </h2>

            <select required className="input w-full">
              <option value="">-- Choisir un département --</option>
              <option>Département du Club des Semeurs (CS)</option>
              <option>Département des Guerriers Spirituels Victorieux (GSV)</option>
              <option>Département de la Promulgation du Royaume des Cieux par l’Evangélisation Stratégique(PROCES)</option>
              <option>Département de la Prière Fervente et Efficace (DPFE)</option>
              <option>Département de la Mission le Bon Samaritain (MBS)</option>
              <option>Département de la Louange et l’Adoration Sacrificielles(DLAS)</option>
              <option>Département du Service Technique (DST)</option>
              <option>Bibliothèque de la Nouvelle Pensée (BNP)</option>
              <option>Département des Organisateurs d’Evènements(DOE)</option>
              <option>Département des Femmes qui Brillent pour le Royaume(DFBR)</option>
              <option>Département de la Maison d’Édition MPR & CS</option>
            </select>

            <div className="mt-4">
              <p>Avez-vous déjà participé à une activité de ce département ?</p>
              <label><input type="radio" name="experience" /> Oui</label>
              <label className="ml-4"><input type="radio" name="experience" /> Non</label>
            </div>

            <textarea
              className="input w-full mt-3"
              rows={3}
              placeholder="Si oui, précisez votre expérience"
            />
          </section>

          {/* 5. Compétences */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              5. Compétences et dons
            </h2>

            <div className="grid md:grid-cols-2 gap-2">
              {[
                "Capacité d’enseigner",
                "Administration",
                "Bonne communication",
                "Musique / Louange",
                "Intercession / Prière",
                "Technique / Multimédia",
                "Formation",
                "Autre",
              ].map((skill) => (
                <label key={skill}>
                  <input type="checkbox" /> {skill}
                </label>
              ))}
            </div>

            <textarea
              className="input w-full mt-3"
              rows={3}
              placeholder="Dons spirituels ou capacités particulières"
            />
          </section>

          {/* 6. Motivation */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              6. Motivation et engagement
            </h2>

            <textarea
              required
              rows={4}
              className="input w-full"
              placeholder="Pourquoi souhaitez-vous être affilié(e) à ce département ? *"
            />

            <div className="mt-4">
              <p>Disponibilité estimée :</p>
              <label><input type="radio" name="dispo" /> Faible</label>
              <label className="ml-4"><input type="radio" name="dispo" /> Moyenne</label>
              <label className="ml-4"><input type="radio" name="dispo" /> Élevée</label>
            </div>

            <div className="mt-2">
              <label><input type="radio" name="formation" /> Disposé(e) à suivre une formation</label>
            </div>
          </section>

          {/* 7. Engagement */}
          <section className="bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">
              7. Engagement et validation
            </h2>

            <label><input required type="checkbox" /> Affiliation soumise à validation</label><br />
            <label><input required type="checkbox" /> Respect de la vision et de l’éthique</label><br />
            <label><input required type="checkbox" /> Exactitude des informations</label>
          </section>

          {/* Boutons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded font-semibold hover:bg-blue-800"
            >
              Soumettre la demande
            </button>

            <button
              type="reset"
              className="border px-6 py-3 rounded"
            >
              Réinitialiser
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Statut initial de la demande : <strong>En attente</strong>  
            <br />
            Une notification officielle sera envoyée par e-mail après traitement.
          </p>

        </form>
      </div>
    </main>
  );
}