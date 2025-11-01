import { authOptions } from "@/lib/auth"
import { UserRound } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import Logout from "./logout";
import { PencilLine, Wallet, KeyRound, Globe, FileText, CircleQuestionMark, CircleAlert, Phone } from 'lucide-react';

const page = async () => {
    const session = await getServerSession(authOptions)

    return (
        <div className="md:px-10 px-5 lg:mt-25 lg:w-3/5 w-full mx-auto">
            <div>
                <div className="flex text-sm gap-1">
                    <Link href="/">Beranda /</Link>
                    <p className="font-semibold">My m.tix</p>
                </div>
                <h1 className="text-2xl font-bold mt-10">My m.tix</h1>
                <div className="mt-5 flex items-center justify-between">
                    <div className="flex gap-3">
                        <div className="bg-blue-950 rounded-full p-3">
                            <UserRound color="white" />
                        </div>
                        <div>
                            <p className="text-xl font-semibold">{session?.user?.username ?? "Guest"}</p>
                            <p className="text-sm">{session?.user?.telepon ?? "coba"}</p>
                        </div>
                    </div>
                    <PencilLine />
                </div>
                <div className="mt-5 py-5 border-b-2 border-t-2">
                    <div className="flex items-center gap-5 rounded-xl bg-blue-950 px-5 py-3">
                        <Wallet color="white" />
                        <div className="text-white">
                            <p className="text-lg">Metode pembayaran</p>
                            <p className="text-sm">Atur kartu dan e-wallet</p>
                        </div>

                    </div>
                </div>
                <div className="border-b-2 py-5">
                    <h2 className="text-sm">Pengaturan</h2>
                    <div className="mt-5 flex font-semibold items-center gap-3">
                        <div className="rounded-full bg-blue-950 p-2">
                            <KeyRound color="white" size={20} />
                        </div>
                        <p>Keamanan akun</p>
                    </div>
                    <div className="mt-5 flex items-center gap-3 font-semibold">
                        <div className="rounded-full bg-blue-950 p-2">
                            <Globe color="white" size={20} />
                        </div>
                        <p>Bahasa</p>
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="text-sm">Lainnya</h2>
                    <div className="mt-5 flex items-center gap-3 font-semibold">
                        <div className="rounded-full bg-blue-950 p-2">
                            <FileText color="white" size={20} />
                        </div>
                        <p>Syarat penggunaan</p>
                    </div>
                    <div className="mt-5 flex items-center gap-3 font-semibold">
                        <div className="rounded-full bg-blue-950 p-2">
                            <CircleQuestionMark color="white" size={20} />
                        </div>
                        <p>Pusat bantuan</p>
                    </div>
                    <div className="mt-5 flex items-center gap-3 font-semibold">
                        <div className="rounded-full bg-blue-950 p-2">
                            <CircleAlert color="white" size={20} />
                        </div>
                        <p>Kebijakan privasi</p>
                    </div>
                    <div className="mt-5 flex items-center gap-3 font-semibold">
                        <div className="rounded-full bg-blue-950 p-2">
                            <Phone color="white" size={20} />
                        </div>
                        <p>m.tix care</p>
                    </div>
                </div>
                <Logout />
            </div>

        </div>
    )
}

export default page