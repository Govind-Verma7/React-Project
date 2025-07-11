interface CancelProps{
    onClose:()=>void;
}
const Cancel: React.FC<CancelProps> = ({onClose}) => {
    return (
        <>
            <button
                onClick={onClose}
                className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-500 cursor-pointer"
            >
                &times;
            </button>
        </>
    )
}

export default Cancel