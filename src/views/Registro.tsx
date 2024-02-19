import { createRef, RefObject, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

export default function Registro(): JSX.Element  {
    
    const nameRef: RefObject<HTMLInputElement> = createRef();
    const emailRef: RefObject<HTMLInputElement> =  createRef();
    const passwordRef: RefObject<HTMLInputElement> = createRef();
    const passwordConfirmationRef: RefObject<HTMLInputElement> = createRef();

    const [errores, setErrores] = useState<string[]>([]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const datos = {
            name: nameRef?.current?.value,
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
            password_confirmation: passwordConfirmationRef?.current?.value
        }
        try {
            const response = await clienteAxios.post('/api/registro', datos);

            console.log(response);
        } catch (error: any) {
            setErrores(Object.values(error.response.data.errors));
        }
    }

    return (
        <>
            <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
            <p>Crea tu Cuenta llenando el formulario</p>

            <div className="bg-white shadow-lg rounded-md mt-10 px-5 py-10">
                <form 
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map((error, i )=> <Alerta key={i}>{error}</Alerta>): null}
                <div className="mb-4">
                    <label htmlFor="name" className="text-slate-800">
                    Nombre:
                    </label>
                    <input
                    type="text"
                    id="name"
                    className="mt-2 w-full p-3 bg-gray-50"
                    name="name"
                    placeholder="Tu Nombre"
                    ref={nameRef}
                    />
                </div>

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

                <div className="mb-4">
                    <label htmlFor="password_confirmation" className="text-slate-800">
                    Repetir Password:
                    </label>
                    <input
                    type="password"
                    id="password_confirmation"
                    className="mt-2 w-full p-3 bg-gray-50"
                    name="password_confirmation"
                    placeholder="Repetir Password"
                    ref={passwordConfirmationRef}
                    />
                </div>

                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                />
                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/login">¿Ya tienes cuenta?, Inicia Sesión</Link>
            </nav>
        </>
    );
}
