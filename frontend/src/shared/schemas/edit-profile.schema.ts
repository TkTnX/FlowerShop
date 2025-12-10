import * as z from "zod";

export const editProfileSchema = z.object({
  avatar: z.any().optional(),
  phone: z.string("Номер телефона должен быть строкой").optional(),
  email: z.string("E-mail должен быть строкой").optional(),
  first_name: z.string("Имя должно быть строкой").optional(),
  last_name: z.string("Фамилия должно быть строкой").optional(),
  gender: z.string("Пол должен быть строкой").optional(),
  address: z.string("Адрес должен быть строкой").optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
