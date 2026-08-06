"use client"

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface AdminLoginForm {
    username: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AdminLoginForm>();

    const onSubmit = async (values: AdminLoginForm) => {
        try {
            const res = await api.post("/admin/login", values);

            console.log("Login success:", res.data);

            router.push("/Dashboard");
        } catch (err: any) {
            alert(err?.response?.data?.error || "Login gagal");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
                <input
                    type="text"
                    {...register("username", { required: true })}
                    placeholder="Username"
                    className="w-full border rounded-md p-3 border-blue-950 text-black"
                />
                {errors.username && (
                    <p className="text-sm text-red-500 mt-1">
                        Username wajib diisi
                    </p>
                )}
            </div>

            <div className="mb-5">
                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                    className="w-full border rounded-md p-3 border-blue-950 text-black"
                />
                {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                        Password wajib diisi
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full rounded-full p-3 bg-blue-950 text-white font-medium cursor-pointer"
            >
                Login
            </button>
        </form>
    )
}

export default LoginForm