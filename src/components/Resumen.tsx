import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPedido } from "../features/quioscoSlice";
import { formatearDinero } from "../helpers";
import ResumenProducto from "./ResumenProducto";
import { setTotal, selectTotal, setPedido } from "../features/quioscoSlice";
import clienteAxios from "../config/axios";
import { toast } from "react-toastify";

export default function Resumen(): JSX.Element {

    const dispatch = useDispatch();
    const pedido = useSelector(selectPedido);
    const total = useSelector(selectTotal);

    const comprobarPedido = () => pedido.length === 0;

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post('/api/pedidos', 
            {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(data.message);
            setTimeout( () => {
                dispatch(setPedido([]));
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * (producto.cantidad ?? 0)) + total, 0);
        dispatch(setTotal(nuevoTotal));
    }, [pedido]);

    return (
        <aside className="w-72 h-screen overflow-y-scroll p-5">
            <h1 className="text-4xl font-black">Mi Pedido</h1>

            <p className="text-lg my-5">
                Aquí podrás ver el resumen y totales de tu pedido
            </p>

            <div className="py-10">
                {pedido.length === 0 ? (
                    <p className="text-center text-2xl">
                        No hay elementos en tu pedido
                    </p>
                )
                 :(
                    pedido.map(producto => (
                        <ResumenProducto 
                            key={producto.id}
                            producto={producto}
                        />
                    ))
                )}
            </div>

            <p className="text-xl mt-10">
                Total: {''}
                {formatearDinero(total)}
            </p>

            <form 
                className="w-full"
                onSubmit={handleSubmit}
            >
                <div className="mt-5">
                    <input 
                        type="submit" 
                        className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} px-5 py-2 rounded uppercase
                        font-bold text-white text-center w-full cursor-pointer`}
                        value={'Confirmar Pedido'}
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </aside>
    )
}
