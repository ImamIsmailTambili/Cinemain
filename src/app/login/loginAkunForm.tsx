"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { userSchema, UserFormData } from "./userSchema";

const loginAkunForm = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    })

    const onSubmit = async (values: UserFormData) => {
        const loginData = await signIn("credentials", {
            telepon: values.telepon,
            pin: values.pin,
            redirect: false,
        })

        if (loginData?.error) {
            console.log("Login gagal:", loginData.error)
        } else {
            router.push("/");
            router.refresh();
        }
    }

    return (
        <div className="lg:w-2/5 md:w-4/5 w-6/7 mx-auto lg:mt-30">
            <h1 className="text-3xl font-semibold mb-5">Hai, senang ketemu lagi</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 rounded-md p-5 shadow-2xl">
                <div className="flex flex-col">
                    <div className="mb-5">
                        <input
                            type="text"
                            {...register("telepon")}
                            placeholder="Nomor telepon"
                            className="w-full border rounded-md p-3 border-blue-950"
                        />
                        {errors.telepon && <p className="text-red-500 text-sm">{errors.telepon.message}</p>}
                    </div>

                    <div className="mb-5">
                        <input
                            type="text"
                            {...register("pin")}
                            placeholder="Masukkan PIN kamu"
                            className="w-full border rounded-md p-3 border-blue-950"
                        />
                        {errors.pin && <p className="text-red-500 text-sm">{errors.pin.message}</p>}
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="rounded-full w-full mb-5 p-2 bg-blue-950 text-white">
                        Login
                    </button>
                    <p className="text-blue-950 font-semibold">Lupa PIN?</p>
                </div>
            </form>

            <div className="flex text-sm justify-center mt-5 gap-1">
                <p>Gak punya akun?</p>
                <Link href="/buatAkun" className="text-blue-950">Yuk, buat akun</Link>
            </div>
        </div>
    )
}

export default loginAkunForm