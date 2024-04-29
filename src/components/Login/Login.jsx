import { useState } from "react";
import { SERVER_URL } from "../../constants/constants";
import { socket } from "../../constants/utils";
import "./Login.css";
import ModalSimple from "../Modales/Simple/ModalSimple";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const contrasenia = formData.get("contrasenia");
    const response = await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contrasenia }),
    });
    if (response.ok) {
      const data = await response.json();
      socket.emit("nuevo-usuario-agregado", data.idCliente);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      setOpen(true);
      setError(true);
      setTitle("Error al iniciar sesión");
      setMessage("Correo electrónico o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <ModalSimple
        open={open}
        setOpen={setOpen}
        error={error}
        title={title}
        message={message}
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="iniciar">Iniciar Sesión</h2>
        <label className="label-login">
          Correo Electrónico:
          <input className="input-login" type="email" name="email" required />
        </label>

        <label className="label-login">
          Contraseña:
          <input
            className="input-login"
            type="password"
            name="contrasenia"
            required
          />
        </label>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}
