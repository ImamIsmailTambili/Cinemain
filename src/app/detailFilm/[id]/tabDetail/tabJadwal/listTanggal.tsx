interface ListTanggalProps {
    dates: string[];
    selectedDate: string | null;
    setSelectedDate: (tgl: string) => void;
}

const listTanggal = ({ dates, selectedDate, setSelectedDate }: ListTanggalProps) => {
    return (
        <div className="flex overflow-x-auto gap-5 mb-6 px-2">
            {dates.map((tgl) => (
                <button
                    key={tgl}
                    onClick={() => setSelectedDate(tgl)}
                    className={`min-w-[70px] h-16 rounded-lg flex flex-col justify-center items-center 
                  ${selectedDate === tgl
                            ? "bg-blue-950 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                >
                    <span className="capitalize text-sm">
                        {new Date(tgl).toLocaleDateString("id-ID", { weekday: "short" })}
                    </span>
                    <span className="text-xl font-bold">
                        {new Date(tgl).getDate()}
                    </span>
                </button>
            ))}
        </div>
    )
}

export default listTanggal