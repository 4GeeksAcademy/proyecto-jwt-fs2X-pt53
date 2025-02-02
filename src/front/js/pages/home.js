import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);


    const navigate = useNavigate();

    const handleCreateUser = async () => {
        setErrorMessages([]);
        const errors = [];

        // Validar cada campo

        if (!email.trim()) errors.push("Correo Electrónico");
        if (!password.trim()) errors.push("Contraseña");
        if (!confirmPassword.trim()) errors.push("Confirmar Contraseña");
        if (password !== confirmPassword) errors.push("Las contraseñas no coinciden");
    

        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }


        const data = { email, password };


        try {
            const res = await fetch("https://fantastic-space-pancake-jj46w9477g4gcppgw-3001.app.github.dev/api/registro", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Añade el token aquí
                }
            });

            const result = await res.json();
            if (res.status === 201) {
                alert("Registro Exitoso");
                navigate("/login");
            } else {
                setErrorMessages([result.error || "Error al registrar usuario"]);
            }
        } catch (error) {
            setErrorMessages(["Error en la conexión con el servidor"]);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center py-3">
            <div className="form-container bg-secundary shadow p-4 formRegistro" style={{ width: "400px" }}>
                <h1 className="text-center mb-4 tituloJoin">Registro de Usuario</h1>
                {errorMessages.length > 0 && (
                    <div className="alert alert-danger">
                        <h5>Por favor completa los siguientes campos:</h5>
                        <ul>
                            {errorMessages.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}


                <div className="mb-3">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Ingresa tu correo electrónico"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div>

                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Ingresa tu contraseña"                        
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="mb-3">
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirma tu Contraseña"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="btn btn-outline-secondary btnVolver text-dark">Volver</Link>
                    <button className="btn btn-primary btnRegistrar text-dark" onClick={handleCreateUser}>
                        Registrar
                    </button>
                </div>
            </div>
        </div>

    );
};