import { CreditCard } from "lucide-react"


const metodePembayaran = () => {
    return (
        <div className="lg:w-3/5 w-full">
            <h1 className="text-xl font-bold">
                Pilih Metode Pembayaran
            </h1>
            <div className="flex mt-10 py-3 px-5 items-center rounded-md border border-blue-950 justify-between">
                <div className="flex gap-5">
                    <input type="radio" name="pembayaran" />
                    <h1 className="text-lg">m.tix POINT</h1>
                </div>

                <div className="border border-blue-950 rounded-md">
                    <img src="mpoint.png" className="w-20 p-3" />
                </div>
            </div>
            <div className="flex mt-10 py-3 px-5 items-center rounded-md border border-blue-950 justify-between">
                <div className="flex gap-5">
                    <input type="radio" name="pembayaran" />
                    <h1 className="text-lg">BNI</h1>
                </div>

                <div className="border border-blue-950 rounded-md">
                    <img src="BNI.png" className=" w-20 p-3" />
                </div>
            </div>
            <div className="flex mt-10 py-3 px-5 items-center rounded-md border border-blue-950 justify-between">
                <div className="flex gap-5">
                    <input type="radio" name="pembayaran" />
                    <h1 className="text-lg">Credit Card / Debit Card</h1>
                </div>

                <div className="border border-blue-950 rounded-md">
                    <CreditCard className="w-20 h-10 p-1" />
                </div>
            </div>

        </div>
    )
}

export default metodePembayaran