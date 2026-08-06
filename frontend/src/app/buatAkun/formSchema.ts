import z from "zod";

export const formSchema = z
    .object({
        nama: z
            .string()
            .min(1, "Tolong Masukkan Nama Anda"),
        telepon: z
            .string()
            .regex(/^08[0-9]+$/, "Nomor telepon hanya angka dan harus dimulai dengan 08")
            .min(10, "No Telepon minimal 10 digit")
            .max(13, "No Telepon maksimal 13 digit"),
        email: z
            .string("Tolong Masukkan Email")
            .email("Email Salah"),
        gender: z
            .string()
            .min(1, "Pilih jenis kemain anda"),
        tanggalLahir: z
            .date("Pilih tanggal Lahir anda"),
        pin: z
            .string()
            .regex(/^[0-9]+$/, "PIN hanya angka")
            .length(6, "PIN hanya boleh 6 angka"),
        konfirmasiPin: z
            .string()
            .regex(/^[0-9]+$/, "PIN hanya angka")
            .length(6, "PIN hanya boleh 6 angka"),
    })
    .refine((data) => data.pin === data.konfirmasiPin, {
        path: ["konfirmasiPin"],
        message: "PIN tidak sama"
    })

export type UserFormData = z.infer<typeof formSchema>