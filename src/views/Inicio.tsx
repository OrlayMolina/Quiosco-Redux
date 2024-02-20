import useSWR from 'swr';
import clienteAxios from '../config/axios';
import { useEffect } from 'react';
import { ProductoProps } from '../types/types';
import { useSelector, useDispatch } from 'react-redux';
import Producto from '../components/Producto';
import Spinner from '../components/Spinner';
import { getCategoriaActual, selectProductoArray, getProductsAsync } from '../features/quioscoSlice';

export default function Inicio(): JSX.Element {

    const dispatch = useDispatch();
    const productos = useSelector(selectProductoArray);
    const categoriaActual = useSelector(getCategoriaActual);
    const titulo = categoriaActual.nombre ? categoriaActual.nombre : 'Inicio';

    const token = localStorage.getItem('AUTH_TOKEN');
    //Consulta SWR
    const fetcher = () => clienteAxios.get('/api/productos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    
    }).then(res => res.data);
    const { data, error } = useSWR('/api/productos', fetcher);

    useEffect(() => {
        dispatch(getProductsAsync());
    }, [dispatch]);

    // Filtrar productos según la categoría actual
    const productosFiltrados = categoriaActual.id ? productos.filter(producto => producto.categoria_id === categoriaActual.id) : productos;

    if (!data) return <div className="flex py-48 justify-center"><Spinner /></div>;
    if (error) return <p>Ocurrió un error al cargar los productos.</p>;

    return (
        <>
            <h1 className='text-4xl font-black'>{titulo}</h1>
            <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación.</p>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {productosFiltrados.map((producto: ProductoProps) => (
                    <Producto 
                        key={producto.id}
                        producto={producto}
                        botonAgregar={true}
                        botonDisponible={false}
                    />
                ))}
            </div>
        </>
    )
}
