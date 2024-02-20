import { AxiosRequestConfig } from "axios";

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
        status: "idle" | "loading" | "failed",
        categorias: CategoriaProps[];
        categoriaActual: CategoriaProps;
        modal: boolean;
        producto: ProductoProps;
        productoArray: ProductoProps[];
        pedido: ProductoProps[];
        total: number;
    };
};

export interface AuthResponse {
    token: string;
}

export interface AuthFunctions {
    login: (datos: { email: string; password: string; }, setErrores: (errores: string[]) => void) => Promise<void>;
    registro: (datos: { email: string; password: string; }, setErrores: (errores: string[]) => void, setExito: (exito: boolean) => void) => void;
    logout: () => void;
    user: AuthResponse | null;
    error: unknown;
}