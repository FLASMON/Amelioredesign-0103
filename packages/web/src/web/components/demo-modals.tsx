import { Search, Users, Plus, Phone, Copy, CheckCheck, Sparkles } from "lucide-react";
import { Avatar, Modal } from "./chat-ui";
import { uid, clock } from "../lib/chat-data";
export default function DemoModals(props: any) {
  const {
    modal,
    setModal,
    formName,
    setFormName,
    formBody,
    setFormBody,
    formPhone,
    setFormPhone,
    formOptions,
    setFormOptions,
    chats,
    openChat,
    startCall,
    patchChat,
    notify,
    send,
    forwardMsg,
    setChats,
    chat,
    profile,
    createChat,
    groupMembers,
    setGroupMembers,
    checked,
    setChecked,
    selected,
    setSelected,
    setSelectMode,
    switchTab,
    prefs,
    setPrefs,
    setLockCode,
    setLocked,
    setStatuses,
    setPanel,
  } = props;
  return (
    <Modal title={modalTitle(modal)} onClose={() => setModal(null)} wide={modal === "all-starred"}>
      {["new", "new-call", "call-favorites", "share-contact", "forward", "add-member"].includes(
        modal,
      ) && (
        <div className="modal-content">
          <div className="list-search">
            <Search size={18} />
            <input
              aria-label="Nom"
              placeholder="Rechercher un contact"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          {modal === "new" && (
            <>
              <button
                className="detail-row"
                onClick={() => {
                  setFormName("");
                  setModal("group");
                }}
              >
                <Users size={22} />
                Nouveau groupe
              </button>
              <button
                className="detail-row"
                onClick={() => {
                  setFormName("");
                  setModal("add-contact");
                }}
              >
                <Plus size={22} />
                Nouveau contact
              </button>
            </>
          )}
          <div className="modal-contacts">
            {chats
              .filter(
                (c) =>
                  c.name.toLowerCase().includes(formName.toLowerCase()) &&
                  (!["share-contact", "add-member"].includes(modal) || !c.group),
              )
              .map((c) => (
                <button
                  className="chat-row"
                  key={c.id}
                  onClick={() => {
                    if (modal === "new") openChat(c);
                    if (modal === "new-call") startCall(c.name);
                    if (modal === "call-favorites") {
                      patchChat(c.id, { favorite: true });
                      notify("Contact ajouté aux favoris");
                    }
                    if (modal === "share-contact")
                      send({ kind: "contact", text: c.name, size: c.phone });
                    if (modal === "forward" && forwardMsg) {
                      setChats((cs) =>
                        cs.map((x) =>
                          x.id === c.id
                            ? {
                                ...x,
                                messages: [
                                  ...x.messages,
                                  { ...forwardMsg, id: uid(), mine: true, time: clock() },
                                ],
                                preview: forwardMsg.text || "Message transféré",
                                date: clock(),
                              }
                            : x,
                        ),
                      );
                      notify("Message transféré");
                    }
                    if (modal === "add-member" && chat) {
                      patchChat(chat.id, {
                        phone: `${parseInt(chat.phone) + 1} membres`,
                        messages: [
                          ...chat.messages,
                          {
                            id: uid(),
                            text: `${c.name} a été ajouté au groupe (démo).`,
                            mine: false,
                            time: clock(),
                          },
                        ],
                      });
                    }
                    setModal(null);
                    setFormName("");
                  }}
                >
                  <Avatar chat={c} />
                  <span>
                    {c.name}
                    <small>{c.phone}</small>
                  </span>
                  {modal === "new-call" && <Phone size={18} />}
                </button>
              ))}
          </div>
        </div>
      )}
      {["add-contact", "edit-contact", "group", "community", "channel"].includes(modal) && (
        <form
          className="modal-content form"
          onSubmit={(e) => {
            e.preventDefault();
            if (modal === "edit-contact" && chat) {
              patchChat(chat.id, { name: formName, phone: formPhone });
              setModal(null);
            } else createChat(["group", "community", "channel"].includes(modal));
          }}
        >
          <label>
            {["group", "community", "channel"].includes(modal) ? "Nom" : "Nom du contact"}
            <input
              aria-label="Nom"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder={modal === "group" ? "Sujet du groupe" : "Nom"}
            />
          </label>
          {["add-contact", "edit-contact"].includes(modal) && (
            <label>
              Numéro de téléphone
              <input
                aria-label="Numéro de téléphone"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="+261 …"
              />
            </label>
          )}
          {["group", "community"].includes(modal) && (
            <>
              <p>Choisissez les membres</p>
              <div className="member-select">
                {chats
                  .filter((c) => !c.group)
                  .map((c) => (
                    <label key={c.id}>
                      <input
                        aria-label={c.name}
                        type="checkbox"
                        checked={groupMembers.includes(c.id)}
                        onChange={() =>
                          setGroupMembers((ids) =>
                            ids.includes(c.id) ? ids.filter((id) => id !== c.id) : [...ids, c.id],
                          )
                        }
                      />
                      <Avatar chat={c} size={30} />
                      {c.name}
                    </label>
                  ))}
              </div>
            </>
          )}
          <button className="primary" type="submit">
            {modal === "edit-contact" ? "Enregistrer" : "Créer"}
          </button>
        </form>
      )}
      {modal === "poll" && (
        <form
          className="modal-content form"
          onSubmit={(e) => {
            e.preventDefault();
            const options = formOptions.split("\n").filter(Boolean);
            if (options.length < 2) {
              notify("Ajoutez au moins deux réponses");
              return;
            }
            send({ kind: "poll", text: formBody, options, votes: options.map(() => 0) });
            setModal(null);
          }}
        >
          <label>
            Question
            <input
              aria-label="Question ou description"
              required
              value={formBody}
              onChange={(e) => setFormBody(e.target.value)}
              placeholder="Posez une question"
            />
          </label>
          <label>
            Réponses (une par ligne)
            <textarea
              aria-label="Réponses"
              value={formOptions}
              onChange={(e) => setFormOptions(e.target.value)}
              rows={4}
            />
          </label>
          <button className="primary">Envoyer le sondage</button>
        </form>
      )}
      {modal === "event" && (
        <form
          className="modal-content form"
          onSubmit={(e) => {
            e.preventDefault();
            send({
              kind: "event",
              text: formName,
              size: new Date(formBody).toLocaleString("fr-FR"),
            });
            setModal(null);
          }}
        >
          <label>
            Nom de l’événement
            <input
              aria-label="Nom"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </label>
          <label>
            Date et heure
            <input
              aria-label="Question ou description"
              type="datetime-local"
              required
              value={formBody}
              onChange={(e) => setFormBody(e.target.value)}
            />
          </label>
          <button className="primary">Créer l’événement</button>
        </form>
      )}
      {modal === "new-status" && (
        <form
          className="modal-content form"
          onSubmit={(e) => {
            e.preventDefault();
            setStatuses((s) => [
              {
                name: profile.name,
                text: formBody,
                color: "#315448",
                time: `Aujourd’hui, ${clock()}`,
              },
              ...s,
            ]);
            setModal(null);
          }}
        >
          <p>Ce statut n’est visible que dans votre navigateur.</p>
          <label>
            Votre statut
            <textarea
              aria-label="Question ou description"
              required
              placeholder="Quoi de neuf ?"
              value={formBody}
              onChange={(e) => setFormBody(e.target.value)}
              rows={4}
            />
          </label>
          <button className="primary">Publier le statut</button>
        </form>
      )}
      {modal === "view-status" && (
        <div className="status-view">
          <small>{formName}</small>
          <p>{formBody}</p>
          <div className="status-progress" />
        </div>
      )}
      {modal === "view-channel" && (
        <div className="modal-content">
          <h2>{formName}</h2>
          <p>
            Bienvenue sur cette chaîne de démonstration. Retrouvez ici les annonces et actualités de
            votre communauté.
          </p>
          <div className="channel-post">
            <small>Aujourd’hui</small>
            <p>Une nouvelle semaine, de nouvelles idées. Merci de suivre notre chaîne !</p>
          </div>
          <button
            className="primary"
            onClick={() => {
              notify(`Vous suivez ${formName} dans la démo`);
              setModal(null);
            }}
          >
            Suivre la chaîne
          </button>
        </div>
      )}
      {modal === "dial" && (
        <div className="modal-content dial">
          <input
            aria-label="Numéro de téléphone"
            placeholder="Numéro de téléphone"
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
          />
          <div>
            {"123456789*0#".split("").map((n) => (
              <button key={n} onClick={() => setFormPhone((p) => p + n)}>
                {n}
              </button>
            ))}
          </div>
          <button
            className="primary"
            disabled={!formPhone.trim()}
            onClick={() => startCall(formPhone)}
          >
            <Phone size={20} />
            Appeler (simulation)
          </button>
        </div>
      )}
      {modal === "call-link" && (
        <div className="modal-content form">
          <p>Ce lien ouvre uniquement cette démonstration, pas un appel WhatsApp réel.</p>
          <label>
            Type d’appel
            <select value={formBody || "Vidéo"} onChange={(e) => setFormBody(e.target.value)}>
              <option>Vidéo</option>
              <option>Audio</option>
            </select>
          </label>
          <input
            aria-label="Lien d’appel"
            readOnly
            value={`${location.origin}/?demo-call=${selected || "group"}`}
          />
          <button
            className="primary"
            onClick={() => {
              navigator.clipboard
                ?.writeText(`${location.origin}/?demo-call=${selected || "group"}`)
                .then(() => notify("Lien copié"));
              setModal(null);
            }}
          >
            <Copy size={17} />
            Copier le lien
          </button>
        </div>
      )}
      {["clear", "delete-chat", "delete-message", "block", "report", "logout"].includes(modal) && (
        <div className="modal-content">
          <p>
            {modal === "clear"
              ? `Effacer tous les messages avec ${chat?.name} ?`
              : modal === "delete-chat"
                ? `Supprimer la discussion avec ${chat?.name} ?`
                : modal === "delete-message"
                  ? `Supprimer ${checked.length} message(s) de ce navigateur ?`
                  : modal === "block"
                    ? `${chat?.blocked ? "Débloquer" : "Bloquer"} ${chat?.name} dans cette démo ?`
                    : modal === "report"
                      ? "Le signalement est simulé : aucune donnée ne sera envoyée à WhatsApp."
                      : "Quitter la session de démonstration ? Vos messages restent enregistrés."}
          </p>
          <div className="modal-actions">
            <button className="secondary" onClick={() => setModal(null)}>
              Annuler
            </button>
            <button
              className="primary destructive"
              onClick={() => {
                if (chat) {
                  if (modal === "clear")
                    patchChat(chat.id, { messages: [], preview: "Aucun message" });
                  if (modal === "delete-chat") {
                    setChats((cs) => cs.filter((c) => c.id !== chat.id));
                    setSelected(null);
                  }
                  if (modal === "delete-message") {
                    patchChat(chat.id, {
                      messages: chat.messages.filter((m) => !checked.includes(m.id)),
                    });
                    setChecked([]);
                    setSelectMode(false);
                  }
                  if (modal === "block") patchChat(chat.id, { blocked: !chat.blocked });
                }
                if (modal === "report") notify("Signalement simulé enregistré");
                if (modal === "logout") {
                  setSelected(null);
                  switchTab("chats");
                  setLocked(true);
                }
                setModal(null);
              }}
            >
              Confirmer
            </button>
          </div>
        </div>
      )}
      {["theme", "ephemeral"].includes(modal) && (
        <div className="modal-content form">
          {modal === "theme" ? (
            <>
              <label>
                Thème
                <select
                  value={prefs.theme}
                  onChange={(e) => setPrefs((p) => ({ ...p, theme: e.target.value }))}
                >
                  <option>Sombre</option>
                  <option>Clair</option>
                </select>
              </label>
              <label>
                Fond d’écran
                <select
                  value={prefs.wallpaper}
                  onChange={(e) => setPrefs((p) => ({ ...p, wallpaper: e.target.value }))}
                >
                  <option>Doodles</option>
                  <option>Uni</option>
                </select>
              </label>
            </>
          ) : (
            <>
              <p>
                Préférence sauvegardée pour la démo. Les messages ne sont pas automatiquement
                supprimés.
              </p>
              {["Non", "24 heures", "7 jours", "90 jours"].map((v) => (
                <label className="radio-row" key={v}>
                  <input
                    aria-label={v}
                    type="radio"
                    checked={prefs.ephemeral === v}
                    onChange={() => setPrefs((p) => ({ ...p, ephemeral: v }))}
                  />
                  {v}
                </label>
              ))}
            </>
          )}
          <button className="primary" onClick={() => setModal(null)}>
            Terminé
          </button>
        </div>
      )}
      {modal === "lock" && (
        <form
          className="modal-content form"
          onSubmit={(e) => {
            e.preventDefault();
            if (formBody.length < 4) {
              notify("Choisissez au moins 4 caractères");
              return;
            }
            setLockCode(formBody);
            localStorage.setItem("wa-lock", JSON.stringify(formBody));
            setLocked(true);
            setModal(null);
          }}
        >
          <p>
            Verrouillage d’interface local uniquement : ce n’est pas un mécanisme de sécurité pour
            vos données.
          </p>
          <label>
            Code de verrouillage
            <input
              aria-label="Question ou description"
              type="password"
              required
              minLength={4}
              value={formBody}
              onChange={(e) => setFormBody(e.target.value)}
            />
          </label>
          <button className="primary">Verrouiller</button>
        </form>
      )}
      {modal === "all-starred" && (
        <div className="modal-content">
          {chats.flatMap((c) =>
            c.messages
              .filter((m) => m.starred)
              .map((m) => (
                <button
                  className="result-message"
                  key={m.id}
                  onClick={() => {
                    openChat(c);
                    setPanel("starred");
                    setModal(null);
                  }}
                >
                  <small>
                    {c.name} · {m.time}
                  </small>
                  <p>{m.text || m.fileName || "Pièce jointe"}</p>
                </button>
              )),
          )}
          {!chats.some((c) => c.messages.some((m) => m.starred)) && (
            <p>Aucun message important. Ouvrez le menu d’un message pour le marquer.</p>
          )}
        </div>
      )}
      {modal === "select-chats" && (
        <div className="modal-content">
          <p>Choisissez les discussions à archiver.</p>
          <div className="member-select">
            {chats
              .filter((c) => !c.archived)
              .map((c) => (
                <label key={c.id}>
                  <input
                    aria-label={c.name}
                    type="checkbox"
                    checked={checked.includes(c.id)}
                    onChange={() =>
                      setChecked((ids) =>
                        ids.includes(c.id) ? ids.filter((id) => id !== c.id) : [...ids, c.id],
                      )
                    }
                  />
                  {c.name}
                </label>
              ))}
          </div>
          <button
            className="primary"
            onClick={() => {
              setChats((cs) =>
                cs.map((c) => (checked.includes(c.id) ? { ...c, archived: true } : c)),
              );
              setChecked([]);
              setModal(null);
              setSelected(null);
            }}
          >
            Archiver la sélection
          </button>
        </div>
      )}
      {modal === "message-info" && (
        <div className="modal-content">
          <div className="quoted">
            <p>{forwardMsg?.text || forwardMsg?.fileName}</p>
          </div>
          <div className="detail-row">
            <CheckCheck className="blue" size={20} />
            <span>
              Lu<small>{forwardMsg?.time} · accusé de lecture simulé</small>
            </span>
          </div>
          <div className="detail-row">
            <CheckCheck size={20} />
            <span>
              Distribué<small>{forwardMsg?.time} · message local</small>
            </span>
          </div>
        </div>
      )}
      {modal === "ai-message" && (
        <div className="modal-content form">
          <Sparkles size={36} className="purple" />
          <p>
            Cette démo reproduit l’interface Meta AI. Aucun modèle n’est connecté et aucune réponse
            générée n’est présentée comme réelle.
          </p>
          <textarea
            aria-label="Question ou description"
            placeholder="Posez votre question"
            value={formBody}
            onChange={(e) => setFormBody(e.target.value)}
          />
          <button
            className="primary"
            onClick={() =>
              notify("Pour des réponses réelles, une intégration IA doit être ajoutée.")
            }
          >
            Essayer la démo
          </button>
        </div>
      )}
      {["privacy", "encryption", "desktop", "lists"].includes(modal) && (
        <div className="modal-content">
          <p>
            {modal === "encryption"
              ? "Cette application est une réplique indépendante. Les messages sont stockés dans le navigateur : aucun chiffrement de bout en bout, serveur de messagerie ou connexion au réseau WhatsApp n’est implémenté."
              : modal === "privacy"
                ? "Vos données de démonstration restent dans ce navigateur. N’ajoutez pas d’informations sensibles."
                : modal === "desktop"
                  ? "Vous utilisez une application web responsive. La version WhatsApp officielle pour Windows n’est pas intégrée à cette démonstration."
                  : "Utilisez les filtres Toutes, Non lues, Favoris et Groupes pour organiser vos discussions. Les favoris sont modifiables dans le menu d’une discussion."}
          </p>
          <button className="primary" onClick={() => setModal(null)}>
            Compris
          </button>
        </div>
      )}
    </Modal>
  );
}
function modalTitle(m: string) {
  const titles: Record<string, string> = {
    new: "Nouvelle discussion",
    "new-call": "Nouvel appel",
    "call-favorites": "Ajouter aux favoris",
    "share-contact": "Partager un contact",
    forward: "Transférer le message",
    "add-contact": "Ajouter un contact",
    "edit-contact": "Modifier le contact",
    group: "Nouveau groupe",
    community: "Nouvelle communauté",
    channel: "Créer une chaîne",
    poll: "Créer un sondage",
    event: "Créer un événement",
    "new-status": "Ajouter un statut",
    "view-status": "Statut",
    "view-channel": "Chaîne",
    dial: "Appeler un numéro",
    "call-link": "Créer un lien d’appel",
    clear: "Effacer la discussion",
    "delete-chat": "Supprimer la discussion",
    "delete-message": "Supprimer les messages",
    block: "Bloquer / débloquer",
    report: "Signaler un contact",
    logout: "Déconnexion",
    theme: "Thème de la discussion",
    ephemeral: "Messages éphémères",
    lock: "Verrouillage de l’application",
    "all-starred": "Messages importants",
    "select-chats": "Sélectionner les discussions",
    "message-info": "Infos du message",
    "ai-message": "Meta AI — Démonstration",
    privacy: "Confidentialité",
    encryption: "Chiffrement",
    desktop: "Application pour Windows",
    lists: "Organiser les discussions",
    "add-member": "Ajouter un membre",
  };
  return titles[m] || m;
}
