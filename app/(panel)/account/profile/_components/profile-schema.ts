/** Contrato de dados do formulário de perfil. */
export interface ProfileFormData {
  name: string;
  phone: string;
}

export const profilePhotoMaxBytes = 900 * 1024;

/** Mapeamento de erros de validação por campo do formulário. */
export type ProfileFieldErrors = Partial<Record<keyof ProfileFormData, string>>;

/** Resultado padronizado da operação de atualização de perfil. */
export type ProfileResult =
  | { success: true; message: string; data: ProfileFormData }
  | { success: false; message: string; errors?: ProfileFieldErrors };

/** Validação compartilhada para entradas do navegador e argumentos não confiáveis de server actions. */
export function validateProfile(values: unknown):
  | { success: true; data: ProfileFormData }
  | { success: false; errors: ProfileFieldErrors } {
    
  // Garante que o payload recebido seja um objeto válido
  if (!values || typeof values !== "object") {
    return {
      success: false,
      errors: { name: "Informe seu nome." },
    };
  }

  const input = values as Record<string, unknown>;
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const errors: ProfileFieldErrors = {};

  // Validação do nome: obrigatório, entre 2 e 100 caracteres
  if (name.length < 2 || name.length > 100) {
    errors.name = "Informe um nome entre 2 e 100 caracteres.";
  }

  // Validação do telefone: opcional, mas se preenchido deve respeitar o formato e ter entre 10 e 15 dígitos numéricos
  if (
    typeof input.phone !== "string" ||
    (phone &&
      (phone.length > 25 ||
        !/^[+\d\s().-]+$/.test(phone) ||
        phone.replace(/\D/g, "").length < 10 ||
        phone.replace(/\D/g, "").length > 15))
  ) {
    errors.phone = "Informe um telefone válido com DDD, ou deixe em branco.";
  }

  return Object.keys(errors).length
    ? { success: false, errors }
    : { success: true, data: { name, phone } };
}
