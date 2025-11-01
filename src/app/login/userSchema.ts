import z from "zod";

export const userSchema = z.object({
    telepon: z
        .string()
        .regex(/^08[0-9]+$/, "Nomor telepon hanya angka dan harus dimulai dengan 08")
        .min(10, "No Telepon minimal 10 digit")
        .max(13, "No Telepon maksimal 13 digit"),
    pin: z
        .string()
        .regex(/^[0-9]+$/, "PIN hanya angka")
        .min(6, "PIN anda salah"),
})

export type UserFormData = z.infer<typeof userSchema>