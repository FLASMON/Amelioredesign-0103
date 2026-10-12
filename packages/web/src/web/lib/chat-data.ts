export type Message = {
  id: string;
  text: string;
  mine: boolean;
  time: string;
  kind?: "image" | "file" | "audio" | "poll" | "event" | "contact";
  src?: string;
  fileName?: string;
  size?: string;
  reply?: string;
  reaction?: string;
  starred?: boolean;
  pinned?: boolean;
  votes?: number[];
  options?: string[];
};
export type Chat = {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  preview: string;
  date: string;
  unread: number;
  group?: boolean;
  favorite?: boolean;
  archived?: boolean;
  muted?: boolean;
  blocked?: boolean;
  about?: string;
  phone: string;
  messages: Message[];
};
const msg = (
  id: string,
  text: string,
  mine = false,
  time = "14:32",
  extra: Partial<Message> = {},
): Message => ({ id, text, mine, time, ...extra });
export const initialChats: Chat[] = [
  {
    id: "gps",
    name: "DIGITALISATION GPS",
    color: "#004d4a",
    preview: "~Airtel Bickmor: Reçu",
    date: "14:41",
    unread: 15,
    group: true,
    phone: "12 membres",
    messages: [
      msg("g1", "Bonjour à tous ! La nouvelle version est disponible."),
      msg("g2", "Merci, je regarde ça tout de suite.", true),
    ],
  },
  {
    id: "quiz",
    name: "DNA Quizz DEV",
    color: "#583629",
    preview: "Djasnive Rajaona: Bonjour Pour info, Agnano test Quizz avec 20 personnes",
    date: "10:35",
    unread: 1,
    group: true,
    phone: "8 membres",
    messages: [
      msg("q1", "Bonjour ! Pour info, on teste le Quizz avec 20 personnes."),
      msg("q2", "Parfait, merci pour l’info !", true),
    ],
  },
  {
    id: "djasnive",
    name: "Djasnive Rajaona",
    avatar: "djasnive",
    color: "#ae8245",
    preview: "nisy api",
    date: "10:13",
    unread: 0,
    phone: "+261 32 44 479 72",
    about: "Faire de l’impact",
    messages: [
      msg("d1", "tafidirà zah nampiassa an’ty jame", false, "15:18"),
      msg("d2", "", false, "15:19", { kind: "image", src: "/images/document-preview.webp" }),
      msg("d3", "mety boss merci", true, "15:23"),
      msg("d4", "", true, "09:09", { kind: "image", src: "/images/school-preview.webp" }),
      msg("d5", "", false, "09:26", {
        kind: "file",
        fileName: "dokkraft-yours-en-1080p.mp4",
        size: "MP4 · 5 Mo",
      }),
      msg("d6", "", false, "09:30", {
        kind: "file",
        fileName: "dokkraft-the-fold-en-1080p.mp4",
        size: "MP4 · 7 Mo",
      }),
      msg("d7", "Publicité", false, "09:30"),
      msg("d8", "Généré par IA, nampiasa Remotion", false, "09:30"),
      msg("d9", "de feo nambarin’ny Python", false, "09:30"),
      msg("d10", "RIB nao jamé", false, "17:41"),
      msg("d11", "Azfd boss andraso jereko", true, "11:04"),
      msg("d12", "nisy api", false, "10:13"),
    ],
  },
  {
    id: "amour",
    name: "Mon Amour",
    color: "#302653",
    preview: "✓✓ http://127.0.0.1:8000/partage/HJbNkgmB9AXZ0…",
    date: "samedi",
    unread: 0,
    phone: "+261 34 12 345 67",
    messages: [
      msg("a1", "Coucou, tu vas bien ?"),
      msg("a2", "Oui, très bien ! Et toi ?", true),
      msg("a3", "Tu rentres à quelle heure ?"),
    ],
  },
  {
    id: "olnel",
    name: "OL’NEL",
    avatar: "olnel",
    color: "#6b7844",
    preview: "Efa misy vita ve le aye-aye-shop",
    date: "samedi",
    unread: 2,
    phone: "+261 34 55 019 82",
    messages: [
      msg("o1", "Efa misy vita ve le aye-aye-shop"),
      msg("o2", "Oui, je t’envoie la maquette bientôt.", true),
    ],
  },
  {
    id: "mbola",
    name: "mbolatianaratsitobaina171",
    avatar: "mbola",
    color: "#62382d",
    preview: "Vous avez réagi par ❤️ à : « https://www.youtube.com/watch… »",
    date: "vendredi",
    unread: 0,
    phone: "+261 34 22 567 80",
    messages: [
      msg("m1", "Bonjour ! Tu as vu la nouvelle vidéo ?"),
      msg("m2", "Oui, elle est super !", true),
    ],
  },
  {
    id: "tamatavy",
    name: "DNA - TAMATAVY 501",
    color: "#50372b",
    preview: "+261 32 05 737 77: ◷ En attente de ce message. Cela peut prendre…",
    date: "vendredi",
    unread: 1,
    group: true,
    phone: "19 membres",
    messages: [msg("t1", "Bienvenue dans le groupe DNA TAMATAVY !")],
  },
  {
    id: "dna",
    name: "DNA TEAM",
    avatar: "dna",
    color: "#523a32",
    preview: "Djasnive Rajaona: @FLASMON Jamé Sao de misy secret fa efa 4fois…",
    date: "vendredi",
    unread: 0,
    group: true,
    phone: "24 membres",
    messages: [
      msg("n1", "Bonjour l’équipe, on fait le point sur le projet à 15h ?"),
      msg("n2", "Ça marche pour moi.", true),
    ],
  },
  {
    id: "bezara",
    name: "BEZARA Donnat",
    avatar: "dna",
    color: "#453533",
    preview: "A réagi par 🙏 à : « Merci boss efa mahita nom fichier… »",
    date: "vendredi",
    unread: 0,
    phone: "+261 34 28 748 90",
    about: "Disponible",
    messages: [
      msg("b1", "Chef"),
      msg("b2", "ajouteko @ git anle hotely site anw"),
      msg("b3", "maquette anle gestcom ndreky zao amboary"),
      msg("b4", "Oui2 boss", true, "14:33", { reply: "Chef" }),
      msg("b5", "Ok2 boss", true, "14:33", { reply: "maquette anle gestcom ndreky zao amboary" }),
      msg("b6", "Efa mikitika azy mitsy ahy ato ka", true, "14:33", { reaction: "❤️" }),
      msg(
        "b7",
        "Boss, azafady projet am git moa nalefanao tamiko resaka gestcom iny sa powerpoint hijery azy ahy lo tsy tsaroko hoe inona izy iny ??",
        true,
        "13:53",
      ),
      msg("b8", "misy .zip zay nalefako tamnao", false, "13:53"),
      msg("b9", "de le powerpoint ngamba", false, "13:53"),
      msg("b10", "andraso jereko message tsika ato ary aloha", true, "13:54"),
      msg("b11", "", false, "13:56", {
        kind: "file",
        fileName: "Site web.zip",
        size: "ZIP · 45 Mo",
        reaction: "👍",
      }),
      msg(
        "b12",
        "Merci boss efa mahita nom fichier io jereko tato izay vao verina fitadidiana",
        true,
        "13:58",
        { reply: "Document" },
      ),
    ],
  },
  {
    id: "dev",
    name: "DEV TMS - INTERNE",
    color: "#523627",
    preview: "mbolatianaratsitobaina171: bonjour! ho ampesaina permanent ve…",
    date: "vendredi",
    unread: 142,
    group: true,
    phone: "16 membres",
    messages: [msg("v1", "bonjour! ho ampesaina permanent ve ilay serveur ?")],
  },
  {
    id: "sylvia",
    name: "Maman Sylvia",
    avatar: "sylvia",
    color: "#732323",
    preview: "✓✓ Merci",
    date: "vendredi",
    unread: 0,
    phone: "+261 32 15 643 21",
    messages: [msg("s1", "Merci", true)],
  },
  {
    id: "manjaka",
    name: "Manjaka",
    avatar: "manjaka",
    color: "#2e5d69",
    preview: "Yah2 boss be,",
    date: "jeudi",
    unread: 1,
    phone: "+261 34 58 123 88",
    messages: [msg("j1", "Yah2 boss be,")],
  },
  {
    id: "tsin",
    name: "Tsininaina RTN",
    color: "#49684f",
    preview: "✓ Ok2 boss, hiezaka ngia amita azy",
    date: "mercredi",
    unread: 0,
    phone: "+261 32 19 345 00",
    messages: [msg("r1", "Ok2 boss, hiezaka ngia amita azy", true)],
  },
  {
    id: "self",
    name: "+261 34 09 732 62 (vous)",
    avatar: "profile",
    color: "#4c7278",
    preview: "regarde cette vidéo…",
    date: "mercredi",
    unread: 0,
    phone: "+261 34 09 732 62",
    messages: [msg("me1", "Notes personnelles", true)],
  },
  {
    id: "soava",
    name: "Soava Rabehandrasana",
    color: "#757152",
    preview: "✓ Yaz izay mitsy prix igny",
    date: "mercredi",
    unread: 0,
    phone: "+261 34 50 123 00",
    messages: [msg("so1", "Yaz izay mitsy prix igny")],
  },
  {
    id: "aero",
    name: "DEV AERO JOURNEY",
    color: "#004e4c",
    preview: "Kaddafi: D’accord",
    date: "05/10/2026",
    unread: 3,
    group: true,
    phone: "7 membres",
    messages: [msg("ae1", "D’accord")],
  },
];
export const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
export const clock = () =>
  new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
