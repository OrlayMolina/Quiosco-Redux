import { ProductoProps } from "../types/types";
import { formatearDinero } from "../helpers";
import clienteAxios from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { selectModal } from "../features/quioscoSlice";
import { setModal, setProducto } from "../features/quioscoSlice";

export default function Producto({producto, botonAgregar = false, botonDisponible = false}: {producto: ProductoProps, botonAgregar: boolean, botonDisponible: boolean}): JSX.Element {

    const dispatch = useDispatch();
    const { nombre, imagen, precio } = producto;
    const modalBool = useSelector(selectModal);

    const toggleModal = () => {
        const newState = !modalBool;
        dispatch(setModal(newState));
    }

    const handleSetProducto = () => {
        dispatch(setProducto(producto));
    }

    const handleClickProductoAgotado = async (id: number) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await clienteAxios.put(`/api/productos/${id}`, {},  
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="border p-3 shadow bg-white">
            <img 
                src={`/img/${imagen}.jpg`}
                alt={`imagen ${nombre}`} 
                className="w-full"
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>
            </div>

            {botonAgregar && (
                <button 
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {
                        toggleModal();
                        handleSetProducto();
                    }}
                >
                    Agregar
                </button>
            )}

            {botonDisponible && (
                <button 
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => handleClickProductoAgotado(producto.id)}
                >
                    Producto Agotado
                </button>
            )}
        </div>
    )
}
