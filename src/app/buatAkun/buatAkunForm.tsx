"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { formSchema, UserFormData } from "./formSchema";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const BuatAkunForm = () => {
    const router = useRouter()
    const { register, handleSubmit, control, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: UserFormData) => {
        const response = await fetch('/api/akun', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nama: values.nama,
                telepon: values.telepon,
                email: values.email,
                gender: values.gender,
                tanggalLahir: values.tanggalLahir.toLocaleDateString('en-CA'),
                pin: values.pin,
            })
        })

        if (response.ok) {
            router.push("/login")
        } else {
            console.error("Gagal Buat Akun")
        }
    }

    return (
        <div className="lg:w-2/5 md:w-4/5 w-6/7 mx-auto">
            <h1 className="text-3xl font-semibold mb-5">Buat akun kamu</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-md p-5 shadow-2xl">
                {/* Input Nama */}
                <div className="mb-5">
                    <input
                        {...register("nama")}
                        placeholder="Nama panjang"
                        className="w-full border rounded-md p-3 border-blue-950"
                    />
                    {errors.nama && <p className="text-red-500 text-sm">{errors.nama.message}</p>}
                </div>

                {/* Input Telepon */}
                <div className="mb-5">
                    <input
                        {...register("telepon")}
                        placeholder="Nomor telepon"
                        className="w-full border rounded-md p-3 border-blue-950"
                    />
                    {errors.telepon && <p className="text-red-500 text-sm">{errors.telepon.message}</p>}
                </div>

                {/* Input Email */}
                <div className="mb-5">
                    <input
                        {...register("email")}
                        placeholder="Email"
                        className="w-full border rounded-md p-3 border-blue-950"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Input Gender */}
                <div className="mb-5">
                    <div className="border rounded-md border-blue-950 px-3">
                        <p className="text-sm py-2 font-light">Jenis kelamin</p>
                        <div className="pb-3 flex gap-5">
                            <label className="flex gap-2">
                                <input
                                    {...register("gender")}
                                    type="radio"
                                    value="Pria"
                                    className="accent-blue-950"
                                />
                                Pria
                            </label>
                            <label className="flex gap-2">
                                <input
                                    {...register("gender")}
                                    type="radio"
                                    value="Wanita"
                                    className="accent-blue-950"
                                />
                                Wanita
                            </label>
                        </div>
                    </div>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>

                {/* Input Tanggal Lahir */}
                <Controller
                    control={control}
                    name="tanggalLahir"
                    render={({ field }) => (
                        <div className="mb-5">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        id="date"
                                        className="flex w-full p-3 justify-between items-center text-black font-light rounded-md border border-blue-950"
                                    >
                                        {field.value ? field.value.toLocaleDateString() : "Tanggal Lahir"}
                                        <CalendarIcon className="size-3.5" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.tanggalLahir && <p className="text-red-500 text-sm">{errors.tanggalLahir.message}</p>}
                        </div>
                    )}
                />

                {/* Input PIN */}
                <div className="mb-5">
                    <input
                        {...register("pin")}
                        type="password"
                        placeholder="Buat PIN baru"
                        className="border rounded-md p-3 border-blue-950 w-full"
                    />
                    {errors.pin && <p className="text-red-500 text-sm">{errors.pin.message}</p>}
                </div>

                {/* Konfirmasi PIN */}
                <div className="mb-5">
                    <input
                        {...register("konfirmasiPin")}
                        type="password"
                        placeholder="Konfirmasi PIN baru"
                        className="border rounded-md p-3 border-blue-950 w-full"
                    />
                    {errors.konfirmasiPin && <p className="text-red-500 text-sm">{errors.konfirmasiPin.message}</p>}
                </div>

                <button type="submit" className="w-full rounded-full p-3 text-white bg-blue-950 ">Buat Akun</button>
            </form>
        </div >
    )
}

export default BuatAkunForm