import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CustomProps } from "../types/types";
import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import ModalProducto from "../components/ModalProducto";
import { useSelector } from "react-redux";
import { selectModal } from "../features/quioscoSlice";

const customStyles: CustomProps = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement('#root');

export default function Layout(): JSX.Element  {

    const modal = useSelector(selectModal);

    return (
        <>
            <div className="md:flex">
                <Sidebar />

                <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
                    <Outlet />
                </main>

                <Resumen />
            </div>

            <Modal isOpen={modal} style={customStyles}>
                <ModalProducto/>
            </Modal>

            <ToastContainer />
        </>
    )
}
