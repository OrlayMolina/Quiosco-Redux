export default function MensajeConfirmacion({children}: {children: React.ReactNode}) {
    return (
        <div className='text-center my-2 bg-green-600 text-white font-bold p-3 uppercase'>
            {children}
        </div>
    )
}
