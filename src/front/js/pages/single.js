import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Inicio = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
    const { store, actions } = useContext(Context);
    const [profesionalesLateral, setProfesionalesLateral] = useState([]); // Estado local para manejar el listado
    const [contactoProfesionales, setContactoProfesionales] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    console.log("Profesionales en store:", store.profesionales);

    useEffect(() => {
        // Verificar si hay un token de autenticación
        const token = localStorage.getItem("token"); // O sessionStorage.getItem("authToken")
        if (!token) {
            navigate("/login");
            return;
        }
       

    }, [navigate]); // Asegúrate de que no se ejecute innecesariamente


    return (
        <h1>Hola mundo</h1>
    );
};