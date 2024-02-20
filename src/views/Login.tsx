import { createRef, RefObject, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

    export default function Login(): JSX.Element  {

    const emailRef: RefObject<HTMLInputElement> =  createRef();
    const passwordRef: RefObject<HTMLInputElement> = createRef();

    const [errores, setErrores] = useState<string[]>([]);
    const { login } = useAuth({
        middleware: 'guest',
        url: '/'
    });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const datos: { email: string; password: string; }  = {
            email: emailRef?.current?.value || '',
            password: passwordRef?.current?.value || '',
        }

        login(datos, setErrores);
        
    }

    return (
        <>
            <h1 className="text-4xl font-black">Inicia Sesión</h1>
            <p>Para crear un pedido debes iniciar sesión</p>

            <div className="bg-white shadow-lg rounded-md mt-10 px-5 py-10">
                <form 
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map((error, i )=> <Alerta key={i}>{error}</Alerta>): null}
                <div className="mb-4">
                    <label htmlFor="email" className="text-slate-800">
                    Email:
                    </label>
                    <input
                    type="email"
                    id="email"
                    className="mt-2 w-full p-3 bg-gray-50"
                    name="email"
                    placeholder="Tu Email"
                    ref={emailRef}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="text-slate-800">
                    Password:
                    </label>
                    <input
                    type="password"
                    id="password"
                    className="mt-2 w-full p-3 bg-gray-50"
                    name="password"
                    placeholder="Tu Password"
                    ref={passwordRef}
                    />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                />
                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/registro">
                    ¿No tienes cuenta?, Crea una
                </Link>
            </nav>
        </>
    );
}
