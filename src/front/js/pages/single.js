import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Inicio = () => {
    const navigate = useNavigate();
 
 

    useEffect(() => {
        // Verificar si hay un token de autenticación
        const token = localStorage.getItem("token"); // O sessionStorage.getItem("authToken")
        if (!token) {
            navigate("/login");
            return;
        }
       

    }, []); 


    return (
        <h1>Hola mundo</h1>
    );
};