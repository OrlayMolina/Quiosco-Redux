import clienteAxios from '../config/axios.ts';

const obtenerCategorias = async () => {
    try {
        const response = await clienteAxios('/api/categorias');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const obtenerProductos = async () => {
    try {
        const response = await clienteAxios('/api/productos');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { 
    obtenerCategorias,
    obtenerProductos
}