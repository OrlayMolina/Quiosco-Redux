import { useState, useEffect } from "react";
import { ProductoProps } from "../types/types";
import { toast } from 'react-toastify';
import { selectProducto, selectPedido, setModal, selectModal, setPedido } from "../features/quioscoSlice";
import { formatearDinero } from "../helpers";
import { useSelector, useDispatch } from "react-redux";

export default function ModalProducto(): JSX.Element  {

    const dispatch = useDispatch();
    const producto = useSelector(selectProducto);
    const pedido = useSelector(selectPedido);
    const modal = useSelector(selectModal);
    const { nombre, imagen, precio } = producto;
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);

    useEffect(()=> {
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            const productoEdicion = pedido.filter( pedidoState => pedidoState.id === producto.id)[0];

            setCantidad(productoEdicion.cantidad);
            setEdicion(true);
        }
    }, [pedido]);

    const changeModal = () => {
        const newState = !modal;
        dispatch(setModal(newState));
    }

    const handleAgregarPedido = (producto: ProductoProps) => {
        
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState);
            dispatch(setPedido(pedidoActualizado));
            toast.success('Pedido Actualizado Correctamente');

        }else {
            const productoConCantidad = { ...producto, cantidad };
            dispatch(setPedido([...pedido, productoConCantidad]));
            toast.success('Pedido Agregado');
        }
    }

    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">

                <img 
                    src={`/img/${imagen}.jpg`} 
                    alt={`Imagen producto ${nombre}`} 
                />

            </div>

            <div className="md:w-2/3">

                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            changeModal();
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                </div>

                <h1 className="text-3xl font-bold mt-5">
                    {nombre}
                </h1>

                <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(precio)}</p>

                <div className="flex gap-4 mt-5">
                    <button
                        type="button"
                        onClick={() => {
                            if (cantidad <= 1 ) return
                            setCantidad(cantidad - 1);
                        }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} stroke="currentColor" 
                            className="w-6 h-6"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                            />
                        </svg>
                    </button>
                    <p className="text-3xl">{cantidad}</p>

                    <button
                        type="button"
                        onClick={() => {
                            if (cantidad >= 5 ) return
                            setCantidad(cantidad + 1);
                        }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-6 h-6"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                            />
                        </svg>
                    </button>
                </div>

                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded-md"
                    onClick={() => {
                        handleAgregarPedido({ ...producto, cantidad });
                        changeModal();
                    }}
                >
                    {edicion ? 'Guardar Cambios' : 'Añadir al Pedido'}
                </button>
            </div>
        </div>
    )
}
