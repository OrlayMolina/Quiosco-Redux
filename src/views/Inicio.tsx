//import { productos as data } from '../data/productos.ts';
import { useEffect } from 'react';
import { ProductoProps } from '../types/types';
import { useSelector, useDispatch } from 'react-redux';
import Producto from '../components/Producto';
import { getCategoriaActual, selectProductoArray, getProductsAsync } from '../features/quioscoSlice';

export default function Inicio(): JSX.Element {

    const dispatch = useDispatch();
    const productos = useSelector(selectProductoArray);
    const categoriaActual = useSelector(getCategoriaActual);
    const titulo = categoriaActual.nombre ? categoriaActual.nombre : 'Inicio';

    //const productos = categoriaActual.id ? data.filter(producto => producto.categoria_id === categoriaActual.id) : data;
    useEffect( () => {
        dispatch(getProductsAsync());
    }, []);

    return (
        <>
            <h1 className='text-4xl font-black'>{titulo}</h1>
            <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación.</p>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {productos.map((producto: ProductoProps) => (
                    <Producto 
                        key={producto.id}
                        producto={producto}
                    />
                ))}
            </div>
        </>
    )
}
