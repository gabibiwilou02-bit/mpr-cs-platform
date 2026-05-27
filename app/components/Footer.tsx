import {
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { SiOverleaf } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Ligne principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

          {/* Identité */}
          <div>
            <h3 className="font-semibold text-white mb-2">
              MPR & CS
            </h3>
            <p className="text-gray-400">
              Le ministère Œuvre pour la transformation spirituelle,
              doctrinale et missionnaire des vies par l&apos;enseignement de la parole de Dieu, l&apos;edification et le partage de l&apos;amour de Christ qui est en nous sous la direction du St-Esprit.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-2">
              Contact
            </h3>
            <p>Email : mprcsofficial04@gmail.com</p>
            <p>Email : mpr_cs.04@yahoo.com</p>
            <p className="mt-2">Tel : +509 4626 1038</p>
            <p>+509 3473 4155</p>
            <p>+509 3514 9604</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-2">
              Navigation
            </h3>
            <ul className="space-y-1">
              <li>Accueil</li>
              <li>Départements</li>
              <li>Inscription</li>
              <li>Connexion</li>
            </ul>
          </div>

          {/* Vision */}
          <div>
            <h3 className="font-semibold text-white mb-2">
              Vision du MPR & CS
            </h3>
            <p className="text-gray-400">
              Avec les deux identités que le Seigneur nous a léguées (Lumière du Monde et Sel de la Terre), nous vivons pour manifester et étendre le Royaume de Christ dans toutes les sphères qui nous sont assignées en renversant les forteresses et les faux raisonnements par la force du St-Esprit qui est en nous et avec nous.
              - 2 Corinthiens 10:4-5 
              - Ecclésiaste 11:1
            </p>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="mt-10 flex justify-center space-x-6 text-2xl">

          <a
            href="https://www.instagram.com/mpr_cs/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://x.com/mpr_cs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <FaXTwitter />
          </a>

          <a
            href="https://www.tiktok.com/@gabrielwilny?lang=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaTiktok />
          </a>

          <a
            href="http://www.youtube.com/@mprcs8612"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition"
          >
            <FaYoutube />
          </a>

          <a
            href="https://mprcs.over-blog.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            <SiOverleaf />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-gray-500">
          © 2026 – Ministère Pensée Renouvelée & Club des Semeurs (MPR & CS).  
          Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}