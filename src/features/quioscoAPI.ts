import axios from 'axios';

const obtenerCategorias = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/categorias');
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { 
    obtenerCategorias
}