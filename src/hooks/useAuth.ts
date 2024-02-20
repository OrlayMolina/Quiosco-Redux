import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useSWR from "swr";
import { AuthFunctions, AuthResponse } from "../types/types";

type Middleware = 'guest' | 'auth' |'admin';

type Url = string;

export const useAuth = ({middleware, url} : { middleware: Middleware; url: Url }): AuthFunctions => {

    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();
    
    const { data: user, error, mutate}  = useSWR('/api/user', () => 
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors);
        })
    );

    const login = async (datos: { email: string; password: string; }, setErrores: (errores: string[]) => void) =>{
        
        try {
            const {data} = await clienteAxios.post<AuthResponse>('/api/login', datos);

            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
        } catch (error: any) {
            setErrores(Object.values(error.response.data.errors));
        }    
    }

    const registro = async (datos: { email: string; password: string; }, setErrores: (errores: string[]) => void, setExito: (exito: boolean) => void) => {
        
        try {
            const {data} = await clienteAxios.post('/api/registro', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();

            setExito(true);
            setTimeout(() => {
                setExito(false);
            }, 3000);
        } catch (error: any) {
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const logout = async () => {
        try {
            await clienteAxios.post<AuthResponse>('/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined);
        } catch (error) {
            throw Error(error?.response?.data?.errors);
        }
    }

    useEffect(() => {
        if(middleware === 'guest' && url && user) {
            navigate(url);
        }
        if(middleware === 'guest' && user && user.admin){
            navigate('/admin');
        }
        if(middleware === 'admin' && user && !user.admin){
            navigate('/');
        }
        if(middleware === 'auth' && error != null){
            navigate('/auth/login');
        }
    }, [user, error]);

    return {
        login,
        registro,
        logout,
        user,
        error
    }
}