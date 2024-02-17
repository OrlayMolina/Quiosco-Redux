import { Outlet } from "react-router-dom"

export default function AuthLayout(): JSX.Element  {
    return (
        <main className="max-w-4xl m-auto mt-10 md:mt-14 flex flex-col md:flex-row items-center">
            <img
                src="../img/logo.svg"
                alt="Imagen de logo"
                className="max-w-xs"
            />
            
            <div className="p-10 w-full">
                <Outlet />
            </div>
            
        </main>
    )
}
