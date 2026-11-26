import Image from "next/image";
import { UserRound } from "lucide-react";
import type { UserProfile } from "../_data-access/get-info-user";
import { ProfileForm } from "./profile-form";

export default function Profile({ user }: { user: UserProfile }) {
  const initials = user.name?.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase("pt-BR");
  const image = user.image && /^(https:\/\/|data:image\/(?:jpeg|png|webp);base64,)/.test(user.image) ? user.image : null;

  return (
    <div className="account-editorial account-enter">
      <header className="account-profile-header">
        <p className="account-eyebrow">Minha conta</p>
        <h1 className="account-title">Meu <em>perfil.</em></h1>
        <p className="account-lead">Atualize seus dados pessoais e gerencie sua senha de acesso.</p>
      </header>

      <ProfileForm name={user.name} phone={user.phone} email={user.email} hasPassword={user.hasPassword} identity={
        <div className="account-profile-identity">
          <div className="account-profile-avatar" aria-hidden="true">
            {image ? <Image src={image} alt="" fill sizes="88px" unoptimized referrerPolicy="no-referrer" className="object-cover" />
              : initials || <UserRound size={28} strokeWidth={1.5} />}
          </div>
          <div className="account-profile-identity-text">
            <h2>{user.name?.trim() || "Sua conta Moura Center"}</h2>
            {user.email && <p>{user.email}</p>}
          </div>
        </div>
      } />
    </div>
  );
}
