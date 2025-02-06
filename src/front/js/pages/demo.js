import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Función para decodificar el token JWT y extraer el nombre del usuario
const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decodificando el token", error);
        return null;
    }
};

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        try {
            const response = await fetch(process.env.BACKEND_URL+"/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                   
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Almacena el token en el almacenamiento local
                localStorage.setItem("token", data.access_token);


                // Decodificar el token para obtener el nombre del usuario
                const decoded = decodeJWT(data.access_token);
                const username = `${decoded?.firstname || "Usuario"} ${decoded?.lastname || "Anónimo"}`;

                // Almacena el nombre del usuario en localStorage
                localStorage.setItem("username", username);

                // Redirige a la vista "/inicio"
                navigate("/inicio");
            } else {
                const errorMessage = await response.text();
                    setError(errorMessage || "Credenciales incorrectas");
                if (response.status === 404) {
                    // Si es un 404, significa que el usuario no está registrado
                    setError("Usuario no registrado");
                    alert("Usuario No Registrado"); // Alerta cuando el correo no está en la base de datos
                } else {
                    // Para otros errores, como credenciales incorrectas
                    setError(errorMessage || "Credenciales incorrectas");
                    alert("Correo Electrónico y Contraseña No Coinciden.");
                }
            }
        } catch (err) {
            setError("Ocurrió un error. Inténtalo de nuevo.");
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="form-container shadow p-4 formLogin" style={{ width: "400px" }}>
                <div className="text-center">
                    <h1 className=" mb-2 tituloLogin">¡Bienvenido!</h1>
                    <h3 className="mb-4 subtLogin">Inicia Sesión</h3>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="datos text-dark mb-2">
                        <label className="w-100">Correo Electrónico</label>
                        <input
                            className="form-control w-100"
                            type="text"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="w-100">Contraseña</label>
                        <input
                            className="form-control w-100 mb-3"
                            type="password"
                            placeholder="Ingresa tu Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100 btnLogin text-dark">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};