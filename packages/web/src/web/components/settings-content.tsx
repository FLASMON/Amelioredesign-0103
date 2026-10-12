import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Camera,
  Bell,
  Eye,
  CircleDashed,
  Palette,
  Star,
  Shield,
  LockKeyhole,
  Info,
} from "lucide-react";
import { IconButton, Toggle, Avatar } from "./chat-ui";
import type { Chat } from "../lib/chat-data";
export default function SettingsContent({
  setting,
  profile,
  setProfile,
  prefs,
  setPrefs,
  choosePhoto,
  back,
  openModal,
  chats,
  unblock,
}: any) {
  const [name, setName] = useState(profile.name);
  const [about, setAbout] = useState(profile.about);
  return (
    <div className="settings-content">
      <header>
        <IconButton title="Retour aux paramètres" onClick={back}>
          <ArrowLeft size={23} />
        </IconButton>
        <h2>{setting}</h2>
      </header>
      <div className="settings-body">
        {setting === "Profil" && (
          <>
            <button className="edit-profile-photo" onClick={choosePhoto}>
              {profile.avatar.startsWith("data:") ? (
                <img src={profile.avatar} alt="Profil" />
              ) : (
                <Avatar chat={{ avatar: profile.avatar }} size={180} />
              )}
              <span>
                <Camera size={24} />
                Modifier la photo
              </span>
            </button>
            <label>
              Votre nom
              <div className="editable">
                <input
                  aria-label="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  aria-label="Enregistrer le nom"
                  onClick={() => setProfile({ ...profile, name })}
                >
                  <Check size={21} />
                </button>
              </div>
            </label>
            <p>
              Il ne s’agit pas de votre nom d’utilisateur. Ce nom sera visible dans cette
              démonstration.
            </p>
            <label>
              Infos
              <div className="editable">
                <input
                  aria-label="Infos"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <button
                  aria-label="Enregistrer les infos"
                  onClick={() => setProfile({ ...profile, about })}
                >
                  <Check size={21} />
                </button>
              </div>
            </label>
          </>
        )}
        {setting === "Notifications" && (
          <>
            {[
              ["notifications", "Notifications des messages"],
              ["sounds", "Sons des notifications"],
            ].map(([key, title]) => (
              <div className="detail-row" key={key}>
                <Bell size={20} />
                <span>{title}</span>
                <Toggle
                  value={prefs[key]}
                  onChange={() => setPrefs({ ...prefs, [key]: !prefs[key] })}
                />
              </div>
            ))}
            <p>
              Préférences sauvegardées localement. Aucun message externe n’arrive dans cette démo.
            </p>
          </>
        )}
        {setting === "Confidentialité" && (
          <>
            {[
              ["online", "Afficher la présence en ligne"],
              ["readReceipts", "Confirmations de lecture"],
            ].map(([key, title]) => (
              <div className="detail-row" key={key}>
                <Eye size={20} />
                <span>{title}</span>
                <Toggle
                  value={prefs[key]}
                  onChange={() => setPrefs({ ...prefs, [key]: !prefs[key] })}
                />
              </div>
            ))}
            <h3>Contacts bloqués</h3>
            {chats
              .filter((c: Chat) => c.blocked)
              .map((c: Chat) => (
                <button key={c.id} className="detail-row" onClick={() => unblock(c.id)}>
                  <Avatar chat={c} size={35} />
                  {c.name}
                  <small>Débloquer</small>
                </button>
              ))}
            {!chats.some((c: Chat) => c.blocked) && <p>Aucun contact bloqué.</p>}
            <button className="detail-row" onClick={() => openModal("ephemeral")}>
              <CircleDashed size={20} />
              Messages éphémères
            </button>
          </>
        )}
        {setting === "Discussions" && (
          <>
            <button className="detail-row" onClick={() => openModal("theme")}>
              <Palette size={20} />
              Thème et fond d’écran<small>{prefs.theme}</small>
            </button>
            <button className="detail-row" onClick={() => openModal("all-starred")}>
              <Star size={20} />
              Messages importants
            </button>
            <p>
              Les discussions et pièces jointes sont enregistrées dans le stockage local du
              navigateur.
            </p>
          </>
        )}
        {setting === "Compte" && (
          <>
            <div className="detail-row">
              <Shield size={21} />
              <span>Notifications de sécurité</span>
              <Toggle
                value={prefs.security}
                onChange={() => setPrefs({ ...prefs, security: !prefs.security })}
              />
            </div>
            <button className="detail-row" onClick={() => openModal("lock")}>
              <LockKeyhole size={21} />
              Verrouillage de l’application
            </button>
            <button className="detail-row" onClick={() => openModal("encryption")}>
              <Info size={21} />
              Informations sur le compte de démo
            </button>
            <p>Aucun compte WhatsApp réel n’est connecté.</p>
          </>
        )}
        {setting === "Raccourcis clavier" && (
          <>
            {[
              ["Rechercher des discussions", "Ctrl / ⌘ + K"],
              ["Envoyer le message", "Entrée"],
              ["Fermer un menu ou un panneau", "Échap"],
              ["Menu du message", "Clic droit"],
            ].map(([a, b]) => (
              <div className="shortcut" key={a}>
                <span>{a}</span>
                <kbd>{b}</kbd>
              </div>
            ))}
          </>
        )}
        {setting === "Aide et commentaires" && (
          <>
            <h3>WhatsApp Web — Démo interactive</h3>
            <p>
              Réplique réalisée à partir de vos captures. Cette application indépendante n’est ni
              affiliée à WhatsApp ni connectée à ses serveurs.
            </p>
            <h3>Fonctionnement</h3>
            <p>
              Envoyez des messages, joignez vos fichiers, réagissez, répondez et créez des groupes.
              Utilisez le clic droit ou la flèche d’un message pour ouvrir ses options.
            </p>
            <h3>Limites</h3>
            <p>
              Les appels, présences, accusés de lecture et signalements sont simulés. Les fichiers
              de référence ne contiennent que les aperçus des captures. Aucun chiffrement de bout en
              bout n’est fourni.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
