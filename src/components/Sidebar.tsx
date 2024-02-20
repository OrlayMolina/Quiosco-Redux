import Categoria from "./Categoria";
import { useEffect } from "react";
import { CategoriaProps } from "../types/types";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoriaActual, selectCategorias, getCategoriesAsync } from '../features/quioscoSlice';

export default function Sidebar(): JSX.Element {

    const dispatch = useDispatch();
    const categorias: CategoriaProps[] = useSelector(selectCategorias);
    const {logout, user} = useAuth({middleware: 'auth'})

    const handleClickCategoria = (categoria: CategoriaProps) => {
        dispatch(setCategoriaActual(categoria));
    }

    useEffect(() => {
        dispatch(getCategoriesAsync());
    }, []);

    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img 
                    className="w-40"
                    src="img/logo.svg" 
                    alt="imagen logo" 
                />
            </div>

            <p className="my-10 text-xl text-center font-bold">
                Hola: {user?.name}
            </p>

            <div className="mt-10">
                {categorias && categorias.map((categoria: CategoriaProps) => (
                    <Categoria
                        key={categoria.id}
                        categoria={categoria} 
                        onClickCategoria={() => handleClickCategoria(categoria)}
                    
                    />
                ))}
            </div>

            <div className="my-5 px-5">

                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                    onClick={logout}
                >
                    Cancelar Orden
                </button>

            </div>
        </aside>
    )
}
