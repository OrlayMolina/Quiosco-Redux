export interface CategoriaProps {
    id: number;
    icono: string;
    nombre: string;
}

export interface ProductoProps {
    id: number;
    nombre: string;
    precio: number;
    cantidad?: number;
    imagen: string;
    categoria_id: number;
}

export interface CustomProps {
    content: {
        top?: string | number;
        left?: string | number;
        bottom?: string | number;
        right?: string | number;
        transform?: "none" | "translate" | "rotate" | string;
        marginRight?: string;
    }
}

export type RootState = {
    quiosco: {
        categorias: CategoriaProps[];
        categoriaActual: CategoriaProps;
        modal: boolean;
        producto: ProductoProps;
        pedido: ProductoProps[];
        total: number;
    };
};
