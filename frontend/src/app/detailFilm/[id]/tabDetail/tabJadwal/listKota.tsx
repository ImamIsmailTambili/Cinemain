"use client";

interface ListKotaProps {
    cities: string[];
    selectedCity: string | null;
    setSelectedCity: (city: string) => void;
}

const listKota = ({ cities, selectedCity, setSelectedCity }: ListKotaProps) => {
    return (
        <div className="flex gap-3 mb-8 flex-wrap">
            {cities.map((city) => (
                <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${selectedCity === city
                        ? "bg-blue-950 text-white"
                        : "text-gray-600 border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    {city}
                </button>
            ))}
        </div>
    )
}

export default listKota
