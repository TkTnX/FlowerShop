import * as z from "zod";

export const reviewSchema = z.object({
  text: z
    .string("Текст должен быть строкой")
    .min(3, "Минимальная длина текста - 20 символов"),
  rating: z
    .number("Рейтинг должен быть числом")
    .min(1, "Минимальный рейтинг - 1")
    .max(5, "Максимальный рейтинг - 5"),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
