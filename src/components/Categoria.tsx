import { CategoriaProps } from "../types/types";
import { getCategoriaActual } from "../features/quioscoSlice";
import { useSelector } from "react-redux";

interface CategoriasProps {
    categoria: CategoriaProps;
    onClickCategoria: () => void;
}

export default function Categoria({ categoria, onClickCategoria }: CategoriasProps): JSX.Element  {

    const categoriaActual = useSelector(getCategoriaActual);
    const { id, icono, nombre} = categoria;

    return (
        <div className={`${categoriaActual.id ===  id ? "bg-amber-400" : "bg-white"} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
            
            <img 
                src={`/img/icono_${icono}.svg`} 
                alt="Imagen icono" 
                className="w-12"
            />

            <button 
                className="text-lg font-bold cursor-pointer truncate"
                type="button"
                onClick={() => onClickCategoria()}
            >
                {nombre}
            </button>
        </div>
    )
}
