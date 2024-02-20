import useSWR from "swr";
import clienteAxios from "../config/axios";
import { formatearDinero } from "../helpers";
import { ProductoProps } from "../types/types";
import Spinner from "../components/Spinner";

export default function Ordenes() {

    const token = localStorage.getItem('AUTH_TOKEN');
    const fetcher = () => clienteAxios('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const { data, error, isLoading } = useSWR('/api/pedidos', fetcher);

    if(isLoading) return <div className="flex py-48 justify-center"><Spinner></Spinner></div>;

    const handleClickCompletarPedido = async (id: number) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className="text-4xl font-black">Ordenes</h1>
            <p className="text-2xl my-10">
                Administra las ordenes desde aqui
            </p>

            <div className="grid grid-cols-2 gap-6">
                {data?.data.data.map((pedido: ProductoProps[]) => (
                    <div key={pedido.id} className="p-8 bg-white rounded-lg mt-4 shadow space-y-2 border-b">
                        <h2 className="text-2xl font-bold">Orden: {pedido.id}</h2>

                        {pedido?.productos.map((producto: ProductoProps) => (
                            <div
                                key={producto.id}
                                className="border-b border-b-slate-200 py-4 last-of-type:border-none"
                            >
                                <p className="text-sm">ID: {producto.id}</p>
                                <p>{producto.nombre}</p>
                                <p>
                                    Cantidad: {''}
                                    <span className="font-bold">{producto.pivot.cantidad}</span>
                                </p>

                            </div>
                        ))}

                        <p className="text-lg font-bold text-slate-600">
                            Cliente: {''}
                            <span className="font-normal">{pedido.user.name}</span>
                        </p>

                        <p className="text-lg font-bold text-amber-600">
                            Total a Pagar: {''}
                            <span className="font-normal text-slate-600">{formatearDinero(pedido.total)}</span>
                        </p>

                        <button 
                            type="button" 
                            className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase
                            font-bold text-white text-center w-full cursor-pointer'
                            onClick={() => handleClickCompletarPedido(pedido.id)}
                        >
                            Completar Pedido
                        </button>
                    </div>
                
                ))}
            </div>
        </div>
    )
}
