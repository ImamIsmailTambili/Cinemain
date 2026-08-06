import LoginForm from "@/app/Login/LoginForm";

const Page = () => {
    return (
        <div className="flex min-h-screen rounded-xl shadow-2xl">
            {/* LEFT */}
            <div className="hidden md:flex bg-blue-950 w-1/2 items-center justify-center">
                <div className="flex items-center justify-center">
                    <h1 className="lg:text-8xl md:text-7xl text-white font-logo">Cinemain</h1>
                </div>
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-sm">
                    <div className="flex items-center justify-center">
                        <h1 className="md:hidden text-5xl text-blue-950 font-logo mb-5">Cinemain</h1>
                    </div>
                    <h1 className="text-3xl font-semibold mb-6 text-center text-blue-950">
                        Hai, Admin Cinemain
                    </h1>

                    <LoginForm />

                </div>
            </div>
        </div>
    );
};

export default Page;
