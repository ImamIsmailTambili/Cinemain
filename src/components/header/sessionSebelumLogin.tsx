import Link from "next/link"

const sessionSebelumLogin = () => {
    return (
        <div className="hidden sm:flex gap-10 items-center">
            <Link href="/login" className="font-semibold">
                Login
            </Link>
            <Link href="/buatAkun" className="font-semibold text-white py-1 px-5 rounded-full bg-blue-950">
                Buat Akun
            </Link>
        </div >
    )
}

export default sessionSebelumLogin