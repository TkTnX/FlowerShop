import * as z from "zod";

export const loginSchema = z.object({
  username: z
    .string("Имя пользователя должно быть строкой")
    .min(3, "Минимальная длина имени - 3 символа"),

  password: z
    .string("Пароль должен быть строкой")
    .min(6, "Минимальная длина пароля - 6 символов"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string("Имя пользователя должно быть строкой")
    .min(3, "Минимальная длина имени - 3 символа"),
  email: z.email("Введите корректную почту"),
  password: z
    .string("Пароль должен быть строкой")
    .min(6, "Минимальная длина пароля - 6 символов"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export type AuthSchema =
  | ({ mode: "register" } & RegisterSchema)
  | ({ mode: "login" } & LoginSchema);
