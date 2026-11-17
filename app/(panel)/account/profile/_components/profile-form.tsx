"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ProfileFormData, profileSchema } from "./profile-schema";

interface UserProfileFormProps {
  image: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  password: string | null;
}

export function useProfileForm(user: UserProfileFormProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      image: user.image || "",
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      password: user.password || "",
    },
  });
}
