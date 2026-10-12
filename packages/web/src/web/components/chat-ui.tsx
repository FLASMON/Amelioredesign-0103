import { useEffect, useRef, type ReactNode } from "react";
import { X, Users, Phone, Laptop, ShieldCheck } from "lucide-react";
import type { Chat } from "../lib/chat-data";
export function Avatar({ chat, size = 48 }: { chat: Partial<Chat>; size?: number }) {
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: chat.color || "#385552" }}
    >
      {chat.avatar ? (
        <img src={`/images/${chat.avatar}.webp`} alt="" />
      ) : chat.group ? (
        <Users size={size * 0.45} />
      ) : (
        <span>{chat.name?.[0] || "F"}</span>
      )}
    </span>
  );
}
export function IconButton({
  children,
  title,
  onClick,
  active = false,
  className = "",
}: {
  children: ReactNode;
  title: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`icon-button ${active ? "active" : ""} ${className}`}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <div className="modal-backdrop">
      <dialog
        ref={ref}
        className={`modal ${wide ? "wide" : ""}`}
        onCancel={onClose}
        aria-modal="true"
        aria-label={title}
      >
        <header>
          <h2>{title}</h2>
          <IconButton title="Fermer" onClick={onClose}>
            <X size={22} />
          </IconButton>
        </header>
        {children}
      </dialog>
    </div>
  );
}
export function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      className={`toggle ${value ? "on" : ""}`}
      onClick={onChange}
      aria-label="Activer ou désactiver la préférence"
      role="switch"
      aria-checked={value}
    >
      <span />
    </button>
  );
}
export function WelcomeArt() {
  return (
    <div className="welcome-art">
      <div className="art-screen">
        <Laptop size={112} strokeWidth={1.1} />
        <div className="art-phone">
          <Phone size={33} />
        </div>
        <div className="art-lines">
          <i />
          <i />
          <i />
        </div>
      </div>
      <span className="art-shadow" />
    </div>
  );
}
export function EncryptionNote() {
  return (
    <div className="encryption">
      <ShieldCheck size={12} /> Démo locale indépendante · Non connectée à WhatsApp
    </div>
  );
}
