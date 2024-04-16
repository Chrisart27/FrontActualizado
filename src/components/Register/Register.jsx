import "./Register.css";
import { SERVER_URL } from "../../constants/constants";
import { validateFields } from "../../constants/utils";
import ModalSimple from "../Modales/Simple/ModalSimple";
import { useState } from "react";

export default function Register() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre");
    const email = formData.get("email");
    const telefono = formData.get("telefono");
    const contrasenia = formData.get("contrasenia");
    const rol = 2;

    let fields;
    try {
      fields = validateFields(nombre, email, telefono, contrasenia, rol);
    } catch (error) {
      setError(true);
      setOpen(true);
      setTitle("Error en el registro");
      setMessage(error.message);
      return;
    }
    console.log(fields);
    const response = await fetch(`${SERVER_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    if (response.ok) {
      setError(false);
      setOpen(true);
      setTitle("Registro exitoso");
      setMessage("El usuario se ha registrado correctamente.");
      window.location.href = "/";
    } else {
      const errorData = await response.json(); // Intenta parsear la respuesta como JSON
      console.error("Error al registrar el usuario:", errorData);
      setError(true);
      setOpen(true);
      setTitle("Error en el registro");
      setMessage(
        "Error al registrar el usuario. Consulta la consola para más detalles."
      );
    }
  };

  return (
    <section className="registro-container">
      <ModalSimple
        open={open}
        setOpen={setOpen}
        error={error}
        title={title}
        message={message}
      />
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="tituloRegister">Registro</h2>
        <label className="label-register">
          Usuario:
          <input className="input-register" type="nombre" name="nombre" />
        </label>
        <label className="label-register">
          Correo electrónico:
          <input className="input-register" type="email" name="email" />
        </label>
        <label className="label-register">
          Número telefónico:
          <input className="input-register" type="telefono" name="telefono" />
        </label>
        <label className="label-register">
          Contraseña:
          <input
            className="input-register"
            type="contrasenia"
            name="contrasenia"
          />
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </section>
  );
}
