import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Inicio = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token"); 
        if (!token) {
            navigate("/login");
            return;
        }
    }, []); 

    return (
        <div className="container d-flex justify-content-center">
            {/* Contenedor con position-relative */}
            <h1 className="position-absolute top-50 start-50 translate-middle text-white bg-dark p-3 rounded">
                TERMINAMOS!!!
            </h1>            
            <img className="img-fluid" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWpqbWs1c2lueDl4OHV0NmRocDhhZ254N2MxdTNpcjlhcmp4dmdhMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yoJC2GnSClbPOkV0eA/giphy.gif" alt="Festejo"/>
        </div>
    );
};