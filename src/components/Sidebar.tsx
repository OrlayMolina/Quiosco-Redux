import Categoria from "./Categoria";
import { CategoriaProps } from "../types/types";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoriaActual, selectCategorias } from '../features/quioscoSlice';

export default function Sidebar(): JSX.Element {

    const dispatch = useDispatch();
    const categorias = useSelector(selectCategorias);

    const handleClickCategoria = (categoria: CategoriaProps) => {
        dispatch(setCategoriaActual(categoria));
    }

    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img 
                    className="w-40"
                    src="img/logo.svg" 
                    alt="imagen logo" 
                />
            </div>

            <div className="mt-10">
                {categorias.map((categoria: CategoriaProps) => (
                    <Categoria
                        key={categoria.id}
                        categoria={categoria} 
                        onClickCategoria={handleClickCategoria}
                    
                    />
                ))}
            </div>

            <div className="my-5 px-5">

                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                >
                    Cancelar Orden
                </button>

            </div>
        </aside>
    )
}
