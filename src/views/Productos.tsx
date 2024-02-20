import useSWR from "swr";
import clienteAxios from "../config/axios";
import { ProductoProps } from "../types/types";
import Producto from "../components/Producto";
import Spinner from "../components/Spinner";

export default function Productos() {

    const token = localStorage.getItem('AUTH_TOKEN');
    const fetcher = () => clienteAxios('/api/productos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.data);

    const { data, error, isLoading } = useSWR('/api/productos', fetcher, {refreshInterval: 1000});

    if(isLoading) return <div className="flex py-48 justify-center"><Spinner></Spinner></div>;

    console.log(data);

    return (
        <div>
            <h1 className="text-4xl font-black">Productos</h1>
            <p className="text-2xl my-10">
                Maneja la disponibilidad desde aqui
            </p>

            
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {data.data.map((producto: ProductoProps) => (
                    <Producto 
                        key={producto.id}
                        producto={producto}
                        botonAgregar={false}
                        botonDisponible={true}
                    />
                ))}
            </div>
        </div>
    )
}
