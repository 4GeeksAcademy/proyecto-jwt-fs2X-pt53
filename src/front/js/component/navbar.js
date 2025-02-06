import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {

    const [store, setStore] = useState([])

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("profesionales"); // Limpiar el listado de profesionales
        setStore({ userType: null, profesionales: [] }); // Limpiar el estado global
        window.location.href = "/";
    //     navigate("/");
    }


    return (
        <nav className="navbar navbar-expand-lg bg-transparent m-3">
            <div className="container">
                <div className="collapse navbar-collapse d-flex justify-content-end menu" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {token ?
                            (
                                <li className="nav-item">
                                    <a className="nav-link active text-dark mx-3 btn-cs cursor-pointer" aria-current="page" onClick={() => logout()}><strong>Cerrar Sesión</strong></a>
                                </li>
                            ) :
                            (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active text-dark register mx-3" aria-current="page" to="/"><strong>Registrate</strong></Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active text-dark login" aria-current="page" to="/login"><strong>Inicio Sesion</strong></Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>

                </div>
            </div>
        </nav>
    );
};