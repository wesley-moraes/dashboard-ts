type ButtonFilterProps = {
    onClick: () => void;
    onReset: () => void;
}

export default function ButtonFilter({
    onClick,
    onReset
}: ButtonFilterProps) {
    return (
        <div>
            <button
                onClick={onClick}
                className="bg-[#99f2b9] text-gray-800 px-6 py-1 rounded-lg font-small hover:bg-[#88e0a8] transition-colors duration-200 shadow-sm"
            >
                Filtrar
            </button>

            <button
                onClick={onReset}
                className="bg-[#c0f7d4] text-gray-800 px-6 py-1 ml-4 rounded-lg font-small hover:bg-[#88e0a8] transition-colors duration-200 shadow-sm"
            >
                Limpar
            </button>
            
        </div>
    )
}